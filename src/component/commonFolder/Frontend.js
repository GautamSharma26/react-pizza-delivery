import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { token_validate, customer_data_get, storeToken } from '../Authentication/Slice/TokenSlice';

const Frontend = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const refreshtokenvalue = localStorage.getItem("refresh");
    // const user = useSelector(state=>state.tokenData.user)&&user

    // useEffect(() => {
    //     dispatch(token_validate({ "refresh": refreshtokenvalue })).then(res => {

    //         if (res.type === "TokenSlice/token/fulfilled") {
    //             dispatch(storeToken({ "access": res.payload.access, "refresh": refreshtokenvalue }));
    //             dispatch(customer_data_get({ "access": res.payload.access }));

    //         }
    //         if (res.type === "TokenSlice/token/rejected") {
    //             localStorage.clear();
    //             // window.location.reload(true);
    //             navigate("/loginredirect");
    //         }
    //     })
    //     // eslint-disable-next-line
    // }, [])
    // console.log(user);
    return <div>
        <Navbar />
        <Outlet />
    </div>;
}


// #endregion

export default Frontend;