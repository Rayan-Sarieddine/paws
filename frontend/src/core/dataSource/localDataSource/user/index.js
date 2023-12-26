import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  email: "",
  username: "",
  profilePicture: "",
  phone: "",
  address: "",
  usertype: "",
  cart: [],
  chatsessins: [],
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
        username,
        profilePicture,
        phone,
        address,
        usertype,
        cart,
        chatsessins,
      } = payload;

      return {
        email,
        token,
        username,
        profilePicture,
        phone,
        address,
        usertype,
        cart,
        chatsessins,
      };
    },
    cleanData: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { loggedIn, cleanData } = userSlice.actions;

export default userSlice.reducer;
