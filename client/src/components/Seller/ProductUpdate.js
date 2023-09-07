import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from 'axios';

function ProductUpdate({ handleCloseModal, show, p, reload }) {
    Axios.defaults.withCredentials = true;

    const [product, setProduct] = useState(p);
    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        Axios.get('http://localhost:3001/allCategories')
            .then((response) => {
                setCategories(response.data)
            })
            .catch(() => {console.log('ProductUpdate.js error')});
    }
    useEffect(() => {
        getCategories()
    }, []);

    const [selection, setSelection] = useState([]);
    const [selectionName, setSelectionName] = useState([]);
    const originalAtt = (typeof p.attribute === "string") ? JSON.parse(p.attribute) : (p.attribute)
    const [newAttributes, setNewAttributes] = useState((typeof product.attribute === "string") ? JSON.parse(product.attribute) : product.attribute);

    function handleChange(e){
        const { name, value } = e.target;
        if (name.startsWith("category")) {
            const selectedId = parseInt(value);
            const selectedCategory = categories.find(category => category.CategoryID === selectedId);
            if (name==="category4") {
                if (selectedCategory.attributes) {
                    JSON.parse(selectedCategory.attributes).forEach(attribute => {
                        newAttributes[attribute] = "";
                    })
                }
            } else {
                setNewAttributes({})
                setProduct(prev => ({
                ...prev,
                attribute: {}
            }));
            }
            const index = parseInt(name.charAt(name.length - 1)) - 1;
            const selectedNames = [
                ...selectionName.slice(0, index),
                selectedCategory.name
            ];
            setSelection([...selection.slice(0, index), selectedId]);
            setSelectionName(selectedNames);
            
        } else if (name === "attribute") {
            const id = e.target.id;
            const update = { ...newAttributes };
            update[id] = value;
            setNewAttributes(update);
            setProduct(prev => ({
                ...prev,
                attribute: update
            }));
        } else {
            setProduct(prev =>{
                return({ ...prev, [name]: value })
            });
        }
    }

    function handleClose() {
        setSelectionName([]);
        setSelection([])
        setNewAttributes(originalAtt)
        handleCloseModal();
    }
    const updateProduct = event => {
        event.preventDefault();
    
        if (selectionName.length < 3) {
            alert("Please select at least three categories.");
            return;
        }
        handleCloseModal();

        setProduct(prev => ({...prev,category: selectionName,}));
        

        if (Object.keys(product.attribute).length === 0) {
            setProduct(prev => ({
                ...prev,
                attribute: null
            }));
        }
        Axios.post('http://localhost:3001/seller/updateProduct', {
            ProductID: product.ProductID,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            category: JSON.stringify(selectionName),
            attribute: (Object.keys(product.attribute).length === 0) ? null : JSON.stringify(product.attribute),
            SellerID: product.SellerID
        })
        .then((response) => {
            if (response.data.message) {
                // Alert can be replaced with something else
                alert(JSON.stringify(response.data.message));
                //
                reload();
            } else {
                alert(JSON.stringify(response.data));
            }
        });
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
                                <img className="col-12" src={`http://localhost:3001/${product.imagePath}`} alt={product.ProductID} />
                            </div>
                            <div className="col-sm-6">
                                <div className="col-sm-12 mb-3">
                                    <label className="fw-bold mb-2">Name</label>
                                    <div className="input-group">
                                        <input 
                                            name="name" 
                                            className="form-control" 
                                            minLength="5" maxLength="50" 
                                            title="Name should be at least 5 characters." 
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
                                placeholder={(typeof product.category === 'string') ? JSON.parse(product.category).join(" > ") : product.category.join(" > ")}
                                value={selectionName.join(' > ')}
                                disabled
                            />
                            <div className="row">
                                <div className="col-sm-3">
                                    <select className="form-select" name="category1" onChange={handleChange}>
                                        <option hidden>Top</option>
                                        {categories.filter(category => !category.parentID).map(category => (
                                            <option value={category.CategoryID} key={category.CategoryID}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <select className="form-select" name="category2" onChange={handleChange}>
                                        <option hidden>Second</option>
                                        {(selection.length>0) && (
                                            categories.filter(category => category.parentID === selection[0]).map(category => (
                                                <option value={category.CategoryID} key={category.CategoryID}>
                                                    {category.name}
                                                </option>
                                            )) 
                                        )}
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <select className="form-select" name="category3" onChange={handleChange}>
                                        <option hidden>Third</option>
                                        {(selection.length>1) && (
                                            categories.filter(category => category.parentID === selection[1]).map(category => (
                                                <option value={category.CategoryID} key={category.CategoryID}>
                                                    {category.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <select className="form-select" name="category4" onChange={handleChange}>
                                        <option hidden>Optional</option>
                                        {(selection.length>2) && (
                                            categories.filter(category => category.parentID === selection[2]).map(category => (
                                                <option value={category.CategoryID} key={category.CategoryID}>
                                                    {category.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                        {selection.length === 0 
                            ? 
                            p.attribute &&  
                            <div className="mb-4">
                                <label className="fw-bold mb-2">Category attributes</label>
                                <div className="d-flex ms-2">
                                    {(typeof p.attribute === "string") ? Object.keys(JSON.parse(p.attribute)).map((key) => (
                                        <div key={key} className="d-flex col-3 me-4">
                                            <label className="fw me-1 mt-1">{key}</label>
                                            <input
                                                name="attribute"
                                                id={key}
                                                className="form-control"
                                                value={newAttributes[key]}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )) : Object.keys(p.attribute).map((key) => (
                                        <div key={key} className="d-flex col-3 me-4">
                                            <label className="fw me-1 mt-1">{key}</label>
                                            <input
                                                name="attribute"
                                                id={key}
                                                className="form-control"
                                                //value={(typeof product.attribute === "string") ? JSON.parse(product.attribute)[key] : product.attribute[key]}
                                                value={newAttributes[key]}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            : 
                            (selection.length === 4 && categories.find(category => 
                                category.CategoryID === selection[3] && category.attributes !== null
                            )) &&
                            <div className="mb-4">
                                <label className="fw-bold mb-2">Category attributes</label>
                                <div className="d-flex">
                                {JSON.parse(categories.find(category => category.CategoryID === selection[3]).attributes).map((attribute) => (
                                        <div key={attribute} className="d-flex col-3 me-4">
                                            <label className="fw me-1 mt-1">{attribute}</label>
                                            <input
                                                name="attribute"
                                                id={attribute}
                                                className="form-control"
                                                value={newAttributes[attribute]}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
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
                        <Button type="submit" variant="outline-success" className="save-btn">
                            Save
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleClose} className="close-btn">
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