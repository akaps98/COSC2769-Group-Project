import React, { useState, useEffect } from "react";
import OrderTableRow from "./OrderTableRow";
import OrderDetail from "./OrderDetail";
import Axios from 'axios';
import Statistics from "./Statistics";

function OrderList({ seller }){
    Axios.defaults.withCredentials = true;

    const [orders, setOrders] = useState([]);
    const [newCount, setNewCount] = useState(0);
    const [shippedCount, setShippedCount] = useState(0);
    const [canceledCount, setCanceledCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    const getOrders = () => {
        Axios.post('http://localhost:3001/seller/allOrders', {SellerID: seller})
            .then((response) => {
                setOrders(response.data);
                setNewCount(response.data.filter(order => order.status === "New").length)
                setShippedCount(response.data.filter(order => order.status === "Shipped").length)
                setCanceledCount(response.data.filter(order => order.status === "Canceled").length)
                setAcceptedCount(response.data.filter(order => order.status === "Accepted").length)
                setRejectedCount(response.data.filter(order => order.status === "Rejected").length)
            })
            .catch(() => {console.log('error')});
    }
    useEffect(() => {
        getOrders()
    }, []);

    const updateStatus = (newStatus) => {
        Axios.post('http://localhost:3001/seller/updateOrderStatus', {
            OrderID: order.OrderID,
            ProductID: order.ProductID,
            newStatus: newStatus
        }).then((response) => {
            if (response.data.message) {
                getOrders();
                alert(JSON.stringify(response.data.message));
                handleClose();
            } else {
                console.log(response.data);
            }
        });
    }

    const [order, setOrder] = useState({});
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    function getOrder(i) {
        const newOrder = orders[i]
        setOrder(newOrder);
        handleShow();
    }
    return(
        <>
            <Statistics
                seller={seller}
                newCount={newCount}
                acceptedCount={acceptedCount}
                rejectedCount={rejectedCount}
                canceledCount={canceledCount}
                shippedCount={shippedCount}
            />
            <div className="management-container">
                <OrderDetail order={order} handleClose={handleClose} show={show} updateStatus={updateStatus} />
                <div className="management-title-container">
                    <p className="management-title">Order Management</p>
                </div>
                <table className="management-table">
                    <thead>
                        <tr>
                            <th className="col-sm-1">Order ID</th>
                            <th className="col-sm-2">Customer</th>
                            <th className="col-sm-2">Product</th>
                            <th className="col-sm-1">Quantity</th>
                            <th className="col-sm-2">Date Ordered</th>
                            <th className="col-sm-1">Status</th>
                            <th className="col-sm-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index)=> 
                            <OrderTableRow order={order} key={index} index={index} getOrder={getOrder} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderList;