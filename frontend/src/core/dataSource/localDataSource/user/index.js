import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  email: "",
  name: "",
  phone: "",
  address: "",
  usertype: "",
  cart: [],
  chatSessions: [],
  image: "",
};

export const userSliceName = "User";

export const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    loggedIn: (state, { payload }) => {
      const {
        email,
        token,
        name,
        phone,
        address,
        usertype,
        cart,
        chatSessions,
        image,
      } = payload;

      return {
        email,
        token,
        name,
        phone,
        address,
        usertype,
        cart,
        chatSessions,
        image,
      };
    },
    cleanData: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { loggedIn, cleanData } = userSlice.actions;

export default userSlice.reducer;
