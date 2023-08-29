import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import EachProduct from './EachProduct';
import Dropdown from './Dropdown';
import Pagination from './Pagination';

function BrowseProduct() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [value, setValue] = useState("");
    const [thisPage, setThisPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(1);
    
    const lastPage = thisPage * productsPerPage;
    const firstPage = lastPage - productsPerPage;
    const currentProduct = products.slice(firstPage, lastPage);

    useEffect(() => {
        Axios.get('http://localhost:3001/allProducts').then((response) => {
            setProducts(response.data)
        });
        Axios.get('http://localhost:3001/allCategories').then((response) => {
            setCategory(response.data)
        });
        Axios.get("http://localhost:3001/auth").then((response) => {
            if (response.data.loggedIn) {
                setIsLoggedIn(true);
            }
        });
    }, [])

    console.log(isLoggedIn)

    const display = currentProduct.map((product) => {
        return (
            <EachProduct key={product.name} data={product} />
        )
    })

    const options = category.map((main) => {
        if(main.parentID === null) {
            return (
                <Dropdown key={main.categoryID} data={main.name} />
            )
        }
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
        <select onChange={filter}>
            {options}
        </select>
        <form className="row" onSubmit={search}>
            <input placeholder='Search...' value={value} onChange={(e) => setValue(e.target.value)}></input>
            <button type="submit"></button>
        </form>
        {display}
        <hr></hr>
        <Pagination totalProducts={products.length} productsPerPage={productsPerPage} setThisPage={setThisPage} />
        </>
    )
}

export default BrowseProduct;