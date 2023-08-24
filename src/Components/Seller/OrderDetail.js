import React from "react";
import { Button, Modal } from "react-bootstrap";

function OrderDetail({ order, show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order ID #{order.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <div className="row mb-4">
                    <div className="col-sm-4">
                        <p className="text-secondary">Customer Name</p>
                        <p>{order.customerId}</p>
                    </div>
                    <div className="col-sm-4">
                        <p className="text-secondary">Address</p>
                        <p>{order.customerId}</p>
                    </div>
                    <div className="col-sm-4">
                        <p className="text-secondary">Phone</p>
                        <p>{order.customerId}</p>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-sm-4">
                        <p className="text-secondary">Product Name</p>
                        <p>{order.pName}</p>
                    </div>
                    <div className="col-sm-4">
                        <p className="text-secondary">Quantity</p>
                        <p>{order.quantity}</p>
                    </div>
                </div>
                <div>
                    <div className="row mb-4">
                        <div className="col-sm-4">
                            <p className="text-secondary">Status</p>
                            <p>{order.status}</p>
                        </div>
                        {order.status === "New" &&
                            <div className="col-sm-8">
                                <p className="text-secondary">Confirm Order</p>
                                <Button variant="success" className="col-sm-4 me-2 order-ship-btn">Shipped</Button>
                                <Button variant="danger" className="col-sm-4 order-cancel-btn">Canceled</Button>
                            </div>
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderDetail;