import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import productSlice from "./productSlice.js";
import cartSlice from "./cartSlice.js";
import orderSlice from "./orderSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;
