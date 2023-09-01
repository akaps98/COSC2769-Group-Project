import { useEffect, useState } from 'react';
import Axios from 'axios';

export default function SellerProducts() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [type, setType] = useState("seller");
    const [name, setName] = useState("Christina")
    const [ID, setID] = useState(1);

    const [listOfProducts, setListOfProducts] = useState([]);

    useEffect(() => {
        Axios.post('http://localhost:3001/seller/products', {
            SellerID: ID
        })
        .then((response) => {
            setListOfProducts(response.data)
        })
        .catch(() => {
            console.log('error')
        });    
    }, []);

    return (
    <>
    {(isLoggedIn && type==="seller")?
        <section className="col-md-8 mx-auto m-4 p-5 bg-light">
            <h3>Product List of Seller {ID}, {name}</h3>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Categories</th>
                        <th>Date Added</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfProducts.map((product) => {
                        return (
                            <tr id={product.ProductID}>
                                <td>{product.ProductID}</td>
                                <td><img src={product.imagePath} alt={product.name} /></td>
                                <td>{product.name}</td>
                                <td>{product.price.toLocaleString() + " vnd"}</td>
                                <td>{JSON.parse(product.category).map((cat)=>cat+" > ")}</td>
                                <td>{product.dateAdded.slice(0,10)}</td>
                                <td>
                                    <button className="product-update-btn" value={product.id}/>
                                    <button className="product-delete-btn" value={product.id}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    :
    <section className="col-md-8 mx-auto m-4 p-5 bg-light">
        <h3>You do not have the access to this page.</h3>
    </section>
    }
    </>
    );
};