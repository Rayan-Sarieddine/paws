import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: "home",
};

export const activeNavSliceName = "active_nav";

export const activeNavSlice = createSlice({
  name: activeNavSliceName,
  initialState,
  reducers: {
    changeLocation: (state, { payload }) => {
      const { page } = payload;

      return {
        page,
      };
    },
    resetNav: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { changeLocation, resetNav } = activeNavSlice.actions;

export default activeNavSlice.reducer;
