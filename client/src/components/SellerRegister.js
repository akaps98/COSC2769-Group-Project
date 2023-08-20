import React from "react";
import { Link } from "react-router-dom";

function SellerRegister(){
    return(
        <form className="row">
            <div className="my-3 col-sm-6">
                <label className="form-label">Email<span>*</span></label>
                <input placeholder="Enter your email..." id="userEmail" className="form-control" />
            </div>
            <div className="my-3 col-sm-6">
                <label className="form-label">Phone Number<span>*</span></label>
                <input placeholder="Enter your phone number..." id="userPhone" className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label">Business Name<span>*</span></label>
                <input placeholder="Enter the name of your business..." id="userAddress" className="form-control" />
            </div>
            <div className="mb-5">
                <label className="form-label">Password<span>*</span></label>
                <input id="password" className="form-control" placeholder="Password" />
            </div>
            <button className="login-btn col-12 mb-3" onClick={(e) => e.preventDefault()}>SIGN UP</button>
            <p className="text-muted link-text">Already a member? <Link to={"/"}>Login</Link> here</p>
        </form>
    )
}

export default SellerRegister;