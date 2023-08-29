import React from 'react'
import SellerHeader from './SellerHeader';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

function SellerPage() {
    const myRef = useRef({});

    return (
        <div className='seller-page-container'>
            <SellerHeader myRef = {myRef}/>
            <div className='seller-page-main-container'>
                <Outlet/>
            </div>
        </div>
    )
}


export default SellerPage;