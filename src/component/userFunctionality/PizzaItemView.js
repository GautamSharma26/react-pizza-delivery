import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {pizza_items, items_add_cart} from '../Authentication/Slice/TokenSlice'
import {Fragment} from 'react'
import swal from 'sweetalert';
import {Navbar} from 'react-bootstrap'

const PizzaItemView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams();
    const pizza_data = useSelector(state => state.tokenData.pizza_data.data)


    useEffect(() => {
        dispatch(pizza_items({id: id}));
        // eslint-disable-next-line
    }, [])

    function JSalert() {

        swal("Yup!", "Pizza Added to Cart!", "success");

    }

    function JSalertWarn() {

        swal("Uuf!", "You have already added pizza from another SHOP!", "warning");

    }

    function handleOnClick(e, id) {
        e.preventDefault();
        dispatch(items_add_cart({pizza: id, quantity: 1}))
            .then(res => {
                console.log(res.meta.requestId);
                if (res.type === "TokenSlice/pizzaCartItems/fulfilled") {
                    navigate("/user/cart")
                    // setItem(res.meta.requestId);
                    // dispatch(customer_data_get({ "access": res.payload.access }))
                    // JSalert();
                }
                if (res.type === "TokenSlice/pizzaCartItems/rejected" && res.error.message === "Request failed with status code 406") {
                    JSalertWarn();
                }

            })
    }

    return (
        <div className='container-fluid'>
            <div className="row " style={{display: 'flex', justifyContent: 'center'}}>
                {pizza_data ? <>
                    {pizza_data.map((datashop, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="col-md-3">
                                    <div className="card ml-1 mx-1 mb-2 mt-2 text-md-center"
                                         style={{width: "25rem", background: "aliceblue"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Pizza Name: {datashop.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Price: {datashop.price}</h6>
                                            <p className="card-text">Size: {datashop.size}</p>
                                            <button onClick={e => {
                                                console.log("clicked");
                                                handleOnClick(e, datashop.id);
                                            }}>Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })}
                </> : <>No Pizza Available For This Shop Right Now.......</>}
            </div>
            <button className='btn-primary' onClick={e => navigate("/user/shop-list-user")}>Back</button>

        </div>


    )
}

export default PizzaItemView