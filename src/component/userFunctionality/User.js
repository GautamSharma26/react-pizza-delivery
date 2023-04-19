import React from 'react';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FetchUserDetail } from '../Authentication/UserDetailFetch';
import { storeToken } from '../Authentication/Slice/TokenSlice';

const User = () => {
    const navigate = useNavigate();
    const refreshtokenvalue = localStorage.getItem("refresh")
    const dispatch = useDispatch();
    useEffect(() => {

        const generateAccessToken = () => {
            axios.post(`http://127.0.0.1:8000/generate_access_token/`, {
                "refresh": refreshtokenvalue
            })
                .then(res => {
                    dispatch(storeToken({ "access": res.data.access, "refresh": refreshtokenvalue }))
                    const x = FetchUserDetail(dispatch, navigate)
                    return x
                }).then(x => {
                    if (localStorage.getItem("is_shop_owner") === "false") {
                        navigate("/no-shop-owner");
                    }

                })

                .catch(err => {
                    console.log(err)
                    localStorage.clear()
                    navigate("/loginredirect")
                })
        };

        generateAccessToken();

        // eslint-disable-next-line
    }, []);
    return <div>
        <Navbar />
        <Outlet />
    </div>;
}
// #endregion

export default User;