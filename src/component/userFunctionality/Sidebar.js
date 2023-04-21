import React, { useState,useEffect } from 'react';
import CreateAddress from './CreateAddress';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { token_validate,storeToken } from '../Authentication/Slice/TokenSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addressadd, setAddressAdd] = useState("false")
    const user = useSelector(state => state.tokenData.user)
    console.log(user['first_name'], "user")
    console.log(addressadd, "lklk");

    const refreshtokenvalue = localStorage.getItem("refresh")
    useEffect(() => {
        dispatch(token_validate({ "refresh": refreshtokenvalue })).then(res => {

            if (res.type === "TokenSlice/token/fulfilled") {
                dispatch(storeToken({ "access": res.payload.access, "refresh": refreshtokenvalue }));
                
            }
            if (res.type === "TokenSlice/token/rejected") {
                localStorage.clear();
                navigate("/loginredirect");
            }
        })
        // eslint-disable-next-line
    }, [refreshtokenvalue])
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2 col-sm-4 px-0'>
                    <div style={{
                        minHeight: `calc(100vh - ${60}px)`,
                        background: "rgb(45 48 50)",
                        paddingLeft: "15px"

                    }} >

                        <div className="dropdown dropright">
                            <a className='text-white font-weight-bold ' href='/user' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Personal Details
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/user">Update Photo</a></li>
                                <li><a className="dropdown-item" href="user">Update Name</a></li>
                                <li><a className="dropdown-item" href="user">Update Mobile No.</a></li>
                            </ul>
                        </div>

                        <div className="dropdown dropright pt-5">
                            <a className='text-white font-weight-bold ' href='/user' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Address Details
                            </a>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={e => { console.log("add"); setAddressAdd("true") }} >Add Address</button></li>
                                <li><button className="dropdown-item" onClick={e => { console.log("cliced"); navigate("show-address"); }}>View All Saved Address</button></li>
                            </ul>
                        </div>

                        <div className='fixed-bottom px-3 pb-4'>
                            <button type='button' className='text-white font-weight-bold btn-danger' onClick={e => console.log("hii")}>Logout</button>
                        </div>
                    </div>

                </div>


                <div className='col-md-10 col-sm-8'>

                    {addressadd === "true" ? <CreateAddress add_address_st={setAddressAdd} /> :
                        <div style={{
                            top: "40%",
                            position: "absolute",
                            left: "35%",
                            textAlign: "center",


                        }}>
                            <img className="rounded-circle" alt="No Pic" src="" />
                            <br />
                            <a href='/user'>Update Profile Pic</a>
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}

// #endregion

export default Sidebar;