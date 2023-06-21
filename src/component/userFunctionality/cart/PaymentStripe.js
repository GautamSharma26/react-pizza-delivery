import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCart, pizza_payment } from '../../Authentication/Slice/TokenSlice';
import { Link } from 'react-router-dom';

const PaymentStripe = () => {
    const [cartData, setCartData] = useState();
    const dispatch = useDispatch();
    const user = useSelector(state => state.tokenData.user)
    useEffect(() => {
        function handleOnDispatch() {
            user.length !== 0 &&
                dispatch(getCart({ id: user['id'] }))
                    .then(res => {
                        console.log(res)
                        setCartData(res.payload[0])
                    })
                    .catch(err => { console.log("err", err) })
        };
        handleOnDispatch();

        // eslint-disable-next-line
    }, [user])

    function handleOnClick(e) {
        dispatch(pizza_payment({ address: "3" }))
            .then(res => {
                console.log(res.payload);
                const value = res.payload;
                window.location.href = value 
            })

    }

    return (
        <section class="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <div class="container h-100 py-5">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="card shopping-cart" style={{ borderRadius: "15px" }}>
                            <div class="card-body text-black">
                                <div class="row">
                                    <div class="col-lg-6 px-5 py-4">
                                        <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Your products</h3>
                                        {cartData ? cartData.data_pizza.map((cartpizza, index) => {
                                            return (

                                                <Fragment key={index}>
                                                    <div className="d-flex align-items-center mb-5">
                                                        <div class="flex-shrink-0">
                                                            <img src={cartpizza.pizza_img}
                                                                className="img-fluid" style={{ width: "150px" }} alt="Generic placeholder" />
                                                        </div>
                                                        <div class="flex-grow-1 mx-3 ">
                                                            <h5 class="text-primary">{cartpizza.pizza}</h5>
                                                            <h6 style={{ color: "#9e9e9e" }}>Size: {cartpizza.pizza_data['size']}</h6>
                                                            <p class="fw-bold mb-0 me-5 pe-3">Price: {cartpizza.pizza_data['price']}/Pc</p>
                                                            <p class="fw-bold mb-0 me-5 pe-3">Quantity: {cartpizza.quantity}</p>
                                                        </div>
                                                    </div>
                                                </Fragment>)
                                        }) : <>No Item in Cart</>
                                        }
                                        <hr class="mb-4" style={{ height: "2px", backgroundColor: "#1266f1", opacity: "1" }} />

                                        {/* <div class="d-flex justify-content-between px-x">
                                            <p class="fw-bold">Discount:</p>
                                            <p class="fw-bold">95$</p>
                                        </div> */}
                                        {cartData &&
                                            <div class="d-flex justify-content-between p-2 mb-2" style={{ backgroundColor: "#e1f5fe" }}>
                                                <h5 class="fw-bold mb-0">Total:</h5>
                                                <h5 class="fw-bold mb-0">{cartData.total_amount}</h5>
                                            </div>}

                                    </div>
                                    <div class="col-lg-6 px-5 py-4">

                                        <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Payment</h3>

                                        <form class="mb-5">

                                            {/* <div class="form-outline mb-5">
                                                <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                                                    value="1234 5678 9012 3457" minlength="19" maxlength="19" />
                                                <label class="form-label" for="typeText">Card Number</label>
                                            </div>

                                            <div class="form-outline mb-5">
                                                <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                                                    value="John Smith" />
                                                <label class="form-label" for="typeName">Name on card</label>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6 mb-5">
                                                    <div class="form-outline">
                                                        <input type="text" id="typeExp" class="form-control form-control-lg" value="01/22"
                                                            size="7" minlength="7" maxlength="7" />
                                                        <label class="form-label" for="typeExp">Expiration</label>
                                                    </div> */}
                                            {/* </div> */}
                                            {/* <div class="col-md-6 mb-5">
                                                    <div class="form-outline">
                                                        <input type="password" id="typeText" class="form-control form-control-lg"
                                                            value="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                                        <label class="form-label" for="typeText">Cvv</label>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* <p class="mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit <a
                                                href="#!">obcaecati sapiente</a>.</p> */}

                                            <button type="button" className="btn btn-primary btn-block btn-lg" onClick={e => handleOnClick(e)}>Procced For Payment</button>

                                            <h5 class="fw-bold mb-5" style={{ position: "absolute", bottom: "0" }}>
                                                <Link to="/user/shop-list-user">Back to shopping</Link>
                                            </h5>

                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default PaymentStripe