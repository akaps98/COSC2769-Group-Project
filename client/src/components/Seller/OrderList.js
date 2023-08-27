import React, { useState } from "react";
import OrderTableRow from "./OrderTableRow";
import OrderDetail from "./OrderDetail";
import Statistics from "./Statistics";

function OrderList() {
    const [orders, setOrders] = useState([
        { id: 1, pName: "iPhone 14 pro", quantity: 2, status: "New", customerId: 1 },
        { id: 2, pName: "iPhone 14 pro", quantity: 1, status: "New", customerId: 2 },
        { id: 3, pName: "iPhone 14 pro", quantity: 3, status: "Rejected", customerId: 3 },
        { id: 4, pName: "iPhone 14 pro", quantity: 10, status: "Shipped", customerId: 4 },
        { id: 5, pName: "iPhone 14 pro", quantity: 4, status: "Accepted", customerId: 5 },
        { id: 6, pName: "iPhone 14 pro", quantity: 4, status: "Canceled", customerId: 5 }
    ]);
    const [order, setOrder] = useState({
        id: 0,
        pName: "",
        quantity: 0,
        status: "",
        customerId: 0
    });
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    function getOrder(id) {
        const newOrder = orders.filter(o => {
            return o.id === id;
        });
        setOrder(...newOrder);
        handleShow();
    }
    return (
        <>
            <Statistics />
            <div className="management-container">
                <OrderDetail order={order} handleClose={handleClose} show={show} />
                <div className="management-title-container">
                    <p className="management-title">Order Management</p>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th className="col-sm-2">Order ID</th>
                            <th className="col-sm-2">Product</th>
                            <th className="col-sm-2">Quantity</th>
                            <th className="col-sm-2">Status</th>
                            <th className="col-sm-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            return (
                                <OrderTableRow order={order} key={order.id} getOrder={getOrder} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderList;