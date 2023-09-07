import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import '../../assets/styles/cart.css'
import CartRow from './CartRow';

function CartPage({ user, userType }) {
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const products = useRef([]);

    useEffect(() => {

        const tempOrdered = [];
        const total = [];
        if (userType === "Customer") {
            Axios.post('http://localhost:3001/shoppingCart/findShoppingCart', {
                id: user.CustomerID
            }).then((response) => {
                const db = Object.keys(JSON.parse(response.data[0].product));
                for (let pid of db) {
                    const q = JSON.parse(localStorage.getItem(pid));
                    Axios.post('http://localhost:3001/product/findProduct', {
                        productID: pid
                    }).then((response) => {
                        setOrderedProducts(prev => [...prev, response.data[0]]);
                        setOrderedProducts(prev => prev.slice(0, db.length));
                        total.push(parseInt(response.data[0].price) * q);
                        const t = total.reduce((acc, curr) => { return acc + curr }, 0);
                        setTotalPrice(t);
                        products.current.push(pid);
                        products.current = products.current.slice(0, db.length);
                    })
                }
            })
        } else {
            for (let i = 0; i < window.localStorage.length; i++) {
                const q = JSON.parse(localStorage.getItem(localStorage.key(i)));
                const pid = window.localStorage.key(i);
                Axios.post('http://localhost:3001/product/findProduct', {
                    productID: pid
                }).then((response) => {
                    tempOrdered.push(response.data[0]);
                    total.push(parseInt(response.data[0].price) * q);
                    const t = total.reduce((acc, curr) => { return acc + curr }, 0);
                    setTotalPrice(t);
                    products.current.push(pid);
                    products.current = products.current.slice(0, localStorage.length);
                })
            }
            setOrderedProducts(tempOrdered);
        }
    }, []);

    // function getTotalPrice(price) {
    //     setTotalPrice(totalPrice + price);
    // }

    // const row = orderedProductsID.map(id => {
    //     Axios.post('http://localhost:3001/product/findProduct', {
    //         productID: id
    //     }).then((response) => {
    //         console.log(typeof(response.data)[0])
    //         return (
    //             <CartRow data={(response.data)[0]} />
    //         )
    //     })
    // })

    const orderForm = () => {
        const orders = [];
        for (let pid of products.current){
            const q = localStorage.getItem(pid);
            const order = [{quantity: q, ProductID: pid}, "New"]
            orders.push(order);
        }
        console.log(orders);
    }

    const row = orderedProducts.map(product => {
        //console.log(product)
        return (
            <CartRow
                key={product.ProductID}
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
                <button className='d-inline-block bg-dark continue-btn'>Continue Shopping</button>
            </div>

        </div>
    )
}

export default CartPage;