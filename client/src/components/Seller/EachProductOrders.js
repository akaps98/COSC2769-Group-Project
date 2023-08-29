import React from "react";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';


export default function EachProductOrder(){
    Axios.defaults.withCredentials = true;

    //SET AUTHHHHH
    const id = 1;
    //SET AUTHHHHHH

    const [eachOrders, setEachOrders] = useState([]);
    const [newCount, setNewCount] = useState(0);
    const [shippedCount, setShippedCount] = useState(0);
    const [canceledCount, setCanceledCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    const getEachOrder = () => {
        Axios.post('http://localhost:3001/seller/productOrders', {SellerID: id})
            .then((response) => {
                setEachOrders(response.data)
                setNewCount(response.data.filter(order=>order.status==="New").length)
                setShippedCount(response.data.filter(order=>order.status==="Shipped").length)
                setCanceledCount(response.data.filter(order=>order.status==="Canceled").length)
                setAcceptedCount(response.data.filter(order=>order.status==="Accepted").length)
                setRejectedCount(response.data.filter(order=>order.status==="Rejected").length)
            })
            .catch(() => {console.log('error')});
    }
    useEffect(() => {
        getEachOrder()
    }, []);

    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        Axios.post('http://localhost:3001/seller/allOrders', {SellerID: id})
            .then((response) => {setOrders(response.data)})
            .catch(() => {console.log('error')});
    }
    useEffect(() => {
        loadOrders()
    }, []);


    return(
    <>
        <div className="m-5">
            <h3>Seller no.{id}</h3>
            <h5>Statistics</h5>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>New</th>
                        <th>Shipped</th>
                        <th>Canceled</th>
                        <th>Accepted</th>
                        <th>Rejected</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{newCount}</td>
                        <td>{shippedCount}</td>
                        <td>{canceledCount}</td>
                        <td>{acceptedCount}</td>
                        <td>{rejectedCount}</td>
                    </tr>
                </tbody>
            </table>
            <h5>Product Orders</h5>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th className="col-sm-1">Order ID</th>
                        <th className="col-sm-2">Customer ID_name</th>
                        <th className="col-sm-2">Product ID_name</th>
                        <th className="col-sm-1">Quantity</th>
                        <th className="col-sm-2">Date Ordered</th>
                        <th className="col-sm-1">Status</th>
                        <th className="col-sm-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {eachOrders.map((ord, i) => {
                        return (
                            <tr key={i}>
                                <td className="col-sm-1">{ord.OrderID}</td>
                                <td className="col-sm-2">{ord.CustomerID} _ {ord.username}</td>
                                <td className="col-sm-2">{ord.ProductID} _ {ord.name}</td>
                                <td className="col-sm-1">{ord.quantity}</td>
                                <th className="col-sm-2">{ord.date.slice(0,10)}</th>
                                <td className="col-sm-1">{ord.status}</td>
                                <td className="col-sm-3">(Shipped) (Canceled)</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* <h2>Each Product Orders</h2>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>CustomerID</th>
                        <th>ProductID</th>
                        <th>quantity</th>
                        <th>status</th>
                        <th>date</th>
                    </tr>
                </thead>
                {orders.map((order) => {
                    return (
                        <tbody key={order.OrderID}>
                            {JSON.parse(order.products).map((product)=> {
                                return (
                                    <tr key={order.OrderID}>
                                        <td>{order.OrderID}</td>
                                        <td>{order.CustomerID}</td>
                                        <td>{product[0].ProductID}</td>
                                        <td>{product[0].quantity}</td>
                                        <td>{product[1]}</td>
                                        <td>{order.date.slice(0,10)}</td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                )})}
            </table>*/}
        </div>
    </>
    )
}