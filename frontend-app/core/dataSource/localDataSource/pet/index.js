import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const petSliceName = "Pet";

export const petSlice = createSlice({
  name: petSliceName,
  initialState,
  reducers: {
    loadPet: (state, { payload }) => {
      return {
        ...state,
        pets: payload,
      };
    },
    cleanData: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { loadPet, cleanData } = petSlice.actions;

export default petSlice.reducer;
