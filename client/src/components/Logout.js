import React, { useState } from 'react';
import SellerHeader from './Seller/SellerHeader';
import Axios from 'axios';

export default function Logout({ username, userType }) {
    Axios.defaults.withCredentials = true; 

    const logout = event => {
        event.preventDefault();

        Axios.get('http://localhost:3001/log/out').then((response) => {
            // Alert can be replaced with something else
            alert("Logged out successully!"); 
            //
            window.location.href = '/'
        });
    };

    const [ menuToggle, setMenuToggle ] = useState(false);
    
    return (
        <>
        {(userType !== "") ? 
            (userType === "Seller") ?
                <div className='seller-page-container'>
                    <SellerHeader setMenuToggle={setMenuToggle} menuToggle = {menuToggle}/>
                    <div className='seller-page-main-container'>
                        <div className="login-container mx-auto mt-5">
                            <form>
                                <h2>Log out</h2>
                                <hr />
                                <h5 style={{textAlign: "center"}}>Thank you for using our web!<br/><br/>See you next time,<br/>{username}!</h5>
                                <button className="login-btn col-12 mb-3 mt-3" onClick={logout}>LOGOUT</button>
                            </form>
                        </div>
                    </div>
                </div>
            :
                <div className="login-container col-sm-4 mx-auto mt-5">
                    <form>
                        <h2>Log out</h2>
                        <hr />
                        <h5 style={{textAlign: "center"}}>Thank you for using our web!<br/><br/>See you next time,<br/>{username}!</h5>
                        <button className="login-btn col-12 mb-3 mt-3" onClick={logout}>LOGOUT</button>
                    </form>
                </div>
        :
            <div>
            </div>
        }
        </>
    )
}