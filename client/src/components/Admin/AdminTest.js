import React from 'react';
import CategoryTest from './CategoryTest';
import SellerTest from './SellerTest';

export default function AdminTest() {
    return (
        <div className='m-5'>
            <h2>Admin Page Test</h2>
            <SellerTest/>
            <CategoryTest/>
        </div>
    )
}