import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CrudApi from "../../commonFolder/CrudApi";

const initialState = {
    refreshtoken: "",
    accesstoken: "jwerfufueygfuefesfefi",
    loginstatus: "false",
    shop: [],
    shop_pizza: [],
    data: [],
    user:[],
    address:[],
    cart_data:[]
}

export const deletePizzaData = createAsyncThunk(
    "TokenSlice/delete",
    async ({ id }) => {
        const delete_data = await CrudApi.remove(id);
        return (delete_data.data);
    }
);

export const fetchAddress = createAsyncThunk(
    "TokenSlice/retrieve",
    async () =>{
        const get_data = await CrudApi.get_address();
        return (get_data.data)
    }
);

export const updateAddressData = createAsyncThunk(
    "TokenSlice/update",
    async({id,data}) => {
        const update_address_data = await CrudApi.update_address(id,data);
        return update_address_data.data
    }
);

export const createAddress = createAsyncThunk(
    "TokenSlice/post",
    async ({data}) => {
        const post_data_address = await CrudApi.add_address(data);
        return post_data_address.data
    }
)

export const getCart = createAsyncThunk(
    "TokenSlice/cartGet",
    async({id})=>{
        const get_cart_data = await CrudApi.view_cart(id);
        return get_cart_data.data
    }    
)

const TokenSlice = createSlice({
    name: "TokenSlice",
    initialState,
    reducers: {
        storeToken: (state, action) => {
            localStorage.setItem("refresh", action.payload.refresh);
            localStorage.setItem("access", action.payload.access);

            state.refreshtoken = localStorage.getItem("refresh");
            state.accesstoken = localStorage.getItem("access");
        },

        userDetail: (state, action) => {
            localStorage.setItem("user_detail",JSON.stringify(action.payload.user[0]))
            state.user=JSON.parse(localStorage.getItem("user_detail"))
        },
        shopDetail: (state, action) => {

            localStorage.setItem("shop", JSON.stringify(action.payload.message));
            state.shop = JSON.parse(localStorage.getItem("shop"))

        },
        loginStatus: (state, action) => {
            state.loginstatus = action.payload.statuslogin

        },
        shopDataFn: (state, action) => {
            localStorage.setItem("pizza_data", JSON.stringify(action.payload.data))
            state.shop_pizza = JSON.parse(localStorage.getItem("pizza_data"))

        },
        deletePizza: (state, action) => {
            console.log("state", state, "action", action)
        },
    },
    extraReducers: builder => {
        builder
            .addCase(deletePizzaData.pending, state => {
                console.log("start")
                state.loading = true
            })
            .addCase(deletePizzaData.fulfilled, (state, action) => {
                console.log("fulfilled")
                state.loading = false
            })
            .addCase(deletePizzaData.rejected, state => {
                console.log("rejected")
                state.loading = false
            })
            .addCase(fetchAddress.pending, state =>{
                console.log("start")
                state.loading = true
            })
            .addCase(fetchAddress.fulfilled, (state,action)=>{
                console.log("fulfilled",action.payload)
                state.loading = false
                state.address=JSON.stringify(action.payload)
            })
            .addCase(fetchAddress.rejected, state =>{
                console.log("rejected")
                state.loading = false
            })
            .addCase(updateAddressData.fulfilled, (state,action)=>{
                state.loading= false
                console.log("updated");
            })
            .addCase(createAddress.fulfilled, state =>{
                state.loading = false
                console.log("address created");
            })
            .addCase(getCart.fulfilled, (state,action) =>{
                state.loading = false
                state.cart_data=action.payload
                console.log("cart get");
            })
    }
});

export const { storeToken, userDetail, shopDetail, loginStatus, shopDataFn, ShopDataRetrieve, deletePizza } = TokenSlice.actions;
export default TokenSlice;