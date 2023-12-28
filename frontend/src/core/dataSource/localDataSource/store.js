import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userSliceName } from "./user";
import activeNavReducer, { activeNavSliceName } from "./active_nav";
//redux persistent

export const store = configureStore({
  reducer: {
    [userSliceName]: userReducer,
    [activeNavSliceName]: activeNavReducer,
  },
  devTools: true,
});
