import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  user_id: "",
  name: "",
  token: "",
};

export const userSliceName = "User";

export const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    loggedIn: (state, { payload }) => {
      const { email, user_id, name, token } = payload;

      return {
        email,
        user_id,
        name,
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
