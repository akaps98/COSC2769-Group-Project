import React from "react";
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Statistics({ seller }) {
    Axios.defaults.withCredentials = true;

    const [newCount, setNewCount] = useState(0);
    const [shippedCount, setShippedCount] = useState(0);
    const [canceledCount, setCanceledCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    
    useEffect(() => {
        Axios.post('http://localhost:3001/seller/allOrders', {SellerID: seller})
            .then((response) => {
                setNewCount(response.data.filter(order=>order.status==="New").length)
                setShippedCount(response.data.filter(order=>order.status==="Shipped").length)
                setCanceledCount(response.data.filter(order=>order.status==="Canceled").length)
                setAcceptedCount(response.data.filter(order=>order.status==="Accepted").length)
                setRejectedCount(response.data.filter(order=>order.status==="Rejected").length)
            })
            .catch(() => {console.log(response.data)});
    }, []);


    return(
        <div className="statistics-container">
            <p className='statistics-title'>Sale Statistics</p>
            <div className="hr-line mb-4"/>
            <div className='statistics-main-container'>
                <div className="col-sm-2"> 
                    <p className='status new'>{newCount}</p>
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
                    <p className='status accepted'>{acceptedCount}</p>
                    <p>Accepted</p>
                </div>
                <div className="col-sm-2"> 
                    <p className='status rejected'>{rejectedCount}</p>
                    <p>Rejected</p>
                </div>
            </div>
        </div>
    )
}

export default Statistics;