import React, { Fragment } from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { pizza_items } from '../Authentication/Slice/TokenSlice';
import { useNavigate } from 'react-router-dom';
// import { loadData } from '../LoadData';
// import Example from './Modal';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ShopDelete from './ShopDelete';
// import { Auth } from 'aws-amplify';



/**
 * 
 */
const ShopView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shopData, setShopData] = useState([])

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/product/shop/`)
            .then(res => [console.log(res.data), setShopData(res.data)])
            .catch(err => console.log(err))
    }, [])


    //function for deleting shop

    // const ShopDelete = (e, shopdata) => {

    //     e.preventDefault();
    //     axios.delete(`http://127.0.0.1:8000/product/shop/${shopdata.id}/`,{
    //         headers: {
    //             Authorization: `Bearer ${accesstoken}`
    //         }
    //     },)
    //         .then(res => [console.log(res, 'kjk'), handleShow()])
    //         .catch(err => [console.log(err, "dd"), handleShow()])

    // }

    return <div>
        <table className="table table-bordered">
            <thead className='table-dark'>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Shop Owner</th>
                    <th scope="col">Shop Name</th>
                    <th scope="col">Location</th>
                    <th></th>
                </tr>
            </thead>
            {shopData.map((datashop, index) => {
                return (
                    <Fragment key={index}>

                        <tbody style={{backgroundImage: "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))"}}>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{datashop.owner}</td>
                                <td>{datashop.name}</td>
                                <td>{datashop.location}</td>
                                <td><button onClick={e=>{console.log("view");navigate(`/user/pizza-items/${datashop.id}`) }}>View</button></td>
                                {/* <td type='button' className='btn btn-danger mt-2 mb-1 ' onClick={(e) => ShopDelete(e, datashop)}>Delete</td> */}
                            </tr>
                        </tbody>
                    </Fragment>
                )
            })}

        </table>
        {/* //modal  */}
        {/* {show && <><Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal></>} */}
    </div>;
}

// #endregion

export default ShopView;