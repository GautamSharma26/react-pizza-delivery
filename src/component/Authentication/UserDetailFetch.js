import axios from "axios";
import { userDetail, shopDetail } from "./Slice/TokenSlice";



export async function FetchUserDetail(dispatch) {
    const accesstokenvalue = localStorage.getItem("access")
    await axios.post(`http://127.0.0.1:8000/user-detail/`,
        {
            "access": accesstokenvalue
        },)
        .then(res => {
            dispatch(userDetail(res.data))
            if ((res.data.user[0].is_shop_owner)===true){
                const y = shopUserDetail(res.data.user[0].id,dispatch,accesstokenvalue);
                return y
            }
       
            
        })
        .catch(err => { console.log(err, "detail") })
};

function shopUserDetail(pk,dispatch,accesstokenvalue){
    axios.get(`http://127.0.0.1:8000/product/shop/${pk}/`,{
        headers:{
            Authorization: `Bearer ${accesstokenvalue}`
        }
    })
    .then(res=>{
        dispatch(shopDetail(res.data))
    })
    .catch(err=>{
        console.log(err,"err")
    })
}