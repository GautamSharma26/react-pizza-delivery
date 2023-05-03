import React, { useState } from 'react';
import { Fragment, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../Authentication/Slice/TokenSlice';
import UpdateAddress from './UpdateAddress';
import { useNavigate } from 'react-router-dom';


const ShowAddress = (props) => {
    const navigate = useNavigate();
    const [dataaddress, setAddressData] = useState({
        id: "", area: "", landmark: "", city: "", pincode: 0, user: ""
    })
    const [updatestatus, setUpdateStatus] = useState("false")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAddress())
        // eslint-disable-next-line
    }, [])
    const addressData = useSelector(state => state.tokenData.address)

    return <div>
        {updatestatus === "true" ? <UpdateAddress address_data={dataaddress} address_status={setUpdateStatus} /> : <>
            {addressData.length === 0 ? <>
                <h3>Loading....</h3>
            </> :
                <table className="table table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Area</th>
                            <th scope="col">Landmark</th>
                            <th scope="col">City</th>
                            <th scope='col'>Pin Code</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    {JSON.parse(addressData).map((addressdata, index) => {
                        return (
                            <Fragment key={index}>

                                <tbody>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{addressdata.area}</td>
                                        <td>{addressdata.landmark}</td>
                                        <td>{addressdata.city}</td>
                                        <td>{addressdata.pincode}</td>
                                        <td type='button' className='btn btn-danger mt-2 mb-1 mx-3' onClick={(e) => console.log("sdd")}>Delete</td>
                                        <td type='button' className='btn btn-success mt-2 mb-1' onClick={(e) => {
                                            console.log("sdd"); setAddressData({
                                                id: addressdata.id,
                                                landmark: addressdata.landmark,
                                                city: addressdata.city,
                                                pincode: addressdata.pincode,
                                                user: addressdata.user,
                                                area: addressdata.area
                                            }); setUpdateStatus("true")
                                        }}>Update</td>
                                    </tr>
                                </tbody>
                            </Fragment>
                        )
                    })}
                    <div>
                        <button className='btn-primary' onClick={e => {navigate("/user") }}>Back</button>
                    </div>
                </table>
            }</>}


    </div>;
}

// #endregion

export default ShowAddress;