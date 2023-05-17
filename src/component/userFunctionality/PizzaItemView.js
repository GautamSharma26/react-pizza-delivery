import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { pizza_items, items_add_cart } from '../Authentication/Slice/TokenSlice'
import { Fragment } from 'react'
import swal from 'sweetalert';
import { Navbar } from 'react-bootstrap'

const PizzaItemView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const pizza_data = useSelector(state => state.tokenData.pizza_data.data)
    
    
    useEffect(() => {
        dispatch(pizza_items({ id: id }));
        // eslint-disable-next-line
    }, [])
    function JSalert() {

        swal("Yup!", "Pizza Added to Cart!", "success");

    }

    function JSalertWarn() {

        swal("Uuf!","You have already added pizza from another SHOP!","warning");

    }

    function handleOnClick(e, id) {
        e.preventDefault();
        dispatch(items_add_cart({ pizza: id, quantity: 1 }))
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

    console.log(pizza_data);
    // console.log(pizza_data.length, "l");
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    {pizza_data ?

                        <table className="table table-hover">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Pizza Name</th>
                                    <th scope="col">Pizza Price</th>
                                    <th scope="col">Size</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {pizza_data.map((datashop, index) => {
                                return (
                                    <Fragment key={index}>

                                        <tbody>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{datashop.name}</td>
                                                <td>{datashop.price}</td>
                                                <td>{datashop.size}</td>
                                                <td><button onClick={e => { console.log("clicked"); handleOnClick(e, datashop.id); }}>Add to Cart</button></td>
                                            </tr>
                                        </tbody>
                                    </Fragment>
                                )
                            })}

                        </table> : <>No Pizza Available For This Shop Right Now.......</>


                    }
                    <button className='btn-primary' onClick={e => navigate("/user/shop-list-user")}>Back</button>
                </div>

            </div>

        </div>
    )
}

export default PizzaItemView