import React, { useRef } from 'react';
import SellerHeader from './SellerHeader';
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