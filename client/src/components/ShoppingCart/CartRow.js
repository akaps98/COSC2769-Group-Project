import React, { useEffect, useState } from 'react';
import Axios from 'axios'

function CartRow({ user, usertype, data, totalPrice }) {
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (usertype === "Customer") {
            Axios.post('http://localhost:3001/shoppingCart/findQuantity', {
                productID: data.ProductID,
                CustomerID: user.CustomerID
            }).then((response) => {
                const q = parseInt(Object.values(response.data[0])[0]);
                setQuantity(q);
                setPrice(data.price * q);
            });
        }else {
            const q = parseInt(localStorage.getItem(data.ProductID));
            console.log(q);
            setQuantity(q);
            setPrice(data.price * q);
        }
    }, []);

    useEffect(() => {
        if(usertype === "Customer"){
            setPrice(data.price * quantity);
        }else{
            const q = parseInt(localStorage.getItem(data.ProductID));
            setPrice(data.price * q);
        }
    }, [localStorage.getItem(data.ProductID)])

    function addQuantity() {
        setQuantity(quantity + 1)
        setPrice(data.price * quantity);
        totalPrice(prev => prev + data.price);
        const newQuantity = JSON.parse(localStorage.getItem(data.ProductID)) + 1;
        localStorage.setItem(data.ProductID, newQuantity);
    }

    function subQuantity() {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
            totalPrice(prev => prev - data.price);
        }
        setPrice(data.price * quantity);
        let newQuantity = JSON.parse(localStorage.getItem(data.ProductID)) - 1;
        if (newQuantity < 1) {
            newQuantity = 1
        }
        localStorage.setItem(data.ProductID, newQuantity);
    }
    return (
        <tr>
            <th scope="row">{data.ProductID}</th>
            <td className='d-flex'>
                <img src={`http://localhost:3001/${data.imagePath}`} alt={data.ProductID} className='item-img d-block'></img>
                <div className='item-info ps-4'>
                    <h3 className='item-name'>{data.name}</h3>
                    <p className='item-date text-warning py-0'>[Date Added: {data.dateAdded}]</p>
                    <button className='remove-btn bg-light text-black-50'>Remove</button>
                </div>
            </td>
            <td>{data.price}</td>
            <td>
                <div className='d-flex'>
                    <button className='quantity-btn bg-danger' onClick={subQuantity}>-</button>
                    <span className='quantity-box d-inline-block bg-light text-black text-center border'>{quantity}</span>
                    <button className='quantity-btn bg-primary' onClick={addQuantity}>+</button>
                </div>
            </td>
            <td>${price}</td>
        </tr>
    )
}

export default CartRow;