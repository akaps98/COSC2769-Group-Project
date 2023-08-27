import React, { useRef } from 'react'
import Statistics from './Statistics';
import ProductManage from './ProductManage';
import SellerHeader from './SellerHeader';
import OrderList from './OrderList';
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