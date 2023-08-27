import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ProductUpdate(props) {
    const [options, setOptions] = useState(["Electronics", "Beauty", "Health", "Clothes"]);
    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose} animation={false} centered className="edit-modal">
            <Modal.Header closeButton>
                <Modal.Title>Product ID #{props.product.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <img className="col-12" src={props.product.image} alt="" />
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-12 mb-3">
                                <label className="fw-bold mb-2">Product Name</label>
                                <div className="input-group">
                                    <input name="name" className="form-control" defaultValue={props.product.name} />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-6">
                                    <label className="fw-bold mb-2">Price</label>
                                    <div className="input-group">
                                        <input name="price" className="form-control" defaultValue={props.product.price} />
                                        <span className="input-group-text" id="basic-addon2">₫</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label className="fw-bold mb-2">Date Added</label>
                                    <input className="form-control" defaultValue={props.product.dateAdded} readOnly={true} />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <label className="fw-bold mb-2">Category</label>
                                <select className="form-select" name="category" defaultValue={props.product.category}>
                                    {options.map(o => {
                                        return (
                                            <option key={o} value={o}>
                                                {o}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="fw-bold mb-2">Description</label>
                        <textarea name="description" className="form-control" defaultValue={props.product.description} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={() => {
                    //props.updateProduct();
                    props.handleClose();
                }}>
                    Save
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductUpdate;