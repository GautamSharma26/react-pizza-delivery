// import CommonApi from "./CommonApi"
import CreateAxiosInstance from "./CommonApi"
const http = CreateAxiosInstance;
console.log(http,"http")

const remove = id => {
 

    return http().delete(`/product/product_view/${id}`);
  };

const retrieve_customer = id =>{
  return http().retrieve(`/user_detail/${id}`);
};

const get_address = () =>{
  return http().get(`/product/address/`);
}

const update_address = (id,data) =>{
  return http().patch(`/product/address_write/${id}`,data)
}

const add_address = data => {
  return http().post(`/product/address_create/`,data)
}

const view_cart = (id)=>{
  return http().get(`/product/cartpizza/${id}`)
}

const CrudApi={
    remove,
    retrieve_customer,
    get_address,
    update_address,
    add_address,
    view_cart
}
export default CrudApi;