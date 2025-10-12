import { configureStore } from "@reduxjs/toolkit";  
import authReducer from "./Slice/AuthSlice.js";
import cartReducer from "./Slice/CartSlice.js"

const store = configureStore({
   reducer:{
    authorization:authReducer,
    cart:cartReducer
   }
})

export default store ;