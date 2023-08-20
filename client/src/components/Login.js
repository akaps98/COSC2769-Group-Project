import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <>
            <div className="login-container col-sm-4 mx-auto mt-5">
                <form>
                    <h2>Welcome!</h2>
                    <hr />
                    <div className="my-3">
                        <label className="form-label">Email or Phone Number</label>
                        <input placeholder="Enter your email or phone number..." id="userId" className="form-control" />
                    </div>
                    <div className="mb-5">
                        <label className="form-label">Password</label>
                        <input id="password" className="form-control" placeholder="Password" />
                    </div>
                    <button className="login-btn col-12 mb-3" onClick={(e) => e.preventDefault()}>LOGIN</button>
                    <p className="text-muted link-text">New member? <Link to={"/register"}>Register</Link> here</p>
                </form>
            </div>
        </>
    )
}

export default Login;