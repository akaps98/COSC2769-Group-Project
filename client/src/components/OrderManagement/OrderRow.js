import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../../assets/styles/cart.css'

function OrderRow({ ProductID, quantity, status, OrderID }) {
    const [product, setProduct] = useState([]);
    const [isShipped, setIsShipped] = useState(false);

    useEffect(() => {
        Axios.post('http://localhost:3001/product/findProduct', {
            productID: ProductID
        }).then((response) => {
            setProduct(response.data[0])
        });

        if(status === "Shipped") {
            setIsShipped(true);
        }
    }, [])

    function reject() {
        Axios.post('http://localhost:3001/order/updateOrderStatus', {
            OrderID: OrderID,
            ProductID: ProductID,
            newStatus: "Rejected"
        }).then((response) => {});
        window.location.reload();
    }

    function accept() {
        Axios.post('http://localhost:3001/order/updateOrderStatus', {
            OrderID: OrderID,
            ProductID: ProductID,
            newStatus: "Accepted"
        }).then((response) => {});
        window.location.reload();
    }

    return (
        <tr>
            <th scope="row">{OrderID}</th>
            <td className='d-flex'>
                <div className='item-info ps-4'>
                    <h3 className='item-name'>{product.name}</h3>
                    <p className='item-date text-warning py-0'>[{product.dateAdded}]</p>
                    <h5 className=''>Quantity: <span>{quantity}</span></h5>
                </div>

            </td>
            <td>{status}</td>
            <td>
            {(isShipped) &&
                <div className='order-container'>
                    <button id="rejectBtn" className={`d-block order-btn bg-danger mb-3 ${isShipped ? 'active' : 'blur'}`} onClick={reject}>Reject</button>
                    <button id="acceptBtn" className={`d-block order-btn bg-primary ${isShipped ? 'active' : 'blur'}`} onClick={accept}>Accept</button>
                </div>
            }
            </td>
        </tr>
    )
}

export default OrderRow