import React from 'react';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ShopApi from "./CommonApi";

// const OwnerShop = () => {
//     return <div>

//     </div>;
// }

// // #endregion

// export default OwnerShop;
export const OwnerShop = createAsyncThunk(
    "tutorials/delete",
    async ({ id }) => {
      await ShopApi.remove(id);
      return { id };
    }
  );
  