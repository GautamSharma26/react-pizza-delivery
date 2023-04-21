import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { token_validate, customer_data_get } from '../Authentication/Slice/TokenSlice';
import { storeToken } from '../Authentication/Slice/TokenSlice';

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const customer_data = useSelector(state => state.tokenData.user)

    // dispatch(storeToken({ "access": res.data.access, "refresh": refreshtokenvalue }))
    const refreshtokenvalue = localStorage.getItem("refresh")
    useEffect(() => {
        dispatch(token_validate({ "refresh": refreshtokenvalue })).then(res => {
            console.log(res);

            if (res.type === "TokenSlice/token/fulfilled") {
                dispatch(storeToken({ "access": res.payload.access, "refresh": refreshtokenvalue }));
                dispatch(customer_data_get({ "access": res.payload.access }))
                    .then(res => { console.log(res, "customer"); });
                console.log(customer_data, "customer");
            }
            if (res.type === "TokenSlice/token/rejected") {
                localStorage.clear();
                navigate("/loginredirect");
            }
        })
        // eslint-disable-next-line
    }, [refreshtokenvalue])


    return <div>
        <Navbar />
        <Outlet />
    </div>;
}

export default User;