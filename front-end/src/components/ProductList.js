import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    }
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" placeholder="Search Product" className="product-input" onChange={searchHandle} />
            <table cellPadding="10" cellSpacing="0" width="100%">
                <thead>
                    <tr>
                        <td>SN</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Category</td>
                        <td>Company</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 ? products.map((item, index) =>
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>$ {item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td><Link className="btn-class" to={"/update/" + item._id}>Update</Link><button className="btn-class-delete" onClick={() => deleteProduct(item._id)}>Delete</button></td>
                            </tr>
                        ) :
                            <tr>
                                <td colSpan="6">No Result Found</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;