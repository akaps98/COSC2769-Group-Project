import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import EachProduct from './EachProduct';
import Dropdown from './Dropdown';
import Pagination from './Pagination';

function BrowseProduct() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [value, setValue] = useState("");
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
            setProducts(response.data)
        });
        getCategories()
        Axios.get("http://localhost:3001/auth").then((response) => {
            if (response.data.loggedIn) {
                setIsLoggedIn(true);
            }
        });
    }, [])

    const [image, setImage] = useState();

    function handleChange(e){
        const { name, value } = e.target;
        if(name === "image" && e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]))
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
            Axios.post('http://localhost:3001/product/browseProductByFiltering', {
                category: selectedNames[selectedNames.length - 1]
            }).then((response) => {
                setProducts(response.data);
            })
        }
    }

    const display = currentProduct.map((product) => {
        return (
            <div className='col-3'>
                <EachProduct key={product.name} data={product} />
            </div>
        )
    })

    const filter = event => {
        Axios.post('http://localhost:3001/product/browseProductByFiltering', {
            category: event.target.value
        }).then((response) => {
            setProducts(response.data);
        })
    }

    const search = event => {
        event.preventDefault();
        Axios.post('http://localhost:3001/product/browseProductBySearching', {
            value: value
        }).then((response) => {
            setProducts(response.data);
        })
    }

    return (
        <>
        {/* <select onChange={filter}>
            {options}
        </select> */}
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
        <form className="row" onSubmit={search}>
            <input placeholder='Search...' value={value} onChange={(e) => setValue(e.target.value)}></input>
            <button type="submit"></button>
        </form>
        <div>
            <label>Sort By</label>
            <select className="form-select" name="sort" onChange={handleChange}>
                <option value="alphabet">A-Z</option>
                <option value="alphabet-reverse">Z-A</option>
                <option value="date-addded-latest">Date Added (latest)</option>
                <option value="date-addded-oldest">Date Added (oldest)</option>
                <option value="price-high-to-low">Price (High to Low)</option>
                <option value="price-low-to-high">Price (Low to High)</option>
            </select>
            <label>Filtering By</label>
            <div className="input-group mb-3">
                <label>Price</label>
                <input type="text" className="form-control" placeholder="Minimum"></input>
                <span className="input-group-text">To</span>
                <input type="text" className="form-control" placeholder="Maximum"></input>
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