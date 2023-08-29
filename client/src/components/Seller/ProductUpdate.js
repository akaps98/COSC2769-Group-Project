import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from 'axios';

function ProductUpdate({ handleClose, show, p, reload }) {
    Axios.defaults.withCredentials = true;

    const [product, setProduct] = useState(p);

    function handleChange(e){
        const { name, value } = e.target;
        setProduct(prev =>{
            return({ ...prev, [name]: value })
        });
    }

    const [categories, setCategories] = useState({});
    const getCategories = () => {
        Axios.get('http://localhost:3001/admin/allCategories')
            .then((response) => {
                setCategories(response)
            })
            .catch(() => {alert('ProductUpdate.js_getCategories: error')});
    }
    useEffect(() => {
        getCategories()
    }, []);

    // NOTE*** change when Admin functions are developed
    const [ options, setOptions ] = useState(["Electronics", "Beauty", "Health", "Clothes"]);
    // NOTE*** change when Admin functions are developed

    const updateProduct = event => {
        event.preventDefault();
        Axios.post('http://localhost:3001/seller/updateProduct', product)
            .then((response) => {
                if (response.data.message) {
                    alert(JSON.stringify(response.data.message));
                    reload();
                    handleClose();
                } else {
                    alert("ProductUpdate.js_updateProduct:",JSON.stringify(response.data)); 
                }
            }
        );
    }

    return (
        product.category ? (
            <Modal show={show} onHide={handleClose} animation={false} centered className="edit-modal">
                <form onSubmit={updateProduct}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product ID #{product.ProductID}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row mb-4">
                            <div className="col-sm-6">
                                <img className="col-12" src={"../"+product.imagePath} alt={product.ProductID} />
                            </div>
                            <div className="col-sm-6">
                                <div className="col-sm-12 mb-3">
                                    <label className="fw-bold mb-2">Name</label>
                                    <div className="input-group">
                                        <input 
                                            name="name" 
                                            className="form-control" 
                                            value={product.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-3">
                                    <label className="fw-bold mb-2">Price</label>
                                    <div className="input-group">
                                        <input 
                                            name="price" 
                                            className="form-control" 
                                            defaultValue={product.price} 
                                            type="number"
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="input-group-text" id="basic-addon2">₫</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-sm-5">
                                        <label className="fw-bold mb-2">Quantity</label>
                                        <input 
                                        name="quantity" 
                                        className="form-control" 
                                        defaultValue={product.quantity} 
                                        type="number"
                                        onChange={handleChange}
                                        required
                                        />
                                    </div>
                                    <div className="col-sm-7">
                                        <label className="fw-bold mb-2">Date Added</label>
                                        <input className="form-control" defaultValue={product.dateAdded.slice(0,10)} disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                        <label className="fw-bold mb-2">Category</label>
                            <input 
                                name="category" 
                                className="form-control" 
                                value={JSON.parse(product.category).join(' > ')}
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="fw-bold mb-2">Description</label>
                            <textarea 
                                name="description" 
                                className="form-control" 
                                defaultValue={product.description} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="outline-success">
                            Save
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        ) : (
            <Modal show={show} onHide={handleClose} animation={false} centered>
                    <Modal.Body>
                        <h2>Loading...</h2>
                    </Modal.Body>
            </Modal>
        )
    )
}

export default ProductUpdate;