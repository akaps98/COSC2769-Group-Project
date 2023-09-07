import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../../assets/styles/cart.css'

function OrderRow({ data, order }) {
    const [product, setProduct] = useState([]);
    const [isShipped, setIsShipped] = useState(false);

    useEffect(() => {
        Axios.post('http://localhost:3001/product/findProduct', {
            productID: data[0].ProductID
        }).then((response) => {
            setProduct(response.data[0])
        });

        if(data[1] === "Shipped") {
            setIsShipped(true);
        }
    }, [])

    function reject() {
        Axios.post('http://localhost:3001/order/updateOrderStatus', {
            OrderID: order[0].OrderID,
            ProductID: data[0].ProductID,
            newStatus: "Rejected"
        }).then((response) => {});
        window.location.reload();
    }

    function accept() {
        Axios.post('http://localhost:3001/order/updateOrderStatus', {
            OrderID: order[0].OrderID,
            ProductID: data[0].ProductID,
            newStatus: "Accepted"
        }).then((response) => {});
        window.location.reload();
    }

    return (
        <tr>
            <th scope="row">{order[0].OrderID}</th>
            <td className='d-flex'>
                <div className='item-info ps-4'>
                    <h3 className='item-name'>{product.name}</h3>
                    <p className='item-date text-warning py-0'>[{product.dateAdded}]</p>
                    <h5 className=''>Quantity: <span>{data[0].quantity}</span></h5>
                </div>

            </td>
            <td>{data[1]}</td>
            <td>
                <div className='order-container'>
                    <button disabled={!isShipped} className='d-block order-btn bg-danger mb-3' onClick={reject}>Rejected</button>
                    <button disabled={!isShipped} className='d-block order-btn bg-primary' onClick={accept}>Accepted</button>
                </div>
            </td>
        </tr>
    )
}

export default OrderRow