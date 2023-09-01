import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from 'axios';

function CustomerRegister() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    Axios.defaults.withCredentials = true;

    const register = event => {
        event.preventDefault();

        Axios.post('http://localhost:3001/register/customer', {
            username: username,
            email: email,
            phone: phone,
            address: address,
            password: password
        }).then((response) => {
            if (response.data.message) {
                alert(JSON.stringify(response.data.message)); //success
                window.location.href = '/login';
            } else {
                alert(JSON.stringify(response.data)); //error
            }
            console.log(response);
        });
    };

    return (
        <form onSubmit={register} className="row">
            <div className="mb-3">
                <label className="form-label">Username<span>*</span></label>
                <input 
                    className="form-control" 
                    id="userName"
                    type="text"
                    placeholder="Enter your username..."  
                    minLength="4" maxLength="15" 
                    title="Username length should be from 4 to 15." 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    required
                />
            </div>
            <div className="my-3 col-sm-6">
                <label className="form-label">Email<span>*</span></label>
                <input 
                    className="form-control register-form" 
                    id="userEmail"
                    type="email" 
                    placeholder="Enter your email..."  
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </div>
            <div className="my-3 col-sm-6">
                <label className="form-label">Phone Number<span>*</span></label>
                <input 
                    className="form-control phoneNumber" 
                    id="userPhone" 
                    type="number" 
                    placeholder="Enter your phone number..." 
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Address<span>*</span></label>
                <input 
                    className="form-control" 
                    id="userAddress" 
                    type="text" 
                    placeholder="Enter your address..."  
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                />
            </div>
            <div className="mb-5">
                <label className="form-label">Password<span>*</span></label>
                <input 
                    className="form-control" 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password..." 
                    minLength="8" maxLength="20" 
                    title="Password length should be from 8 to 20." 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </div>
            <button className="login-btn col-12 mb-3">SIGN UP</button>
            <p className="text-muted link-text">Already a member? <Link to={"/login"}>Login</Link> here</p>
        </form>
    )
}

export default CustomerRegister;