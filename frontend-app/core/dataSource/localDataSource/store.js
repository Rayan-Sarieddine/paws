import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userSliceName } from "./user";
import petReducer, { petSliceName } from "./pet";
import trackerReducer, { trackerSliceName } from "./tracker";

export const store = configureStore({
  reducer: {
    [userSliceName]: userReducer,
    [petSliceName]: petReducer,
    [trackerSliceName]: trackerReducer,
  },
  devTools: true,
});
