import React from 'react';
import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';

function EachProduct({ data }) {
    return (
        <Link to ={`/search/detail`} state={{data: data}} >
            <h2>{data.name}</h2>
            <h2>{data.description}</h2>
            <h2>{data.quantity}</h2>
        </Link>
    )
}

export default EachProduct;