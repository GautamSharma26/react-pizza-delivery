import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { token_validate } from '../Authentication/Slice/TokenSlice';
import { storeToken } from '../Authentication/Slice/TokenSlice';


const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // dispatch(storeToken({ "access": res.data.access, "refresh": refreshtokenvalue }))
    const refreshtokenvalue = localStorage.getItem("refresh")
       useEffect(()=>{
        dispatch(token_validate({"refresh":refreshtokenvalue}))
        .then(res=>{{console.log(res,"res");
        if (res.type==="TokenSlice/token/rejected"){
            navigate("/loginredirect")
        }
        if (res.type==="TokenSlice/token/fulfilled"){
            dispatch(storeToken({ "access": res.payload.access, "refresh": refreshtokenvalue }))
        }
        
    }})
        .catch(err=>{console.log(err);})
       },[])
    // dispatch(token_validate({ "refresh": refreshtokenvalue }))
    //     .then(res => { console.log(res, "res") })

    return <div>
        <Navbar />
        <Outlet />
    </div>;
}
// #endregion

export default User;