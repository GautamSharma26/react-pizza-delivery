import React from 'react';
import { Link } from 'react-router-dom';


/**
 * 
 */
const NoPage = () => {
    return <div>
        <h1>No Page Found</h1>
        <Link to='/'><h2>Home</h2></Link>
    </div>;
}

// #endregion

export default NoPage;