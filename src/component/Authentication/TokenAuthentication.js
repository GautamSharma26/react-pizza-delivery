import React from 'react'
import jwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { storeToken, customer_data_get, token_validate } from './Slice/TokenSlice';
import { useNavigate } from 'react-router-dom';

const TokenAuthentication = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token_access = localStorage.getItem("access")
    const refreshtokenvalue = localStorage.getItem("refresh")
    const customer_data = useSelector(state => state.tokenData.user)

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
                return true;
            }
            else {
                window.location.reload(true);
                localStorage.clear();
                return false;
            }
        }
        else {
            dispatch(customer_data_get({ "access": token_access }))
                .then(res => { console.log(res, "customer"); });
            console.log(customer_data, "customer");
            console.log("not expired", access_token_validity);
            return true;
        }

    }
    else {
        // window.location.reload(true);
        localStorage.clear();
        return false;
    }
    return (
        <div></div>
    )
}

export default TokenAuthentication