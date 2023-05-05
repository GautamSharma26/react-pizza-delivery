import React from 'react';
import Navbar from '../Navbar';
import { Outlet} from 'react-router-dom';

const Frontend = () => {
    return <div>
        <Navbar />
        <Outlet />
    </div>;
}


// #endregion

export default Frontend;