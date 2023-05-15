import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import logoLogin from "../../images/logologin.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { storeToken, loginStatus, customer_data_get } from "./Slice/TokenSlice";
import swal from "sweetalert";
import { useRef } from "react";


function UserLogin() {
    const passwordInput = useRef(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, SetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [textStatus, setTextStatus] = useState('')
    const postLogin = (e) => {
        const value = { statuslogin: "true" }
        const api = process.env.REACT_APP_API_URL

        e.preventDefault();
        axios.post(`${api}login/`, {
            email,
            password
        })
            .then(res => {
                dispatch(storeToken(res.data))
                setTextStatus(res.statusText)
                dispatch(loginStatus(value))
                dispatch(customer_data_get({ "access": res.data.access }))
                    .then(res => {
                        console.log(res);
                        if (res.payload.user[0].is_shop_owner === true) {
                            navigate("/shop-owner");

                        }
                        if (res.payload.user[0].is_delivery_boy === true) {
                            navigate("/user")
                        }
                        if (res.payload.user[0].is_delivery_boy === false && res.payload.user[0].is_shop_owner === false) {
                            navigate("/user")
                        }
                    });
                // navigate("/user")
            })
            .catch(err => {
                setTextStatus(err.statusText);
                swal("Ooh!", "Login Failed", "warning");
            })
    }

    useEffect(() => {
        SetEmail('');
        setPassword('');
    }, [textStatus])

    function showPassword(e) {
        // This fn is used to show password in text format and vice-versa
        if (passwordInput.current.type==="password"){
            passwordInput.current.type="text"
        }
        else{
            passwordInput.current.type="password"
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-8">
                            <div className="card shadow-2-strong card-login" style={{ borderRadius: "25px" }}></div>
                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={postLogin}>
                                    <div className="form-outline mb-4 text-center">
                                        <img src={logoLogin} alt="logo" className="text-center" />
                                        <p className="font-wieght-bold">Login To Your Account</p>
                                    </div>
                                    {/* <Email input */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                                        <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => SetEmail(e.target.value)} />
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example2">Password</label>
                                        <input type="password" id="form2Example2" ref={passwordInput} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    {/* <!--Show Password input --> */}
                                    <div className="form-outline mb-4 text-center">
                                        <input type="checkbox" onClick={e => showPassword(e)} defaultChecked={false}/> Show Password
                                    </div>

                                    {/* <!-- 2 column grid layout for inline styling --> */}
                                    <div className="row mb-4">
                                        <div className="col d-flex justify-content-center">
                                            {/* <!-- Checkbox --> */}
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                            </div>
                                        </div>

                                        <div className="col">
                                            {/* <!-- Simple link --> */}
                                            <Link to="/resetpassword">Forgot password?</Link>
                                        </div>
                                    </div>

                                    {/* <!-- Submit button --> */}
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                                    {/* <!-- Register buttons --> */}
                                    <div className="text-center">
                                        <p>Not a member? <Link to="/registration">Register</Link></p>
                                        {/* <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default UserLogin;