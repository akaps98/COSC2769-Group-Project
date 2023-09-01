import React from "react";
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Statistics({ seller, newCount, shippedCount, canceledCount, acceptedCount, rejectedCount }) {
    Axios.defaults.withCredentials = true;

    return(
        <div className="statistics-container">
            <p className='statistics-title'>Sale Statistics</p>
            <div className="hr-line mb-4"/>
            <div className='statistics-main-container'>
                <div className="col-sm-2"> 
                    <p className='status'>{newCount}</p>
                    <p>New</p>
                </div>
                <div className="col-sm-2"> 
                    <p className='status'>{shippedCount}</p>
                    <p>Shipped</p>
                </div>
                <div className="col-sm-2"> 
                    <p className='status'>{canceledCount}</p>
                    <p>Canceled</p>
                </div>
                <div className="col-sm-2"> 
                    <p className='status'>{acceptedCount}</p>
                    <p>Accepted</p>
                </div>
                <div className="col-sm-2"> 
                    <p className='status'>{rejectedCount}</p>
                    <p>Rejected</p>
                </div>
            </div>
        </div>
    )
}

export default Statistics;