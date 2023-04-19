// import axios from 'axios';
// import { ShopDataRetrieve } from '../Authentication/Slice/TokenSlice';


// const ViewShop = (dispatch) => {
//     const id = JSON.parse(localStorage.getItem("shop")).id
//     console.log(id)
//     axios.get(`http://127.0.0.1:8000/product/shop/${id}/`)
//     .then(res=>{
//         console.log(res,"owner")
//         dispatch(ShopDataRetrieve(res))
//     })
//     .catch(err=>{console.log(err,"err");})
// }

// // #endregion

// export default ViewShop;