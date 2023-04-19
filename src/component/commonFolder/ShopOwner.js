import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';


/**
 * 
 */
const ShopOwner = () => {
    return<div>
        <Navbar/>
        <Outlet/>
    </div>;
}


// #endregion

export default ShopOwner;