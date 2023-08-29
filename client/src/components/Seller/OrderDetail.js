import React from "react";
import { Button, Modal } from "react-bootstrap";
import iphone from "../../assets/images/products/iPhone14.png"

function OrderDetail({ order, show, handleClose }) {
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order ID. {order.OrderID}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <div className="row mb-3">
                    <img src={"../"+order.imagePath} alt={order.ProductID} className="col-sm-2" />
                    <div className="col-sm-4">
                        <p className="text-secondary">Product ID. {order.ProductID}</p>
                        <p>{order.name}</p>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-8">
                                <p className="text-secondary">Price</p>
                                <p>{(order.price*1).toLocaleString()}₫</p>
                            </div>
                            <div className="col-sm-4">
                                <p className="text-secondary">Qty</p>
                                <p>{order.quantity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <p className="text-secondary">Total</p>
                        <p>{(order.price * order.quantity).toLocaleString()}₫</p>
                    </div>
                </div>
                <div className="hr-line mb-4" />
                <div className="row mb-4">
                    <div className="col-sm-3">
                        <p className="text-secondary">Customer ID. {order.CustomerID}</p>
                        <p>{order.username}</p>
                    </div>
                    <div className="col-sm-3">
                        <p className="text-secondary">Phone</p>
                        <p>{order.phone}</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="text-secondary">Email</p>
                        <p className="align-center">{order.email}</p>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-sm-6">
                        <p className="text-secondary">Address</p>
                        <p>{order.address}</p>
                    </div>
                    <div className="col-sm-3">
                        <p className="text-secondary">Date Ordered</p>
                        <p className="align-center">{order.date.slice(0,10)}</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-6">
                        <p className="text-secondary">Status</p>
                        <p className={"status-text " + order.status}>{order.status}</p>
                    </div>
                    {order.status === "New" &&
                        <div className="col-sm-6">
                            <p className="text-secondary">Action</p>
                            <button className="order-ship-btn">Ship</button>
                            <button variant="dark" className="order-cancel-btn">Cancel</button>
                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderDetail;
