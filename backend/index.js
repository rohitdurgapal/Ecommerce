const express = require("express");
const cors = require("cors");
require("./db/config")
const User = require("./db/User")
const Product = require("./db/Product")
const app = express();
const JWT = require('jsonwebtoken')
const jwtkey = 'e-comm'

app.use(express.json())
app.use(cors());
//register route
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    JWT.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong" })
        }
        resp.send({ result, auth: token })

    })
})
//login route
app.post("/login", async (req, resp) => {
    let user = await User.findOne(req.body).select("-password")
    if (req.body.password && req.body.email) {
        if (user) {
            JWT.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong" })
                }
                resp.send({ user, auth: token })

            })

        } else {
            resp.send({ result: "No User Found" })
        }
    } else {
        resp.send({ result: "No User Found" })
    }
})
//add product route
app.post("/add-product", verifyToken, async (req, resp) => {
    let product = new Product(req.body)
    let result = await product.save()
    resp.send(result)

})
//product list route
app.get("/products", verifyToken, async (req, resp) => {
    let products = await Product.find()
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Products Found" })
    }

})

//product delete route
app.delete("/product/:id", verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);
})

//get single product
app.get("/product/:id", verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "No Product Found" })
    }
})

//update product route
app.put("/product/:id", verifyToken, async (req, resp) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
})
//search product api
app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    resp.send(result)
})

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        JWT.verify(token, jwtkey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please provide valid token" })
            } else {
                next()
            }

        })
    } else {
        resp.status(403).send({ result: "Please send token with header" })

    }
}
app.listen(5000);