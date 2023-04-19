import axios from "axios";
import { userDetail, shopDetail } from "./Slice/TokenSlice";
// import { fetchCustomerDetail } from "./Slice/TokenSlice";



export async function FetchUserDetail(dispatch) {
    const accesstokenvalue = localStorage.getItem("access")
    await axios.post(`http://127.0.0.1:8000/user-detail/`,
        {
            "access": accesstokenvalue
        },)
        .then(res => {
            console.log(res.data,"user")
            dispatch(userDetail(res.data))
            if ((res.data.user[0].is_shop_owner)===true){
                const y = shopUserDetail(res.data.user[0].id,dispatch,accesstokenvalue);
                return y
            }
            // else{
            //     dispatch(fetchCustomerDetail({id:res.data.user[0].id}))
            // }
            
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


// function UserDetail(){
//     axios.get()
// }