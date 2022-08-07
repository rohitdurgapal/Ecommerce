import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        navigate("/");
    }
    return (
        <div className='form-block'>
            <h1>Update Product</h1>
            <div className='form-block'>
                <input type="text" placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} />
                {error && !name && <span className="error-message">Enter valid name</span>}
            </div>
            <div className='form-block'>
                <input type="text" placeholder='Enter price name' value={price} onChange={(e) => setPrice(e.target.value)} />
                {error && !price && <span className="error-message">Enter valid price</span>}
            </div>
            <div className='form-block'>
                <input type="text" placeholder='Enter category name' value={category} onChange={(e) => setCategory(e.target.value)} />
                {error && !category && <span className="error-message">Enter valid category</span>}
            </div>
            <div className='form-block'>
                <input type="text" placeholder='Enter company name' value={company} onChange={(e) => setCompany(e.target.value)} />
                {error && !company && <span className="error-message">Enter valid company</span>}
            </div>
            <div className='form-block'>
                <button type="button" onClick={updateProduct}>Update Product</button>
            </div>
        </div>
    )
}
export default UpdateProduct