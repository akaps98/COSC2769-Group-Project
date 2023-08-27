import React, { useState } from "react";
import SellerHeader from "./SellerHeader";

function AddProduct() {
    // const date = new Date();
    const [options, setOptions] = useState(["Electronics", "Beauty", "Health", "Clothes"]);
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        category: "",
        dateAdded: "",
        image: ""
    });
    const [image, setImage] = useState();
    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "image" && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))
        }
        setProduct(prev => {
            return (
                {
                    ...prev,
                    [name]: value
                }
            )
        });
        console.log(product);
    }
    // function add(){
    //     const now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    //     setProduct({...product, dateAdded: now});
    //     setProducts([...products, product]);
    // }
    return (
        <div className="mx-auto my-5 product-form-container">
            <form>
                <label className="mb-2">Product Image</label>
                <div className="mb-2">
                    <img className="preview-image col-sm-4" alt="" src={image} />
                </div>
                <div className="mb-4">
                    <input className="form-control-file" type="file" name="image" onChange={handleChange} />
                </div>
                <div className="row mb-4">
                    <div className="col-sm-4">
                        <label className="mb-2">Product Name</label>
                        <input className="form-control" name="name" onChange={handleChange} placeholder="ex) iPhone 14 pro" />
                    </div>
                    <div className="col-sm-4">
                        <label className="mb-2">Product Price</label>
                        <div className="input-group">
                            <input className="form-control" name="price" onChange={handleChange} placeholder="ex) 20000000" />
                            <span className="input-group-text">₫</span>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <label className="mb-2">Product Category</label>
                        <select className="form-select" name="category" onChange={handleChange}>
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
                <div>
                    <label className="mb-2">Product Description</label>
                    <textarea className="form-control" name="description" onChange={handleChange} />
                </div>
                <button className="col-12 mt-5 add-btn" onClick={(e) => {
                    e.preventDefault();
                }}>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;