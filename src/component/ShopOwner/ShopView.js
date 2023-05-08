import React, { Fragment } from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




const ShopView = () => {
    const api = process.env.REACT_APP_API_URL
    const navigate = useNavigate();

    const [shopData, setShopData] = useState([])
    const token = localStorage.getItem("access")

    useEffect(() => {

        axios.get(`${api}product/shop/`)
            .then(res => [console.log(res.data), setShopData(res.data)])
            .catch(err => console.log(err))
        // eslint-disable-next-line
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
                                {token ?
                                    <td><button onClick={e => { console.log("view"); navigate(`/user/shop-list-user/pizza-items/${datashop.id}`) }}>View</button></td> :
                                    <td><button onClick={e => { console.log("view"); navigate(`/shop-list/${datashop.id}/pizza/`) }}>View</button></td>
                                }
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