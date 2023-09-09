import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import OrderRow from "./OrderRow"

function OrderPage({ user }) {
    const [ order, setOrder ] = useState([]);
    const [ orderedProducts, setOrderedProducts] = useState([]);

    useEffect(() => {
        const tempArr = []
        Axios.post('http://localhost:3001/order/findOrder', {
            CustomerID: user.CustomerID
        }).then((response) => {
            setOrder(response.data)
            
            setOrderedProducts(JSON.parse(response.data[0].products));
        });
    }, [])

    // const row = orderedProducts.map(product => {
    //     return (
    //         <OrderRow key={product.ProductID} data={product} order={order}/>
    //     )
    // })

    const products = [];

    order.map(order => {
        let orderID = order.OrderID;
        JSON.parse(order.products).map(product => {
            products.push([orderID, product]);
        })
    })

    const row = products.map(product => {
        console.log(product[1][1]);
        return (
            <OrderRow key={product[0].ProductID} ProductID={product[1][0].ProductID} quantity={product[1][0].quantity} status={product[1][1]} OrderID={product[0]}/>
        )
    })

    return (
        <div className="shopping-container w-75 mx-auto my-5 px-5 pb-5 bg-light ">
            <h2 className='mb-3'>Your Order</h2>
            <table className='table table-light text-start'>
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Item</th>
                        <th scope="col" colSpan={2}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
        </div>
    )
}

export default OrderPage