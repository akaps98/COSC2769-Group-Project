import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import EachProduct from './EachProduct';
import Dropdown from './Dropdown';

function BrowseProduct() {
    const [products, setProducts] = useState([]);
    // const [category, setCategory] = useState("");
    // const [name, setName] = useState("");
    // const [name, setName] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [Selected, setSelected] = useState("");

    const cateSelect = (e) => {
        setSelected(e.target.value);
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/allProducts').then((response) => {
            setProducts(response.data)
        });
    }, [])

    const display = products.map((product) => {
        console.log(product.category)
        return (
            <EachProduct data={product} />
        )
    })

    const options = products.map((product) => {
        //console.log(product.main)
        return (
            <Dropdown data={product} />
        )
    })

    const search = event => {
        event.preventDefault();

        Axios.post('http://localhost:3001/product/browseProduct', {
            name: name,
            description: description
        }).then((response) => {
            setProducts(response.data);
        })
    }

    return (
        <>
        <select onChange={cateSelect}>
            {options}
        </select>
        <form className="row" onSubmit={search}>
            <input placeholder='Search...' value={name} onChange={(e) => setName(e.target.value)}></input>
            <button type="submit"></button>
        </form>
        {display}
        </>
    )
}

export default BrowseProduct;