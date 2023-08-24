import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ProductUpdate(props) {
    const [options, setOptions] = useState(["Electronics", "Beauty", "Health", "Clothes"]);
    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Product ID #{props.product.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="col-sm-12 mb-5" src={props.product.image} alt="" />
                <form>
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <label>Product Name</label>
                            <div className="input-group">
                                <input name="name" className="form-control" defaultValue={props.product.name} />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <label>Product Price</label>
                            <div className="input-group">
                                <input name="price" className="form-control" defaultValue={props.product.price} />
                                <span className="input-group-text" id="basic-addon2">₫</span>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <label>Product Category</label>
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
                        <div className="col-sm-6">
                            <label>Date Added</label>
                            <input className="form-control" defaultValue={props.product.dateAdded} readOnly={true} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label>Product Description</label>
                        <textarea name="description" className="form-control" defaultValue={props.product.description} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => {
                    //props.updateProduct();
                    props.handleClose();
                }}>
                    Update
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductUpdate;