// import React from 'react'
// import { Outlet, Route, useNavigate } from 'react-router-dom';
// // import TokenAuthentication from './TokenAuthentication';

// const PrivateRouter = ({ children, ...rest }) => {
//     const token_access = localStorage.getItem("access")
//     const refreshtokenvalue = localStorage.getItem("refresh")
//     // const value = TokenAuthentication
//     const navigate = useNavigate();
//     // console.log(value,"values");
//     return (
//         TokenAuthentication()? <Outlet/>:navigate("/login")
//     )
// }

// export default PrivateRouter