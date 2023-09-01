import React from 'react';
import CategoryTest from './CategoryTest';
import SellerTest from './SellerTest';

export default function AdminTest() {
    return (
        <div className='admin-page-container'>
            <SellerTest/>
            <CategoryTest/>
        </div>
    )
}