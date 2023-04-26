import React from "react"
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { loginStatus, logout_user_slice } from "./Authentication/Slice/TokenSlice";


const Navbar = () => {
    const value = { statuslogin: "false" }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginStatusData = useSelector((state) => state.tokenData.loginstatus);
    const handleClose = () => dispatch(loginStatus(value))
    const user = useSelector(state => state.tokenData.user)
    const refreshtokenvalue = useSelector((state) => state.tokenData.refreshtoken)

    console.log(refreshtokenvalue);
    function LogoutUser(e) {
        if (refreshtokenvalue !== "") {
            console.log("logout");
            dispatch(logout_user_slice({ "refresh": refreshtokenvalue }))
                .then(res => {
                    console.log(res);
                    if (res.type === "TokenSlice/logout/fulfilled") {
                        localStorage.clear();
                        window.location.reload(true);
                        navigate("/loginredirect");
                    }
                })
        }
    }

    return (
        <>
            {loginStatusData === "true" && <><Modal show={loginStatusData} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hurray!!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    User Logged In SuccessFully
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal></>}

            <nav className="navbar navbar-expand-lg" style={{
                position: "relative",
                height: "100%",
                background: "#e48b40"
            }}>
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Opt! One
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {user['is_shop_owner'] === true && <Link to="/shop-owner/shopAdd" className="dropdown-item">Add Shop</Link>}
                                {user['is_shop_owner'] === true && <Link to="/shop-owner/add-pizza" className="dropdown-item">Add Pizza</Link>}
                                <Link to="/user/shop-list" className="dropdown-item">View All Shop</Link>
                                {user['is_shop_owner'] === false && <Link to="/user" className="dropdown-item">Customer</Link>}
                                {user['is_shop_owner'] === false && <Link to="/user/cart" className="dropdown-item">Cart</Link>}
                                <div className="dropdown-divider"></div>
                                {!refreshtokenvalue && <Link to="/login" className="dropdown-item">Login</Link>}
                                {!user && <Link to="/registration" className="dropdown-item">Registration</Link>}
                                {refreshtokenvalue !== "" && <button className="dropdown-item" onClick={e => { LogoutUser(e) }}>Logout</button>}
                            </div>
                        </li>
                    </ul>
                    <form class="d-flex">
                       <Link to="/user/cart"> <i className="fa badge" style={{ fontSize: "24px" }} value={user['total_items']} >&#xf07a;</i></Link>
                    </form>
                </div>
            </nav>
        </>

    )

}

export default Navbar;