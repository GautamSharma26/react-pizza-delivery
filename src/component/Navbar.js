import React from "react"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import {loginStatus } from "./Authentication/Slice/TokenSlice";

const Navbar = () => {
    const value={statuslogin:"false"}
    const dispatch = useDispatch();
    const loginStatusData = useSelector((state)=>state.tokenData.loginstatus);
    const handleClose = () => dispatch(loginStatus(value))
   
 
    return (
        <>
        {loginStatusData==="true" && <><Modal show={loginStatusData} onHide={handleClose}>
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
            position:"relative",
            height:"100%",
            background:"#e48b40"
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
                            <Link to="/shop-owner/shopAdd" className="dropdown-item">Add Shop</Link>
                            <Link to="/shop-list" className="dropdown-item">View All Shop</Link>
                            <Link to="/shop-owner/add-pizza" className="dropdown-item">Add Pizza</Link>
                            <Link to="/user" className="dropdown-item">Customer</Link>
                            <Link to="/user/cart" className="dropdown-item">Cart</Link>
                            <div className="dropdown-divider"></div>
                            <Link to="/login" className="dropdown-item">Login</Link>
                            <Link to="/registration" className="dropdown-item">Registration</Link>
                        </div>
                    </li>
                </ul>
               
            </div>
        </nav>
        </>
        
        
        )
        
}

export default Navbar;