// import CommonApi from "./CommonApi"
import CreateAxiosInstance from "./CommonApi"
import NonauthApi from "./NonauthApi";
const http = CreateAxiosInstance;
const api_http = NonauthApi;

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

const view_pizza_items = id =>{
  console.log("pizzzzzzzzzzzzzz",id);
  return http().get(`/product/product_view/${id}`);
}

const validate_acces_token = data =>{
  return http().post(`/generate_access_token/`,data);
}

const customer_data = (data)=>{
  return http().post(`/user-detail/`,data);
}

const logout_user = (data)=>{
  return http().post(`/logout/`,data);
}

const cart_item_add = id=>{
  return http().post(`/product/cart/`,id);
}

const cart_item_del = id=>{
  return http().delete(`/product/cart-item-del/${id}/`);
}

const cart_item_update = (id,data)=>{
  return http().patch(`/product/cart-item-del/${id}/`,data);
}

const shop_data_retrieve = id =>{
  return http().get(`/product/shop/${id}/`);
}

const pizza_data = id =>{
  return api_http().get(`product/pizza-data/${id}/`);
}

const payment_init = data =>{
  return http().post(`/product/order/`,data);
} 
const CrudApi={
    remove,
    retrieve_customer,
    get_address,
    update_address,
    add_address,
    view_cart,
    view_pizza_items,
    validate_acces_token,
    customer_data,
    logout_user,
    cart_item_add,
    cart_item_del,
    cart_item_update,
    shop_data_retrieve,
    pizza_data,
    payment_init
}
export default CrudApi;