import React, {Fragment} from 'react';
import axios from "axios";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import {getTooken} from "../firebase";


const ShopView = () => {

    // const [isTokenFound, setTokenFound] = useState(false);
    // getTooken(setTokenFound);

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
// console.log(isTokenFound,"token")
    return <div>
        <div className="row" style={{display: 'flex', justifyContent: 'center'}}>
            {shopData.map((datashop, index) => {
                return (
                    <Fragment key={index}>

                        <div className="col-md-3">
                            <div className="card ml-1 mx-1 mb-2 mt-2 text-md-center"
                                 style={{width: "25rem", background: "aliceblue"}}>
                                <div className="card-body">
                                    <h5 className="card-title">Shop Name: {datashop.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Owner: {datashop.owner}</h6>
                                    <p className="card-text">Location: {datashop.location}</p>
                                    {token ? <>
                                        <button onClick={e => {
                                            console.log("view");
                                            navigate(`/user/shop-list-user/pizza-items/${datashop.id}`)
                                        }}>View Pizza's
                                        </button>
                                    </> : <>
                                        <button onClick={e => {
                                            console.log("view");
                                            navigate(`/shop-list/${datashop.id}/pizza/`)
                                        }}>View Pizza's
                                        </button>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </Fragment>

                )
            })}
        </div>

        {/*{isTokenFound}*/}
        {/*{isTokenFound && <>Heeee</>}*/}
        {/*{!isTokenFound &&<>*/}
        {/*    Need notification permission ❗️*/}
        {/*    </>*/}
        {/*}*/}
    </div>;
}

// #endregion

export default ShopView;