import React from "react";
import { useNavigate } from "react-router-dom";

function Unapproved() {
    const navigate = useNavigate();
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-img-container"/>
            <div className="unauthorized-text-container">
                <h1>Not Approved</h1>
                <p>You are not yet approved by the admin.</p>
                <p>Please come back later.</p>
            </div>
            <button className="mt-4 go-back-btn" onClick={() => navigate("/logout")}>Go Back</button>
        </div>
    )
}

export default Unapproved;