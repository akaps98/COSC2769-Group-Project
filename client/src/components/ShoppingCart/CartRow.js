import React, { useEffect, useState} from 'react';

function CartRow({ user, usertype, data }) {
    const [ quantity, setQuantity ] = useState(1);
    const [ price, setPrice ] = useState(0);


    useEffect(() => {
        if(usertype === "Customer") {
            setQuantity(1)
            setPrice(data.price * quantity)
        } else {
            setPrice(data.price * quantity)
            setQuantity(+localStorage.getItem(data.ProductID))
        }
    }, [(localStorage.getItem(data.ProductID))])

    function addQuantity() {
        setQuantity(quantity + 1)
        setPrice(data.price * quantity);
        if(usertype === "Customer") {

        }
        const newQuantity = JSON.parse(localStorage.getItem(data.ProductID)) + 1;
        localStorage.setItem(data.ProductID, newQuantity);
    }

    function subQuantity() {
        if(quantity != 1) {
            setQuantity(quantity - 1)
        }
        setPrice(data.price * quantity);
        if(usertype === "Customer") {

        }
        let newQuantity = JSON.parse(localStorage.getItem(data.ProductID)) - 1;
        if(newQuantity < 1) {
            newQuantity = 1
        }
        localStorage.setItem(data.ProductID, newQuantity);
    }
    return (
        <tr>
            <th scope="row">{data.ProductID}</th>
            <td className='d-flex'>
                <img src={data.imagePath} className='item-img d-block'></img>
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

export default CartRow