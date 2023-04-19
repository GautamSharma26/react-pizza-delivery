import React from 'react';
import { useEffect, useState } from 'react';
// import { json, Link } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storeToken } from '../Authentication/Slice/TokenSlice';
import { FetchUserDetail } from '../Authentication/UserDetailFetch';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OwnerViewPizza from '../ShopOwner/OwnerViewPizza';




const AddPizza = () => {
    const [viewState, setViewState] = useState("false");

    const shop_data = useSelector(state => state.tokenData.shop);
    const [status, setStatus] = useState("");

    const [card, setCard] = useState({
        status: "false",
        card_id: ""
    });

    const handleCard = (e) => {
        setCard({ status: "true", card_id: e.target.id })
    }


    const dispatch = useDispatch();
    const refreshtokenvalue = localStorage.getItem("refresh")

    const navigate = useNavigate();

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
                    console.log(err)
                    localStorage.clear()
                    navigate("/loginredirect")
                })
        };

        generateAccessToken();
        setImage();
        setShop("");
        setName("");
        setPrice("");
        setSize("");
        // eslint-disable-next-line
    }, [status]);

    const [image, setImage] = useState()
    const [shop, setShop] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);



    const accesstokenvalue = localStorage.getItem("access")


    const addPizzaData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("size", size);
        formData.append("shop", shop);
        axios.post(`http://127.0.0.1:8000/product/`, formData,

            {
                headers: {
                    Authorization: `Bearer ${accesstokenvalue}`,
                    "content-type": "multipart/form-data"

                }
            }
        )
            .then(res => {
                setStatus("200")
                handleShow()
            })
            .catch(err => {
                console.log(err)
                setStatus(err.response.status)
                handleShow()
            })


    }

    return <div>
        {status === "200" && <><Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Pizza Item</Modal.Title>
            </Modal.Header>

            <Modal.Body>Pizza Data Submitted</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal></>}

        {status !== "200" && <><Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Pizza Item Error</Modal.Title>
            </Modal.Header>

            <Modal.Body>Pizza Data Not Submitted</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal></>}

        <div className="container-fluid">

            <div className='row mt-2 mb-3' style={{
                background:""
            }}>

                {
                    shop_data.length !== 0 ?
                        <>
                            <div className='container'>
                                <div className='row mx-0 mb-2 font-weight-bold'>Select Any Shop For Adding Pizza</div>
                            </div>
                            <div className='container'>
                                <div className='row'>
                                    {shop_data.map((items, index) =>
                                        <div className="card mx-2" style={{ width: "10rem" }} key={index} >
                                            <div className="card-body text-center">
                                                <div>
                                                    <p className='btn btn-primary px-1' id={items.id} onClick={e => { handleCard(e); setShop(items.id); }}>{items.name}</p>
                                                </div>
                                                <div>
                                                    <button className='btn-success' onClick={e => { setViewState("true"); setShop(items.id); }}>View Items</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </> : <h2>No Shop Is Currently Available.......</h2>
                }
            </div>
            {viewState === "true" ? <OwnerViewPizza statedata={setViewState} shopid={shop} /> :
                <div className="row">
                    <div className="container py-5 h-100">
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <div className="card shadow-2-strong card-registration" style={{ borderRadius: "25px" }}>
                                    <div className="card-body p-4 p-md-5">
                                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">ADD PIZZA TO YOUR SHOP</h3>
                                        <form onSubmit={addPizzaData}>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">

                                                    <div className="form-outline">
                                                        <input type="text" id="size" className="form-control form-control-lg" value={size} onChange={e => { setSize(e.target.value) }} />
                                                        <label className="form-label" htmlFor="size">Pizza Size</label>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                    <div className="form-outline">
                                                        <input type="text" id="name" className="form-control form-control-lg" value={name} onChange={e => setName(e.target.value)} />
                                                        <label className="form-label" htmlFor="name">Pizza Name</label>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* //row2 */}
                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                    <div className="form-outline">
                                                        <input type="number" id="price" className="form-control form-control-lg" value={price} onChange={e => { setPrice(e.target.value) }} />
                                                        <label className="form-label" htmlFor="price">Price</label>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                    <div className="form-outline">
                                                        <input type="file" accept="image/*" id="image" className="form-control form-control-lg" onChange={e => setImage(e.target.files[0])} />
                                                        <label className="form-label" htmlFor="image">Image</label>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="mt-4 pt-2 text-center">
                                                {card.status === "true" ? <input className="btn btn-primary btn-lg" type="submit" value="Submit" /> : <p>Please Select One Shop First</p>}
                                            </div>

                                        </form>


                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }

        </div>

    </div>
};


// #endregion

export default AddPizza;