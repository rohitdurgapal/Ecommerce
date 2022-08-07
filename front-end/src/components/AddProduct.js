import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
const AddProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
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
            <h1>Add Product</h1>
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
                <button type="button" onClick={addProduct}>Add Product</button>
            </div>
        </div>
    )
}
export default AddProduct