import React, { Fragment } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { shopDataFn} from '../Authentication/Slice/TokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deletePizzaData } from '../Authentication/Slice/TokenSlice';

const OwnerViewPizza = (props) => {
    const api = process.env.REACT_APP_API_URL
    // const[shop_id,setShopId]=useState(props.shopid)
    // console.log(props,shop_id,'dhhdhg')
    const pizza_shop = useSelector(state => state.tokenData.shop_pizza)
    const dispatch = useDispatch();
    const accesstokenvalue = localStorage.getItem("access")

    const deleteDataPizza = (e, id) => {
        e.preventDefault();
        dispatch(deletePizzaData({ id: id }))
            .then(res => {
                console.log(res.payload['message'], "resdhfgffd")
            })
            .catch(err => {
                console.log(err, "errr");
            })
    }

    useEffect(() => {
        axios.get(`${api}product/product_view/${props.shopid}`, {
            headers: {
                Authorization: `Bearer ${accesstokenvalue}`
            }
        }
        )
            .then(res => {
                console.log(res.data, 'dataa')
                dispatch(shopDataFn(res.data))
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line
    }, [props.shopid]
    )


    // const [viewState, setViewState] = useState("false");
    return <div className='container-fluid'>
        <div className='row'>
            <div className='col'>

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
                    {pizza_shop.map((datashop, index) => {
                        return (
                            <Fragment key={index}>

                                <tbody>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{datashop.name}</td>
                                        <td>{datashop.price}</td>
                                        <td>{datashop.size}</td>
                                        <td type='button' className='btn btn-danger mt-2 mb-1' onClick={e => deleteDataPizza(e, datashop.id)}>Delete</td>
                                    </tr>
                                </tbody>
                            </Fragment>
                        )
                    })}

                </table>


                <p>{props.shopid}</p>
                <button className='btn-primary' onClick={e => props.statedata("false")}>Back</button>
            </div>

        </div>

    </div>;
}

// #endregion

export default OwnerViewPizza;