import {configureStore} from "@reduxjs/toolkit";
import TokenSlice from "../Authentication/Slice/TokenSlice";

const storeValue = configureStore({
    reducer:{
        tokenData:TokenSlice.reducer
    }
});
export default storeValue;