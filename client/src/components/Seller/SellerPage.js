import React, { useState } from 'react';
import SellerHeader from './SellerHeader';
import { Outlet } from 'react-router-dom';
import Unapproved from './Unapproved';

function SellerPage({ status }) {
    const [ menuToggle, setMenuToggle ] = useState(false);
    return (
        <div className='seller-page-container'>
            <SellerHeader setMenuToggle={setMenuToggle} menuToggle = {menuToggle}/>
            <div className='seller-page-main-container'>
                {(status==="Approved") ?
                    <div className={menuToggle ? "background-wrapper" : ""}>
                        <Outlet/>
                    </div>
                    :
                    <Unapproved/>
                }
            </div>
        </div>
    )
}


export default SellerPage;