import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { pizza_items } from '../Authentication/Slice/TokenSlice'
import { Fragment } from 'react'

const PizzaItemView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const pizza_data = useSelector(state => state.tokenData.pizza_data.data)
    useEffect(() => {
        dispatch(pizza_items({ id: id }))
            .then(res => { console.log(res.payload, "s"); })
        // eslint-disable-next-line
    }, [])

console.log(pizza_data);
    // console.log(pizza_data.length, "l");
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    {pizza_data ?

                        <table className="table table-hover">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Pizza Name</th>
                                    <th scope="col">Pizza Price</th>
                                    <th scope="col">Size</th>
                                </tr>
                            </thead>
                            {pizza_data.map((datashop, index) => {
                                return (
                                    <Fragment key={index}>

                                        <tbody>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{datashop.name}</td>
                                                <td>{datashop.price}</td>
                                                <td>{datashop.size}</td>
                                            </tr>
                                        </tbody>
                                    </Fragment>
                                )
                            })}

                        </table> : <>No Pizza Available For This Shop Right Now.......</>


                    }
                    <button className='btn-primary' onClick={e => navigate("/user/shop-list")}>Back</button>
                </div>

            </div>

        </div>
    )
}

export default PizzaItemView