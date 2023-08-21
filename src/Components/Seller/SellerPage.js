import React from 'react'
import Statistics from './Statistics';
import ProductManage from './ProductManage';
import SellerHeader from './SellerHeader';

function SellerPage() {
    return (
        <>
            <SellerHeader/>
            <Statistics/>
            <ProductManage/>
        </>
    )
}


export default SellerPage;