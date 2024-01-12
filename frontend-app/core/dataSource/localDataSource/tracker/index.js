import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const trackerSliceName = "Tracker";

export const trackerSlice = createSlice({
  name: trackerSliceName,
  initialState,
  reducers: {
    loadTracker: (state, { payload }) => {
      return {
        ...state,
        tracker: payload,
      };
    },

    cleanData: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { loadTracker, cleanData } = trackerSlice.actions;

export default trackerSlice.reducer;
