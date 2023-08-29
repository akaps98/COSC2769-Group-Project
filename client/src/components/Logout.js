import React from "react";
import Axios from 'axios';

export default function Logout() {
    Axios.defaults.withCredentials = true; 

    const logout = event => {
        event.preventDefault();

        Axios.get('http://localhost:3001/log/out').then((response) => {
            alert(JSON.stringify(response.data)); 
            window.location.href = '/'
        });
    };

    return (
        <>
            <div className="login-container col-sm-4 mx-auto mt-5">
                <form>
                    <h2>Click to Log out</h2>
                    <hr />
                    <button className="login-btn col-12 mb-3" onClick={logout}>LOGOUT</button>
                </form>
            </div>
        </>
    )
}