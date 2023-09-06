import React from 'react';
import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import '../assets/styles/product.css'

function EachProduct({ data }) {
    return (
        <Link to ={`/search/detail`} state={{data: data}} >
            <div className="product-card card border border-dark">
                <div className='px-2 py-2'>
                    <img src={`http://localhost:3001/${data.imagePath}`} className="card-img-top border border-secondary mb-3"></img>
                </div>
                <div className="card-body mb-3 py-0">
                    <h5 className="card-title">{data.name}</h5>
                    <h2 className="text-warning">{`${data.price} VND`}</h2>
                    <button className='addCart-btn btn btn-primary'>Add To Cart</button>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{`${data.quantity} left`}</li>
                </ul>

            </div>
        </Link>
    )
}

export default EachProduct;