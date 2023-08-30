import React, { useState, useEffect } from "react";
import OrderTableRow from "./OrderTableRow";
import OrderDetail from "./OrderDetail";
import Axios from 'axios';
import Statistics from "./Statistics";

function OrderList({ seller }){
    Axios.defaults.withCredentials = true;

    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        Axios.post('http://localhost:3001/seller/allOrders', {SellerID: seller})
            .then((response) => {
                setOrders(response.data);
            })
            .catch(() => {console.log('error')});
    }
    useEffect(() => {
        getOrders()
    }, []);

    // const [status, setStatus] = useState("");
    // function getStatus(status) {
    //     setStatus(status)
    //     updateStatus();
    // }
    // const updateStatus = event => {
    //     event.preventDefault();
    //     Axios.post('http://localhost:3001/seller/updateOrderStatus', {
    //         orderId: order.OrderID,
    //         productId: order.ProductID,
    //         newStatus: status
    //     }).then((response) => {
    //         if (response.data.message) {
    //             alert(JSON.stringify(response.data.message));
    //             getOrders();
    //         } else {
    //         }
    //     });
    // }

    const [ order, setOrder ] = useState({
        OrderID: 0,
        CustomerID: 0,
        username: "",
        email: "",
        phone: "",
        address: "",
        ProductID: 0, 
        name: "",
        price: 0,
        imagePath: "",
        quantity: 0,
        date: "",
        status: "",
    });
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
            <Statistics seller={seller}/>
            <div className="management-container">
                <OrderDetail order={order} handleClose={handleClose} show={show} />
                <div className="management-title-container">
                    <p className="management-title">Order Management</p>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th className="col-sm-1">Order ID</th>
                            <th className="col-sm-2">Customer</th>
                            <th className="col-sm-2">Product</th>
                            <th className="col-sm-1">Quantity</th>
                            <th className="col-sm-2">Date Ordered</th>
                            <th className="col-sm-1">Status</th>
                            <th className="col-sm-3">Action</th>
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