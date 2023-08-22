import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from 'axios';
import Logout from './Logout';

function Login() {
    const [emailPhone, setEmailPhone] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("customer");

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState("")
    const [sellerStatus, setSellerStatus] = useState("");

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3001/auth").then((response) => {
            if (response.data.loggedIn) {
                setIsLoggedIn(true);
                typeof variable !== 'undefined'
                if (typeof response.data.user[0].Sstatus === 'undefined') {
                    setUser(response.data.user[0].Cname+' (customer)');
                } else {
                    setUser(response.data.user[0].Sname+' (seller)');
                    setSellerStatus(response.data.user[0].Sstatus);
                }
            }
        });
    }, []);

    function handleClick(e) {
        const newType = e.target.value;
        setType(newType);
    }

    const login = event => {
        event.preventDefault();
    
        Axios.post('http://localhost:3001/log/in', {
            type: type,
            emailPhone: emailPhone,
            password: password
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                alert(JSON.stringify(response.data.message)); //error type
            } else {
                alert("Hello, "+response.data+"!"); //success
                window.location.reload();
            }
        });
    };

    return (
        <>
        {(isLoggedIn) 
            ? 
            <div className="pt-5">
                <h2>You are logged in, {user}!</h2>
                {(sellerStatus==='Pending') ? <h4>Status: Waiting for approval</h4> : <h4>You are approved as a seller</h4>}
                <Logout />
            </div>
            :
            <div className="login-container col-sm-4 mx-auto mt-5">
                <form onSubmit={login}>
                    <h2>Welcome!</h2>
                    <hr />
                    <div className="form-check form-check-inline">
                        <input className="form-check-input me-2" name="radios" value="customer" type="radio" defaultChecked 
                        onClick={handleClick} 
                        />
                        <label className="form-check-label">Customer</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input me-2" name="radios" type="radio" value="seller" 
                        onClick={handleClick} 
                        />
                        <label className="form-check-label me-3">Seller</label>
                    </div>
                    <div className="my-3">
                        <label className="form-label">Email or Phone Number</label>
                        <input 
                            className="form-control" 
                            id="emailPhone" 
                            type="text" 
                            placeholder="Enter your email or phone number..." 
                            onChange={(e) => setEmailPhone(e.target.value)}
                            value={emailPhone}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="form-label">Password</label>
                        <input 
                            className="form-control" 
                            id="password" 
                            type="password" 
                            placeholder="Enter your password..." 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required 
                        />
                    </div>
                    <button className="login-btn col-12 mb-3">LOGIN</button>
                    <p className="text-muted link-text">New member? <Link to={"/register"}>Register</Link> here</p>
                </form>
            </div>
        }
        </>
    )
}

export default Login;