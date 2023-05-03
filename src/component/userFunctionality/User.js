import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { token_validate, customer_data_get, storeToken } from '../Authentication/Slice/TokenSlice';
import jwtDecode from 'jwt-decode';

const User = () => {
    const navigate = useNavigate();
    const token_access = localStorage.getItem("access")
    const refreshtokenvalue = localStorage.getItem("refresh")
    const customer_data = useSelector(state => state.tokenData.user)
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    useEffect(() => {

        const intervalId = setInterval(() => {
            setCount(count => count + 1);
        }, 300000); // update every 5 minutes



        console.log("navigate", token_access, refreshtokenvalue);
        if (token_access) {
            const access_token_validity = jwtDecode(token_access).exp;
            const refresh_token_validity = jwtDecode(refreshtokenvalue).exp
            const currentTime = Date.now() / 1000;
            if (access_token_validity < currentTime) {
                if (refresh_token_validity > currentTime) {
                    console.log("sdfhjsdfds");
                    dispatch(token_validate({ "refresh": refreshtokenvalue }))
                        .then(res => {
                            console.log(res);
                            if (res.type === "TokenSlice/token/fulfilled") {
                                console.log("tok");
                                dispatch(storeToken({ "access": res.payload.access, "refresh": refreshtokenvalue }));
                                dispatch(customer_data_get({ "access": res.payload.access }))
                                    .then(res => { console.log(res, "customer"); });
                                console.log(customer_data, "customer");
                            }

                            // dispatch(storeToken({ "access": res.payload.access, "refresh": refreshtokenvalue }));
                        })
                }
                else {
                    window.location.reload(true);
                    localStorage.clear();
                    navigate("/login");
                }
            }
            else {
                dispatch(customer_data_get({ "access": token_access }))
                    .then(res => { console.log(res.payload.user[0], "customer"); });
                console.log(customer_data, "customer");
                console.log("not expired", access_token_validity);
            }

        }
        else {
            // window.location.reload(true);
            localStorage.clear();
            navigate("/login");
        }
        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line
    }, [navigate, token_access, 6000])



    return <div>
        <Navbar />
        <Outlet />
    </div>;
}

export default User;