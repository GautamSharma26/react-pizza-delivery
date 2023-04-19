import React, { Fragment, useEffect, useState } from 'react'
import { getCart } from '../../Authentication/Slice/TokenSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartItem = () => {
  const [cartData, setCartData] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.tokenData.user)
  useEffect(() => {
    function handleOnDispatch() {

      user.length !== 0 &&
        dispatch(getCart({ id: user['id'] }))
          .then(res => {
            console.log(res.payload[0], "res")
            setCartData(res.payload[0])
          })
          .catch(err => { console.log("err", err) })
    };
    handleOnDispatch();

    // eslint-disable-next-line
  }, [user])


  return (
    // <>{cartData.pizza[0].price}</>
    <section style={{
      position: "absolute",
      backgroundColor: "#eee",
      minHeight: "100%",
      width: "100%"
    }}>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Pizza Cart</h3>
              <div>
                <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" className="text-body">price <i
                  className="fas fa-angle-down mt-1"></i></a></p>
              </div>
            </div>
            {cartData && cartData.data_pizza.map((Cart, index) => {
              console.log(Cart);
              return (

                <Fragment key={index}>
                  <div className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={Cart.pizza_img}
                            className="img-fluid rounded-3" alt="Cotton T-shirt" />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p><span className="text-muted"> </span>{Cart.pizza}</p>
                          <p><span className="text-muted">Size: </span>{Cart.pizza_data['size']}</p>
                        </div>

                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p><span className="text-muted">Quantity: </span>{Cart.quantity}</p>
                        </div>


                        {/* <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          <button className="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i className="fas fa-minus"></i>
                          </button>

                          <input id="form1" min="0" name="quantity" type="number"
                            className="form-control form-control-sm" />

                          <button className="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div> */}
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p><span className="text-muted">Price Per Pizza: </span>{Cart.pizza_data['price']}</p>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )
            })}
            {cartData && <div className="card">
              <div className="card-body">
                <h2>Total Price :  {cartData.total_amount}</h2>
              </div>
            </div>}
            <div className="card">
              <div className="card-body">
                <button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Checkout</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CartItem