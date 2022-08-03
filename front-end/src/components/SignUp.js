import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    })

    const collectData = async () => {
        console.log(name, email, password)
        let result = await fetch("http://localhost:5000/register", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "content-type": "application/json"
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result));
        navigate('/');
    }

    return (
        <div className='form-block'>
            <h1>Sign Up</h1>
            <div className='form-block'>
                <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='form-block'>
                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-block'>
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='form-block'>
                <button type="button" onClick={collectData}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp