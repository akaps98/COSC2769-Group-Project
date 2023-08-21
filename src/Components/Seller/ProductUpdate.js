import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ProductUpdate(props) {
    const [ options, setOptions ] = useState(["Electronics", "Beauty", "Health", "Clothes"]);
    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Product ID #{props.product.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="col-sm-8 mx-auto" src={props.product.image} alt="" />
                <form>
                    <div>
                        <label>Product Name</label>
                        <input name="name" className="form-control" defaultValue={props.product.name} />
                    </div>
                    <div>
                        <label>Product Price</label>
                        <input name="price" className="form-control" defaultValue={props.product.price} />
                    </div>
                    <div>
                        <label>Product Category</label>
                        <select className="form-select" name="category" defaultValue={props.product.category}>
                            {options.map(o => {
                                return(
                                    <option key={o} value={o}>
                                        {o}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Date Added</label>
                        <input className="form-control" defaultValue={props.product.dateAdded} readOnly={true} />
                    </div>
                    <div>
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