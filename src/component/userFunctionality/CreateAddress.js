import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAddress } from '../Authentication/Slice/TokenSlice';
import ShowAddress from './ShowAddress';
import { useNavigate } from 'react-router-dom';

const CreateAddress = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [storeaddress, setStoreAddress] = useState({
        area: "", landmark: "", city: "", pincode: ""
    })


    function handleOnChange(e) {
        const { id, value } = e.target;
        setStoreAddress({ ...storeaddress, [id]: value })
    }

    function addAddress(e) {
        e.preventDefault();
        dispatch(createAddress({ data: storeaddress }))
            .then(res => { navigate("/user/show-address") })
            .catch(err => { console.log(err, "err"); })
    }

    return <div className="container-fluid">
        <div className="row">
            <div class="container py-5 h-100">
                <div class="row justify-content-center align-items-center h-100">
                    <div class="col-12">
                        <div class="card shadow-2-strong card-registration" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-4 p-md-5">
                                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Add Address</h3>
                                <form onSubmit={addAddress}>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" for="area">Area</label>
                                                <input type="text" id="area" className="form-control form-control-lg" value={storeaddress.area} onChange={(e) => handleOnChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <label className="form-label" for="landmark">landmark</label>
                                                <input type="text" id="landmark" className="form-control form-control-lg" value={storeaddress.landmark} onChange={(e) => handleOnChange(e)} />
                                            </div>

                                        </div>
                                    </div>
                                    {/* //row2 */}
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <label className="form-label" for="city">City</label>
                                                <input type="text" id="city" className="form-control form-control-lg" value={storeaddress.city} onChange={(e) => handleOnChange(e)} />
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <label className="form-label" for="pincode">Pin Code</label>
                                                <input type="text" id="pincode" className="form-control form-control-lg" value={storeaddress.pincode} onChange={(e) => handleOnChange(e)} />
                                            </div>

                                        </div>
                                    </div>

                                    <div class="mt-4 pt-2 text-center">
                                        <input class="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>

                                </form>
                                <div>
                                    <button className='btn-primary' type="submit" value="Back" onClick={e=> props.add_address_st("false")}>Back</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        ;
}


export default CreateAddress;