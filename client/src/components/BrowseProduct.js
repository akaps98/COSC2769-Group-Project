import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import EachProduct from './EachProduct';
import Pagination from './Pagination';

import search from "../assets/images/sellers/search-interface-symbol.png";

function BrowseProduct() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [value, setValue] = useState("");
    const [thisPage, setThisPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(4);
    const [selection, setSelection] = useState([]);
    const [selectionName, setSelectionName] = useState([]);
    const [belowPrice, setBelowPrice] = useState(0);
    const [upperPrice, setUpperPrice] = useState(999999999999999);

    const lastPage = thisPage * productsPerPage;
    const firstPage = lastPage - productsPerPage;
    const currentProduct = products.slice(firstPage, lastPage);

    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        Axios.get('http://localhost:3001/admin/allCategories')
            .then((response) => {
                setCategories(response.data)
            })
            .catch(() => {alert('ProductUpdate.js_getCategories: error')});
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/allProducts').then((response) => {
            setProducts(response.data);
            setAllProducts(response.data);
        });
        getCategories()
    }, [])

    function handleChange(e){
        const { name, value } = e.target;
        if (name.startsWith("category")) {
            const selectedId = parseInt(value);
            const selectedCategory = categories.find(category => category.CategoryID === selectedId);
            const index = parseInt(name.charAt(name.length - 1)) - 1;
            const selectedNames = [
                ...selectionName.slice(0, index),
                selectedCategory.name
            ];
            setSelection([...selection.slice(0, index), selectedId]);
            setSelectionName(selectedNames);
            Axios.post('http://localhost:3001/product/browseProductByFiltering', {
                category: selectedNames[selectedNames.length - 1]
            }).then((response) => {
                setProducts(response.data);
            })
        }
    }

    const [pName, setPName] = useState("");
    const handleNameChange = (e) => setPName(e.target.value);
    const [pDate, setPDate] = useState({ fromDate: "", toDate: "" });
    const [pPrice, setPPrice] = useState({ fromPrice: 0, toPrice: 0 });

    function handleDateChange(e) {
        const { name, value } = e.target;
        setPDate((prev) => {
            return (
                {
                    ...prev,
                    [name]: value
                }
            )
        });
    }

    function handlePriceChange(e) {
        const { name, value } = e.target;
        setPPrice((prev) => {
            return (
                {
                    ...prev,
                    [name]: parseInt(value)
                }
            )
        });
    }

    function filterProducts() {
        const newProducts = [...products];
        const filteredProducts = newProducts.filter(product => {
            if (pName !== "") {
                const name = pName.toLowerCase();
                if (!product.description.toLowerCase().includes(name) || !product.description.toLowerCase().includes(name)) {
                    return false;
                }
            }
            if (pDate.fromDate !== "" && pDate.toDate !== "") {
                if (!(new Date(pDate.fromDate) <= new Date(product.dateAdded.slice(0, 10)))
                    || !(new Date(product.dateAdded.slice(0, 10)) <= new Date(pDate.toDate))) {
                    return false;
                }
            }else if (pDate.fromDate !== "" || pDate.toDate !== "") {
                if (pDate.fromDate !== "") {
                    if(!(new Date(pDate.fromDate) <= new Date(product.dateAdded.slice(0, 10)))){
                        return false;
                    }
                } else {
                    if (!(new Date(product.dateAdded.slice(0, 10)) <= new Date(pDate.toDate))){
                        return false;
                    }
                }
            }
            if (pPrice.fromPrice !== 0 && pPrice.toPrice !== 0) {
                if (!(pPrice.fromPrice <= product.price) || !(product.price <= pPrice.toPrice)){
                    return false;
                }
            } else if (pPrice.fromPrice !== 0 || pPrice.toPrice !== 0) {
                if (pPrice.fromPrice !== 0) {
                    if (!(pPrice.fromPrice <= product.price)){
                        return false
                    }
                } else {
                    if (!(pPrice.toPrice >= product.price)){
                        return false;
                    }
                }
            }
            return true;
        });
        setProducts(filteredProducts);
    }

    function handleFilterClear() {
        setPDate({ fromDate: "", toDate: "" });
        setPPrice({ fromPrice: 0, toPrice: 0 });
    }

    const [filterShow, setFilterShow] = useState(false);
    const handleFilterClose = () => setFilterShow(false);
    const handleFilterToggle = () => setFilterShow((prev) => !prev);

    function filterChange(e) {
        const { name, value } = e.target
        if(value === "alphabet") {
            const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
            setProducts(sortedProducts);
            console.log(currentProduct)
        } else if (value === "alphabet-reverse") {
            const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name)).reverse();
            setProducts(sortedProducts);
            console.log(currentProduct)
        } else if (value === "date-addded-latest") {
            const sortedProducts = products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            setProducts(sortedProducts);
            console.log(currentProduct)
        } else if (value === "date-addded-oldest") {
            const sortedProducts = products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).reverse();
            setProducts(sortedProducts);
            console.log(currentProduct)
        } else if (value === "price-high-to-low") {
            const sortedProducts = products.sort((a, b) => a.price - b.price).reverse();
            setProducts(sortedProducts);
            console.log(currentProduct)
        } else {
            const sortedProducts = products.sort((a, b) => a.price - b.price);
            setProducts(sortedProducts);
            console.log(currentProduct)
        }
    }   

    const display = currentProduct.map((product) => {
        return (
            <div className='col-3'>
                <EachProduct key={product.name} data={product} />
            </div>
        )
    })

    return (
        <>
        <div className="m-5">
            <div className="row mb-1">
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
                <div className="product-filter-container my-3">
                <button className="product-search-btn" onClick={filterProducts}><img src={search} alt="" /></button>
                <input type="text" placeholder="Search..." className="product-name-filter-input" onChange={(e) => handleNameChange(e)} />
                <button className={filterShow ? "product-filter-btn filter-btn-active" : "product-filter-btn"}
                    onClick={handleFilterToggle}>
                    Filter
                </button>
                {filterShow &&
                    <div className="product-filter-form-container mt-3 text-secondary">
                        <div className="product-date-filter-container">
                            Date <input type="date" className="col-sm-4 ms-4" name="fromDate" onChange={(e) => handleDateChange(e)} value={pDate.fromDate} /> - <input type="date" className="col-sm-4" name="toDate" value={pDate.toDate} onChange={(e) => handleDateChange(e)} />
                        </div>
                        <div className="hr-line my-3" />
                        <div className="product-price-filter-container">
                            Price <input type="number" className="col-sm-4 ms-4" placeholder="20000" name="fromPrice" onChange={(e) => handlePriceChange(e)} value={pPrice.fromPrice} /> - <input type="number" className="col-sm-4" placeholder="100000" value={pPrice.toPrice} name="toPrice" onChange={(e) => handlePriceChange(e)} />
                        </div>
                        <div className="hr-line my-3" />
                        <div className="product-filter-footer">
                            <button className="text-danger" onClick={handleFilterClear}>Clear all filter</button>
                            <div>
                                <button className="text-secondary" onClick={handleFilterClose}>Close</button>
                            </div>
                        </div>
                    </div>
                }
                </div>
            </div>
            <div>
                <select id='sort' className="form-select" name="sort" onChange={filterChange}>
                    <option value="alphabet">A-Z</option>
                    <option value="alphabet-reverse">Z-A</option>
                    <option value="date-addded-latest">Date Added (latest)</option>
                    <option value="date-addded-oldest">Date Added (oldest)</option>
                    <option value="price-high-to-low">Price (High to Low)</option>
                    <option value="price-low-to-high">Price (Low to High)</option>
                </select>
            </div>
        </div>
        <div className='container'>
            <div className='row'>
                {display}
            </div>
        </div>
        <hr></hr>
        <Pagination totalProducts={products.length} productsPerPage={productsPerPage} setThisPage={setThisPage} />
        </>
    )
}

export default BrowseProduct;