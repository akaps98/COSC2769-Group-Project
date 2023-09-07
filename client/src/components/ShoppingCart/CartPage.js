import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import '../../assets/styles/cart.css'
import CartRow from './CartRow';

function CartPage({ user, userType }) {
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const products = useRef([]);
    const orders = useRef([]);

    const navigate = useNavigate();
    
    const navigateToShopping = () => {
        navigate("/search");
    };

    function replacer(key, value) {
        return key === "quantity" || key === "ProductID" ? +value : value;
    }

    useEffect(() => {
        const tempOrdered = [];
        const total = [];
        if (userType === "Customer") {
            if (localStorage.length !== 0) {
                for (let i = 0; i < localStorage.length; i++) {
                    const pid = localStorage.key(i);
                    Axios.post('http://localhost:3001/shoppingCart/updateShoppingCart', {
                        quantity: 1,
                        productID: pid,
                        customerID: user.CustomerID
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(err => console.log(err));
                }
            }
            Axios.post('http://localhost:3001/shoppingCart/findShoppingCart', {
                id: user.CustomerID
            }).then((response) => {
                const db = JSON.parse(response.data[0].product);
                const pids = Object.keys(db);
                const quantities = Object.values(db);
                for (let i = 0; i < pids.length; i++) {
                    Axios.post('http://localhost:3001/product/findProduct', {
                        productID: pids[i]
                    }).then((response) => {
                        setOrderedProducts(prev => [...prev, response.data[0]]);
                        setOrderedProducts(prev => prev.slice(0, pids.length));
                        if (localStorage.getItem(pids[i])) {
                            const q = parseInt(localStorage.getItem(pids[i])) + parseInt(quantities[i]);
                            total.push(parseInt(response.data[0].price) * q);
                            const t = total.reduce((acc, curr) => { return acc + curr }, 0);
                            setTotalPrice(t);
                        } else {
                            total.push(parseInt(response.data[0].price) * parseInt(quantities[i]));
                            const t = total.reduce((acc, curr) => { return acc + curr }, 0);
                            setTotalPrice(t);
                        }
                        products.current.push(pids[i]);
                        products.current = products.current.slice(0, pids.length);
                    })
                }
            })
        } else {
            if (localStorage.length !== 0) {
                for (let i = 0; i < window.localStorage.length; i++) {
                    const pid = window.localStorage.key(i);
                    const q = JSON.parse(localStorage.getItem(pid));
                    Axios.post('http://localhost:3001/product/findProduct', {
                        productID: pid
                    }).then((response) => {
                        tempOrdered.push(response.data[0]);
                        total.push(parseInt(response.data[0].price) * q);
                        const t = total.reduce((acc, curr) => { return acc + curr }, 0);
                        setTotalPrice(t);
                    })
                }
                setOrderedProducts(tempOrdered);
            }
        }
    }, []);

    const orderForm = () => {
        orders.current = [];
        if (userType === "Customer") {
            for (let pid of products.current) {
                let totalQty = 0;
                const q = localStorage.getItem(pid);
                Axios.post('http://localhost:3001/shoppingCart/findQuantity', {
                    productID: pid,
                    CustomerID: user.CustomerID
                }).then((response) => {
                    if (q) {
                        totalQty = parseInt(Object.values(response.data[0])[0]) + parseInt(q);
                        console.log(q);
                    } else {
                        totalQty = parseInt(Object.values(response.data[0])[0]);
                    }
                    const order = [{ quantity: totalQty, ProductID: pid }, "New"];
                    orders.current.push(order)
                    console.log(orders);
                    if (orders.current.length === products.current.length) {
                        Axios.post('http://localhost:3001/shoppingCart/insertToOrder', {
                            CustomerID: user.CustomerID,
                            products: JSON.stringify(orders.current, replacer),
                            price: totalPrice,
                            date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
                        })
                            .then((response) => console.log(response))
                            .catch(err => console.log(err));
                    }
                });
            }
        }
        localStorage.clear();
        Axios.post('http://localhost:3001/shoppingCart/deleteShoppingCart', {
            CustomerID: user.CustomerID,
        }).then((response) => {})
    }

    const row = orderedProducts.map(product => {
        return (
            <CartRow
                key={product.ProductID}
                user={user}
                usertype={userType}
                data={product}
                totalPrice={setTotalPrice}
            />
        )
    })

    return (
        <div className="shopping-container w-75 mx-auto my-5 px-5 pb-5 bg-light ">
            <h2 className='mb-3'>Your Cart</h2>
            <table className='table table-light text-start'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <div className='cost-box d-flex justify-content-between align-items-center px-4 border border-secondary-subtle'>
                            <h5 className='text-secondary'>Total</h5>
                            <h5>${totalPrice.toLocaleString()}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-3'>
                <button className='checkout-btn d-inline-block me-5' onClick={orderForm}>Checkout</button>
                <button className='d-inline-block bg-dark continue-btn' onClick={navigateToShopping}>Continue Shopping</button>
            </div>
        </div>
    )
}

export default CartPage;