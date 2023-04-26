import React, { Fragment, useEffect, useState } from 'react'
import { getCart, delete_cart_item, item_update_cart } from '../../Authentication/Slice/TokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


const CartItem = () => {
  const [cartData, setCartData] = useState();
  const [statusdelete, setDeleteStatus] = useState("false");
  const [statusupdate, setUpdateAdd] = useState("false")
  const [statusRemove, setUpdateRemove] = useState("false")
  const dispatch = useDispatch();
  const user = useSelector(state => state.tokenData.user)
  useEffect(() => {
    function handleOnDispatch() {
      user.length !== 0 &&
        dispatch(getCart({ id: user['id'] }))
          .then(res => {
            setCartData(res.payload[0])
          })
          .catch(err => { console.log("err", err) })
    };
    handleOnDispatch();
    setUpdateAdd("false");
    setUpdateRemove("false");

    // eslint-disable-next-line
  }, [user, statusdelete, statusupdate, statusRemove])

  function handleOnDelete(e, id) {
    e.preventDefault();
    dispatch(delete_cart_item({ id: id }))
      .then(res => {
        if (res.type === "TokenSlice/DelItemCart/fulfilled") {
          setDeleteStatus("true");
          // window.location.reload(true);
        }
      })

  }

  function handleOnAdd(e, id, pizza) {
    e.preventDefault();
    dispatch(item_update_cart({ id: id, data: { "quantity": 1, "pizza": pizza } }))
      .then(res => {
        if (res.type === "TokenSlice/ItemUpdateQunatity/fulfilled") {
          setUpdateAdd("true");
          // window.location.reload(true);
        }
      })
  }

  function handleOnRemove(e, id, pizza) {
    e.preventDefault();
    dispatch(item_update_cart({ id: id, data: { "quantity": -1, "pizza": pizza } }))
      .then(res => {
        if (res.type === "TokenSlice/ItemUpdateQunatity/fulfilled") {
          setUpdateRemove("true");
          // window.location.reload(true);
        }
      })
  }


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
            {cartData ? cartData.data_pizza.map((Cart, index) => {
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

                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <p><span className="text-muted">Quantity: </span>{Cart.quantity}</p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p><span className="text-muted">Price Per Pizza: </span>{Cart.pizza_data['price']}</p>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1">
                          <IconButton aria-label="delete" onClick={e => { console.log("dshfj"); handleOnRemove(e, Cart.id, Cart.pizza_data.id); }}>
                            <RemoveIcon />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={e => { console.log("dshfj"); handleOnAdd(e, Cart.id, Cart.pizza_data.id); }}>
                            <AddIcon />
                          </IconButton>
                        </div>
                        <div className="col-md-2 col-lg-1 col-xl-1">
                          <IconButton aria-label="delete" onClick={e => { console.log("dshfj"); handleOnDelete(e, Cart.id); }}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )
            }) : <><div className="card">
              <div className="card-body">
                <h3>No Items Available In Your Cart</h3>
              </div>
            </div></>
            }
            {cartData && <><div className="card">
              <div className="card-body">
                <h2>Total Price :  {cartData.total_amount}</h2>
              </div>
            </div>
              <div className="card">
                <div className="card-body">
                  <button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Checkout</button>
                </div>
              </div>
            </>
            }

          </div>
        </div>
      </div>
    </section>

  )
}

export default CartItem