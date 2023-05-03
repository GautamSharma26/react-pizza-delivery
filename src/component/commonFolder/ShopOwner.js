import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { FetchUserDetail } from '../Authentication/UserDetailFetch';
import { storeToken, token_validate, customer_data_get, shop_retrieve_data } from '../Authentication/Slice/TokenSlice';
import jwtDecode from 'jwt-decode';


/**
 * 
 */
const ShopOwner = () => {
    // const navigate = useNavigate();
    // const refreshtokenvalue = localStorage.getItem("refresh")
    // const dispatch = useDispatch();
    // useEffect(() => {

    //     const generateAccessToken = () => {
    //         axios.post(`http://127.0.0.1:8000/generate_access_token/`, {
    //             "refresh": refreshtokenvalue
    //         })
    //             .then(res => {
    //                 dispatch(storeToken({ "access": res.data.access, "refresh": refreshtokenvalue }))
    //                 const x = FetchUserDetail(dispatch, navigate)
    //                 return x
    //             }).then(x => {
    //                 if (localStorage.getItem("is_shop_owner") === "false") {
    //                     navigate("/no-shop-owner");
    //                 }

    //             })

    //             .catch(err => {
    //                 console.log(err)
    //                 localStorage.clear()
    //                 navigate("/loginredirect")
    //             })
    //     };

    //     generateAccessToken();

    //     // eslint-disable-next-line
    // }, []);

    const navigate = useNavigate();
    const token_access = localStorage.getItem("access")
    const refreshtokenvalue = localStorage.getItem("refresh")
    const customer_data = useSelector(state => state.tokenData.user)
    const dispatch = useDispatch();
    const [setCount] = useState(0);
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
                                    .then(res => {
                                        console.log(res, "customer");
                                        const id = res.payload.user[0].id
                                        if (res.payload.user[0].is_shop_owner === true) {
                                            dispatch(shop_retrieve_data({ id: id }))
                                        }
                                        else{
                                            navigate("/no-shop-owner")
                                        }
                                    });
                                console.log(customer_data, "customer shop owner");
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
                    .then(res => {
                        console.log(res, "customer");
                        const id = res.payload.user[0].id
                        if (res.payload.user[0].is_shop_owner === true) {
                            dispatch(shop_retrieve_data({ id: id }))
                        }
                        else{
                            console.log("sdfhkcml");
                            navigate("/no-shop-owner")
                        }
                    });
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


// #endregion

export default ShopOwner;