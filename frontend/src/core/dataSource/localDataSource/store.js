import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userSliceName } from "./user";
//redux persistent

export const store = configureStore({
  reducer: {
    [userSliceName]: userReducer,
  },
  devTools: true,
});
