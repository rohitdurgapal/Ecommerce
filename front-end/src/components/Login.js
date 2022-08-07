import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    })
    const handleLogin = async () => {
        if (!email || !password) {
            setError(true)
            return false
        }
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "content-type": "application/json"
            },
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
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
                {error && !email && <span className="error-message">Enter valid email</span>}
            </div>
            <div className='form-block'>
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && !password && <span className="error-message">Enter valid password</span>}
            </div>
            <div className='form-block'>
                <button type="button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login