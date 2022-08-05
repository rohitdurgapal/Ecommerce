import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    })
    const handleLogin = async () => {
        console.log(email, password)
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "content-type": "application/json"
            },
        });
        result = await result.json();
        console.warn(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
        } else {
            alert("Please enter the valid credentials")
        }


    }

    return (
        <div className='form-block'>
            <h1>Login</h1>
            <div className='form-block'>
                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-block'>
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='form-block'>
                <button type="button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login