import React, { Fragment } from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




const ShopView = () => {
    const navigate = useNavigate();

    const [shopData, setShopData] = useState([])

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/product/shop/`)
            .then(res => [console.log(res.data), setShopData(res.data)])
            .catch(err => console.log(err))
    }, [])

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

                        <tbody style={{ backgroundImage: "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))" }}>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{datashop.owner}</td>
                                <td>{datashop.name}</td>
                                <td>{datashop.location}</td>
                                <td><button onClick={e => { console.log("view"); navigate(`/user/pizza-items/${datashop.id}`) }}>View</button></td>
                            </tr>
                        </tbody>
                    </Fragment>
                )
            })}

        </table>
    </div>;
}

// #endregion

export default ShopView;