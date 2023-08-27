import React from 'react'
import Statistics from './Statistics';
import ProductManage from './ProductManage';
import SellerHeader from './SellerHeader';
import OrderList from './OrderList';

function SellerPage() {
    return (
        <>
            <SellerHeader/>
            <Statistics/>
            <ProductManage/>
            <OrderList/>
        </>
    )
}


export default SellerPage;