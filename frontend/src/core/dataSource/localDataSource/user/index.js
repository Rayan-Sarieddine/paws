import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  address: "",
  phone: "",
  userType: "",
  chatSessions: [],
  cart: {},
  image: "",
  token: "",
};

export const userSliceName = "User";

export const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    loggedIn: (state, { payload }) => {
      const {
        email,
        name,
        address,
        phone,
        userType,
        chatSessions,
        cart,
        image,
        token,
      } = payload;

      return {
        email,
        name,
        address,
        phone,
        userType,
        chatSessions,
        cart,
        image,
        token,
      };
    },
    cleanData: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { loggedIn, cleanData } = userSlice.actions;

export default userSlice.reducer;
