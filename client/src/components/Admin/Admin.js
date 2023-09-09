import React from 'react';
import Category from './Category';
import Seller from './Seller';

export default function Admin() {
    return (
        <div className='admin-page-container'>
            <h2>Admin page</h2>
            <Seller/>
            <Category/>
        </div>
    )
}