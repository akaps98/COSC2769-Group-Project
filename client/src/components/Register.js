import React, { useState, useEffect } from "react";
import CustomerRegister from "./CustomerRegister";
import SellerRegister from "./SellerRegister";
import Axios from 'axios';
import Logout from './Logout';
function Register() {
    const [type, setType] = useState("customer");

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState("")

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("http://localhost:3001/auth").then((response) => {
            if (response.data.loggedIn) {
                setIsLoggedIn(true);
                setUser(response.data.user[0].username+' ('+response.data.user[0].role+')');
            }
        });
    }, []);

    function handleClick(e) {
        const newType = e.target.value;
        setType(newType);
    }
    return (
        <>
        {(isLoggedIn) 
            ? 
            <div className="pt-5">
                <h2>You are logged in, {user}!</h2>
                <Logout />
            </div>
            :
            <div className="login-container col-sm-8 mx-auto mt-5">
                <h2>Create Account</h2>
                <hr />
                <div className="form-check form-check-inline">
                    <input className="form-check-input me-2" name="radios" value="customer" type="radio" defaultChecked onClick={handleClick} />
                    <label className="form-check-label">Customer</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input me-2" name="radios" type="radio" value="seller" onClick={handleClick} />
                    <label className="form-check-label me-3">Seller</label>
                </div>
                {type === "customer" ? <CustomerRegister /> : <SellerRegister />}
            </div>
        }
        </>
    )
}

export default Register;