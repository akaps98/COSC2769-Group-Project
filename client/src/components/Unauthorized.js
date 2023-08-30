import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-img-container"/>
            <div className="unauthorized-text-container">
                <h1>Access Denied</h1>
                <p>You currently do not have an access to this page.</p>
                <p>Please check your user type and try again.</p>
            </div>
            <button className="mt-4 go-back-btn" onClick={() => navigate("/")}>Go Back</button>
        </div>
    )
}

export default Unauthorized;