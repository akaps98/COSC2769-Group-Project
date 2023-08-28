import React from "react";
import { Button, Modal } from "react-bootstrap";
import iphone from "../../assets/images/products/iPhone14.png"

function OrderDetail({ order, show, handleClose }) {
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order #{order.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <div className="row mb-3">
                    <img src={iphone} alt="" className="col-sm-2" />
                    <div className="col-sm-4">
                        <p className="text-secondary">Product</p>
                        <p>{order.pName}</p>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-8">
                                <p className="text-secondary">Price</p>
                                <p>2,000,000₫</p>
                            </div>
                            <div className="col-sm-4">
                                <p className="text-secondary">Qty</p>
                                <p>{order.quantity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <p className="text-secondary">Total</p>
                        <p>{(2000000 * order.quantity).toLocaleString()}₫</p>
                    </div>
                </div>
                <div className="hr-line mb-4" />
                <div className="row mb-4">
                    <div className="col-sm-3">
                        <p className="text-secondary">Customer Name</p>
                        <p>Tom</p>
                    </div>
                    <div className="col-sm-3">
                        <p className="text-secondary">Phone</p>
                        <p>090124124</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="text-secondary">Address</p>
                        <p className="align-center">702 Đ. Nguyễn Văn Linh, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh 700000</p>
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




