import React from 'react';
import '../../assets/styles/cart.css'
import iphone from '../../assets/images/products/iPhone14.png'


function CartPage() {
    return (
        <div className="shopping-container w-75 mx-auto my-5 px-5 pb-5 bg-light ">
            <h2 className='mb-3'>Your Cart (4 items)</h2>
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
                    <tr>
                        <th scope="row">1</th>
                        <td className='d-flex'>
                            <img src={iphone} className='item-img d-block'></img>
                            <div className='item-info ps-4'>
                                <h3 className='item-name'>Iphone 14</h3>
                                <p className='item-date text-warning py-0'>[Date Added: 16th June 2023]</p>
                                <button className='remove-btn bg-light text-black-50'>Remove</button>
                            </div>

                        </td>
                        <td>$1200</td>
                        <td>
                            <div className='d-flex'>
                                <button className='quantity-btn bg-danger'>-</button>
                                <span className='quantity-box d-inline-block bg-light text-black text-center border'>1</span>
                                <button className='quantity-btn bg-primary'>+</button>
                            </div>
                        </td>
                        <td>$1200</td>
                    </tr>
                    
                </tbody>
            </table>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <div className='cost-box d-flex justify-content-between align-items-center px-4 border border-secondary-subtle'>
                            <h5 className='text-secondary'>Discount</h5>
                            <h5>$50</h5>
                        </div>
                    </div>
                    <div class="col">
                        <div className='cost-box d-flex justify-content-between align-items-center px-4 border border-secondary-subtle'>
                            <h5 className='text-secondary'>Tax</h5>
                            <h5>$0</h5>
                        </div>
                    </div>
                    <div class="col">
                        <div className='cost-box d-flex justify-content-between align-items-center px-4 border border-secondary-subtle'>
                            <h5 className='text-secondary'>Subtotal</h5>
                            <h5>$2200</h5>
                        </div>
                    </div>
                    <div class="col">
                        <div className='cost-box d-flex justify-content-between align-items-center px-4 border border-secondary-subtle'>
                            <h5 className='text-secondary'>Total</h5>
                            <h5>$4000</h5>
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

export default CartPage