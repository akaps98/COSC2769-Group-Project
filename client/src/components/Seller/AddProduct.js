import React, { useState, useEffect } from "react";
import Axios from 'axios';

function AddProduct({ seller }) {
    Axios.defaults.withCredentials = true;

    const date = new Date();
    const now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
        image: null,
        category: [],
        quantity: 0,
        dateAdded: now,
        SellerID: seller
    });

    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        Axios.get('http://localhost:3001/allCategories')
            .then((response) => {
                setCategories(response.data)
            })
            .catch(() => {alert('ProductUpdate.js_getCategories:',err)});
    }
    useEffect(() => {
        getCategories()
    }, []);
    const [selection, setSelection] = useState([]);
    const [selectionName, setSelectionName] = useState([]);
    const [image, setImage] = useState();

    function handleChange(e){
        const { name, value } = e.target;
        if(name === "image" && e.target.files[0]){
            const newImage = e.target.files[0];
            setImage(newImage);
            setProduct(prev => ({
                ...prev,
                image: newImage,
            }));
        } else if (name.startsWith("category")) {
            const selectedId = parseInt(value);
            const selectedCategory = categories.find(category => category.CategoryID === selectedId);
            const index = parseInt(name.charAt(name.length - 1)) - 1;
            const selectedNames = [
                ...selectionName.slice(0, index),
                selectedCategory.name
            ];
            setSelection([...selection.slice(0, index), selectedId]);
            setSelectionName(selectedNames);
            setProduct(prev => ({
                ...prev,
                category: selectedNames,
            }));
        } else {
            setProduct(prev => ({
                    ...prev,
                [name]: value,
            }));
        }
    }

    const addProduct = event => {
        event.preventDefault();

        if (product.category.length < 3) {
            alert("Please select at least three categories.");
            return;
        }

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("description", product.description);
        formData.append("image", product.image);
        formData.append("category", JSON.stringify(product.category));
        formData.append("quantity", product.quantity);
        formData.append("dateAdded", product.dateAdded);
        formData.append("SellerID", product.SellerID);

        Axios.post('http://localhost:3001/seller/addProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.message) {
                // Alert can be replaced with something else
                alert(JSON.stringify(response.data.message)); 
                //
                window.location.href = '/seller'
            } else {
                alert(JSON.stringify(response.data)); 
            }
        });
    };
    
    return (
        <div className="mx-auto my-5 product-form-container">
            <form onSubmit={addProduct} encType="multipart/form-data">
                <label className="mb-2">Product Image</label>
                {image &&
                    <div className="mb-2">
                        <img className="preview-image col-sm-4" alt="preview" src={URL.createObjectURL(image)} />
                    </div>
                }
                <div className="mb-4">
                    <input 
                        className="form-control-file" 
                        type="file"
                        name="image" 
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="row mb-4">
                    <div className="col-sm-4">
                        <label className="mb-2">Product Name</label>
                        <input 
                            className="form-control" 
                            name="name" 
                            minLength="5" maxLength="50" 
                            title="Name should be at least 5 characters." 
                            onChange={handleChange} 
                            placeholder="ex) iPhone 14 pro" 
                            required
                        />
                    </div>
                    <div className="col-sm-4">
                        <label className="mb-2">Product Price</label>
                        <div className="input-group">
                            <input 
                                className="form-control" 
                                type="number"
                                name="price" 
                                onChange={handleChange} 
                                placeholder="ex) 20000000" 
                                required
                            />
                            <span className="input-group-text">₫</span>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <label className="mb-2">Product Quantity</label>
                        <input 
                            className="form-control" 
                            type = "number"
                            name="quantity" 
                            onChange={handleChange} 
                            placeholder="ex) 50"
                            required 
                        />
                    </div>
                </div>
                <div>
                    <label className="mb-2">Product Category</label>
                    <div className="row">
                        <div>
                            <input
                                className="form-control"
                                disabled
                                value={selectionName.join(' > ')}
                            />
                        </div>
                        <div className="col-sm-3">
                            <select className="form-select" name="category1" onChange={handleChange}>
                                <option hidden>Top Category</option>
                                {categories.filter(category => !category.parentID).map(category => (
                                    <option value={category.CategoryID} key={category.CategoryID}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <select className="form-select" name="category2" onChange={handleChange}>
                                <option hidden>Second category</option>
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
                                <option hidden>Third category</option>
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
                                <option hidden>Optional category</option>
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
                    <label className="mb-2 mt-4">Product Description</label>
                    <textarea 
                        className="form-control" 
                        name="description" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <button className="col-12 mt-5 add-btn">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;