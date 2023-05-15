import React, { useEffect,useState } from 'react';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { token_validate, customer_data_get, storeToken } from '../Authentication/Slice/TokenSlice';
import jwtDecode from 'jwt-decode';

const User = () => {
    const navigate = useNavigate();
    const token_access = localStorage.getItem("access")
    const refreshtokenvalue = localStorage.getItem("refresh")
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    setInterval(()=>{setCount(count+1)},300000)
    useEffect(() => {

        // const intervalId = setInterval(() => {
        //     setCount(count = count + 1);
        // }, 300000); // update every 5 minutes
        if (token_access) {
            const access_token_validity = jwtDecode(token_access).exp;
            const refresh_token_validity = jwtDecode(refreshtokenvalue).exp
            const currentTime = Date.now() / 1000;
            if (access_token_validity < currentTime) {
                if (refresh_token_validity > currentTime) {
                    dispatch(token_validate({ "refresh": refreshtokenvalue }))
                        .then(res => {
                            if (res.type === "TokenSlice/token/fulfilled") {
                                dispatch(storeToken({ "access": res.payload.access, "refresh": refreshtokenvalue }));
                                dispatch(customer_data_get({ "access": res.payload.access }))
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

            }

        }
        else {
            // window.location.reload(true);
            localStorage.clear();
            navigate("/login");
        }
        // return () => {
        //     clearInterval(intervalId);
        // };
        // eslint-disable-next-line
    }, [navigate, token_access, count])



    return <div>
        <Navbar />
        <Outlet />
    </div>;
}

export default User;