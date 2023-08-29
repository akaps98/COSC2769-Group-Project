import React, { useState } from 'react';
import SellerHeader from './SellerHeader';
import { Outlet } from 'react-router-dom';

function SellerPage() {
    const [ menuToggle, setMenuToggle ] = useState(false);
    return (
        <div className='seller-page-container'>
            <SellerHeader setMenuToggle={setMenuToggle} menuToggle = {menuToggle}/>
            <div className='seller-page-main-container'>
                <div className={menuToggle ? "background-wrapper" : ""}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}


export default SellerPage;