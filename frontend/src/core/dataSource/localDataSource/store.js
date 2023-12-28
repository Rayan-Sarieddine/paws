import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userSliceName } from "./user";
import activeNavReducer, { activeNavSliceName } from "./active_nav";
import petReducer, { petSliceName } from "./pet";
//redux persistent

export const store = configureStore({
  reducer: {
    [userSliceName]: userReducer,
    [activeNavSliceName]: activeNavReducer,
    [petSliceName]: petReducer,
  },
  devTools: true,
});
