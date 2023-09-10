import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import EachProduct from './EachProduct';
import Pagination from './Pagination';

import search from "../assets/images/sellers/search-interface-symbol.png";

function BrowseProduct() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [thisPage, setThisPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(4);
    const [selection, setSelection] = useState([]);
    const [selectionName, setSelectionName] = useState([]);

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
        const newProducts = [...allProducts];
        const filteredProducts = newProducts.filter(product => {
            if (pName !== "") {
                const name = pName.toLowerCase();
                if (!(product.name.toLowerCase().includes(name) || product.description.toLowerCase().includes(name))) {
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

    const display = currentProduct.map((product) => {
        return (
            <div className='col-3'>
                <EachProduct key={product.name} data={product} />
            </div>
        )
    })

    return (
        <>
        <div className="container bg-light my-5 my-5 px-5 py-2 rounded">
            <div className="row">
                <div className="col p-3">
                    <h5 className='mb-3'>Category</h5>
                    <select className="form-select mb-2" name="category1" onChange={handleChange}>
                        <option hidden>Top Category</option>
                        {categories.filter(category => !category.parentID).map(category => (
                            <option value={category.CategoryID} key={category.CategoryID}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select className="form-select mb-2" name="category2" onChange={handleChange}>
                        <option hidden>Second category</option>
                        {(selection.length>0) && (
                            categories.filter(category => category.parentID === selection[0]).map(category => (
                                <option value={category.CategoryID} key={category.CategoryID}>
                                    {category.name}
                                </option>
                            )) 
                        )}
                    </select>
                    <select className="form-select mb-2" name="category3" onChange={handleChange}>
                        <option hidden>Third category</option>
                        {(selection.length>1) && (
                            categories.filter(category => category.parentID === selection[1]).map(category => (
                                <option value={category.CategoryID} key={category.CategoryID}>
                                    {category.name}
                                </option>
                            ))
                        )}
                    </select>
                    <select className="form-select mb-2" name="category4" onChange={handleChange}>
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
                <div className="col">
                    <div className="product-filter-container my-3">
                        <h5>Search & Filtering</h5>
                        <button className="product-search-btn border" onClick={filterProducts}><img src={search} alt="" /></button>
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
                
            </div>
        </div>
        <div className='container bg-linear p-5 rounded'>
            <div className='row mb-3'>
                {display}
            </div>
            <Pagination totalProducts={products.length} productsPerPage={productsPerPage} setThisPage={setThisPage} />
        </div>
        </>
    )
}

export default BrowseProduct;