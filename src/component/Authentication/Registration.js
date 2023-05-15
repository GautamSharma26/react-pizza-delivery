import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useSelector } from "react-redux";
// import registerimg from "../../images/registration.jpg";

const Registration = () => {
    const loginStatus = useSelector(state => state.tokenData.loginstatus);
    console.log(loginStatus, "st")
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhone] = useState('');
    const [is_delivery_boy, setDeliveryBoy] = useState('true');
    const [is_shop_owner, setShopOwner] = useState('false');
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [status, setStatus] = useState('')


    const registerUser = (e) => {
        const api = process.env.REACT_APP_API_URL
        e.preventDefault();
        axios.post(`${api}user_register/`, {
            first_name,
            last_name,
            email,
            phone_no,
            is_delivery_boy,
            is_shop_owner,
            password,
            password2
        })
            .then(res => setStatus(res.statusText))
            .catch(err => console.log(err))
    }

    const radioResult = (e) => {
        if (e.value === "is_shop_owner") {
            setDeliveryBoy('false')
            setShopOwner('true')
        }
        if (e.value === "is_delivery_boy") {
            setShopOwner('false')
            setDeliveryBoy('true')
        }
    }
    useEffect(() => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setDeliveryBoy("true");
        setShopOwner("false");
        setPassword("");
        setPassword2("");
    }, [status])

    return (
        <div className="container-fluid">
            <div className="row">
                <div class="container py-5 h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12">
                            <div class="card shadow-2-strong card-registration" style={{ borderRadius: "25px" }}>
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                    <form onSubmit={registerUser}>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <input type="text" id="firstName" class="form-control form-control-lg" value={first_name} onChange={(e) => setFirstname(e.target.value)} />
                                                    <label class="form-label" for="firstName">First Name</label>
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <input type="text" id="lastName" class="form-control form-control-lg" value={last_name} onChange={(e) => setLastname(e.target.value)} />
                                                    <label class="form-label" for="lastName">Last Name</label>
                                                </div>

                                            </div>
                                        </div>
                                        {/* //row2 */}
                                        <div class="row">
                                            <div class="col-md-6 mb-4 pb-2">

                                                <div class="form-outline">
                                                    <input type="email" id="emailAddress" class="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label class="form-label" for="emailAddress">Email</label>
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4 pb-2">

                                                <div class="form-outline">
                                                    <input type="tel" id="phoneNumber" class="form-control form-control-lg" onChange={(e) => setPhone(e.target.value)} />
                                                    <label class="form-label" for="phoneNumber">Phone Number</label>
                                                </div>

                                            </div>
                                        </div>
                                        {/* row3 */}
                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <input type="text" id="firstName" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    <label class="form-label" for="firstName">Password</label>
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <input type="text" id="lastName" class="form-control form-control-lg" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                                    <label class="form-label" for="lastName">Password2</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4 pb-2">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"
                                                        name="flexRadioDefault" id="flexRadioDefault1"
                                                        value="is_shop_owner"
                                                        checked={is_shop_owner === "true"}
                                                        onChange={(e) => radioResult(e.target)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        is_shop_owner
                                                    </label>
                                                    {/* // setShopOwner(e.target.value) */}
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input"
                                                        // checked={is_delivery_boy===true}
                                                        type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                                        value="is_delivery_boy"
                                                        checked={is_delivery_boy === "true"}
                                                        onChange={(e) => radioResult(e.target)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        is_delivery_boy
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-4 pt-2 text-center">
                                            <input class="btn btn-primary btn-lg" type="submit" value="Submit" />
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <p>Already have an account?<Link to="/login">Login</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;