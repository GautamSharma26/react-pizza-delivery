import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddress, updateAddressData } from '../Authentication/Slice/TokenSlice';
import ShowAddress from './ShowAddress';

const UpdateAddress = (props) => {
    const [statusupdate, setUpdateStatus] = useState("false")
    const dispatch = useDispatch();
    const [dataaddress, setDataAddress] = useState({
        id: props.address_data.id,
        city: props.address_data.city,
        landmark: props.address_data.landmark,
        area: props.address_data.area,
        pincode: props.address_data.pincode
    })
    function handleOnChange(e) {
        const { id, value } = e.target
        setDataAddress({ ...dataaddress, [id]: value })

    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(updateAddressData({ id: dataaddress.id, data: dataaddress }))
            .then(res => { console.log(res, "res"); dispatch(fetchAddress()); setUpdateStatus("true") })
            .catch(err => { console.log("err", err) })
    }

    return <div className="container-fluid">
        {statusupdate === "true" ? <ShowAddress /> :
            <div className="row">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card shadow-2-strong card-registration" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Address Update</h3>
                                    <form onSubmit={handleOnSubmit}>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="area">Area</label>
                                                    <input type="text" id="area" className="form-control form-control-lg" value={dataaddress.area} onChange={(e) => handleOnChange(e)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <label className="form-label" for="landmark">landmark</label>
                                                    <input type="text" id="landmark" className="form-control form-control-lg" value={dataaddress.landmark} onChange={(e) => handleOnChange(e)} />
                                                </div>

                                            </div>
                                        </div>
                                        {/* //row2 */}
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="city">City</label>
                                                    <input type="text" id="city" className="form-control form-control-lg" value={dataaddress.city} onChange={(e) => handleOnChange(e)} />
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="pincode">Pin Code</label>
                                                    <input type="tel" id="pincode" className="form-control form-control-lg" value={dataaddress.pincode} onChange={(e) => handleOnChange(e)} />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="mt-4 pt-2 text-center mb-2">
                                            <input className="btn btn-primary btn-lg" type="submit" value="Update" />
                                        </div>

                                    </form>
                                    <div className="text-center mt-2">
                                        <p type="button" className='btn btn-primary' onClick={e => props.address_status("false")}>Back</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}

// #endregion

export default UpdateAddress;