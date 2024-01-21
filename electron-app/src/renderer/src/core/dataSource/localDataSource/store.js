import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userSliceName } from "./user";
import petReducer, { petSliceName } from "./pet";
import productReducer, { productSliceName } from "./product";
import postReducer, { postSliceName } from "./post";
import orderReducer, { orderSliceName } from "./order";

export const store = configureStore({
  reducer: {
    [userSliceName]: userReducer,
    [petSliceName]: petReducer,
    [productSliceName]: productReducer,
    [postSliceName]: postReducer,
    [orderSliceName]: orderReducer
  },
  devTools: true
});
