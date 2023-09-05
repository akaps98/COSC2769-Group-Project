import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../../assets/styles/cart.css'
import iphone from '../../assets/images/products/iPhone14.png'
import CartRow from './CartRow';

function CartPage({ user, userType }) {
    const [ products, setProducts ] = useState([]);
    const [ shoppingCartDB, setShoppingCartDB ] = useState([]);
    const [ orderedProducts, setOrderedProducts ] = useState([]);
    const [ totalPrice, setTotalPrice ] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/allProducts').then((response) => {
            setProducts(response.data);
        });

        const tempOrdered = [];
        if (userType === "Customer") {
            Axios.post('http://localhost:3001/shoppingCart/findShoppingCart', {
                id: user.CustomerID
            }).then((response) => {
                const db = Object.keys(JSON.parse(response.data[0].product));
                for (let pid of db) {
                    Axios.post('http://localhost:3001/product/findProduct', {
                        productID: pid
                    }).then((response) => {
                        setOrderedProducts(prev => [...prev, response.data[0]]);
                        setOrderedProducts(prev => prev.slice(0, db.length));
                    })
                }
            })
        }else {
            for (let i = 0; i < window.localStorage.length; i++) {
                Axios.post('http://localhost:3001/product/findProduct', {
                    productID: window.localStorage.key(i)
                }).then((response) => {
                    tempOrdered.push(response.data[0]);
                })
            }
            setOrderedProducts(tempOrdered)
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

    const row = orderedProducts.map(product => {
        //console.log(product)
        return (
            <CartRow data={product} />
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
                            <h5 className='text-secondary'>Discount</h5>
                            <h5>$50</h5>
                        </div>
                    </div>
                    <div className="col">
                        <div className='cost-box d-flex justify-content-between align-items-center px-4 border border-secondary-subtle'>
                            <h5 className='text-secondary'>Tax</h5>
                            <h5>$0</h5>
                        </div>
                    </div>
                    <div className="col">
                        <div className='cost-box d-flex justify-content-between align-items-center px-4 border border-secondary-subtle'>
                            <h5 className='text-secondary'>Subtotal</h5>
                            <h5>$2200</h5>
                        </div>
                    </div>
                    <div className="col">
                        <div className='cost-box d-flex justify-content-between align-items-center px-4 border border-secondary-subtle'>
                            <h5 className='text-secondary'>Total</h5>
                            <h5>${totalPrice}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-3'>
                <button className='checkout-btn d-inline-block me-5'>Checkout</button>
                <button className='d-inline-block bg-dark continue-btn'>Continue Shopping</button>
            </div>
            
        </div>
    )
}

export default CartPage;