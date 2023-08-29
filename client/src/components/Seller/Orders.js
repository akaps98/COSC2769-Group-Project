import React from "react";
import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function OrderList(){
    const [orders, setOrders] = useState([]);
    const loadOrders = () => {
        Axios.post('http://localhost:3001/seller/allOrders')
            .then((response) => {setOrders(response.data)})
            .catch(() => {console.log('error')});
    }
    useEffect(() => {
        loadOrders()
    }, []);

    return(
        <div className="m-5">
            <h3>All Orders</h3>
                <table className="table table-bordered table-striped table-dark">
                <thead >
                    <tr>
                        <th>OrderID</th>
                        <th>CustomerID</th>
                        <th>products</th>
                        <th>price</th>
                        <th>date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.OrderID}>
                                <td>{order.OrderID}</td>
                                <td>{order.CustomerID}</td>
                                <td>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <td>ProductID</td>
                                                <td>quantity</td>
                                                <td>status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {JSON.parse(order.products).map((product)=> {
                                                    return (
                                                        <tr key={product[0].ProductID}>
                                                            <td>{product[0].ProductID}</td>
                                                            <td>{product[0].quantity}</td>
                                                            <td>{product[1]}</td>
                                                        </tr>
                                                    )
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </td>
                                <td>{order.price}</td>
                                <td>{order.date.slice(0,10)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}