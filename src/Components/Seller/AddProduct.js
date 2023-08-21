import React, { useState } from "react";
import SellerHeader from "./SellerHeader";

function AddProduct() {
    // const date = new Date();
    const [ options, setOptions ] = useState(["Electronics", "Beauty", "Health", "Clothes"]);
    const [ product, setProduct ] = useState({
        name: "",
        price: 0,
        category: "",
        dateAdded: "",
        image: ""
    });
    const [ image, setImage ] = useState();
    function handleChange(e){
        const { name, value } = e.target;
        if(name === "image" && e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]))
        }
        setProduct(prev =>{
            return(
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
        <>
            <SellerHeader />
            <div className="col-sm-8 mx-auto mt-5">
                <form className="row">
                    <div>
                        <label>Product Image</label>
                        <img className="preview-image col-sm-2" alt="Preview" src={image}/>
                        <input className="form-control" type="file" name="image" onChange={handleChange}/>
                    </div>
                    <div className="col-sm-4">
                        <label>Product Name</label>
                        <input className="form-control" name="name" onChange={handleChange}/>
                    </div>
                    <div className="col-sm-4">
                        <label>Product Price</label>
                        <input className="form-control" name="price" onChange={handleChange} />
                    </div>
                    <div className="col-sm-4">
                        <label>Product Category</label>
                        <select className="form-select" name="category" onChange={handleChange}>
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
                        <label>Product Description</label>
                        <textarea className="form-control" name="description" onChange={handleChange} />
                    </div>
                    <button className="col-12 mt-5" onClick={(e) =>{
                        e.preventDefault();
                    }}>Add Product</button>
                </form>
            </div>
        </>
    )
}

export default AddProduct;