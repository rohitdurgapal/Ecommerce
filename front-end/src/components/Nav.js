import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div className="nav-class">
            <div className="logo"><span>E-</span>commerce</div>
            <div className="nav-menu">
            {auth ? <ul className="header-style">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                {/* <li><Link to="/update">Update Product</Link></li> */}
                {/* <li><Link to="/profile">Profile</Link></li> */}
                <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
            </ul> :
                <ul className="header-style nav-right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
            </div>
        </div>
    )
}

export default Nav;