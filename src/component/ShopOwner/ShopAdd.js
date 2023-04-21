import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShopAdd = () => {
    const user = useSelector(state => state.tokenData.user)
    console.log(user["is_shop_owner"]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const accesstokenvalue = localStorage.getItem("access")
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
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        user["is_shop_owner"] === false && navigate("/no-shop-owner")
        // eslint-disable-next-line
    }, [user])
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