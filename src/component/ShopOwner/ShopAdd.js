import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { storeToken } from "../Authentication/Slice/TokenSlice";
import { useNavigate } from "react-router-dom";
import { FetchUserDetail } from "../Authentication/UserDetailFetch";

const ShopAdd = () => {
    // console.log(localStorage.getItem("refresh"),"lkl")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('')
    // const accesstokenvalue = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5NjQ2NDU3LCJpYXQiOjE2Nzk2NDQ2NTcsImp0aSI6Ijg1NGJmYzUwNmE5ZTQ2NWM4NWE0NWNhZThmMTNlZjJlIiwidXNlcl9pZCI6NH0.paG28r6mGg46UnU7Em_NezHvayplxy3sGIs-IgwubKg"
    // console.log(refreshtokenvalue)
    // const accesstokenvalue = useSelector((state) => state.tokenData.accesstoken)
    // const refreshtokenvalue = useSelector((state) => state.tokenData.refreshtoken)
    const accesstokenvalue = localStorage.getItem("access")
    const refreshtokenvalue = localStorage.getItem("refresh")
    console.log(accesstokenvalue, "kkkkk")

    const addShop = (e) => {
        // const owner_id = localStorage.getItem("shop_owner_id")

        e.preventDefault();
        axios.post("http://127.0.0.1:8000/product/shop/",
            {
                // owner:owner_id,
                name,
                location
            },
            {
                headers: {
                    Authorization: `Bearer ${accesstokenvalue}`
                }
            },

        )
            .then(res => {
                setStatus(res.statusText)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                setStatus(err.statusText)
            })
    }


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
                    navigate("/loginredirect")
                })
        };
        generateAccessToken();
        setName("");
        setLocation("");
        // eslint-disable-next-line
    }, [status]);
    return (
        <>

            <div className="mask d-flex align-items-center mt-4">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Register Your Shop</h2>

                                    <form onSubmit={addShop}>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example1cg">Shop Name</label>
                                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" value={name} onChange={(e) => setName(e.target.value)} />

                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example3cg">Location</label>
                                            <input type="text" id="form3Example3cg" className="form-control form-control-lg" value={location} onChange={(e) => setLocation(e.target.value)} />

                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                        </div>
                                        <div className="text-center"><Link to="/"
                                            className="fw-bold text-body"><u>Home</u></Link>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ShopAdd;