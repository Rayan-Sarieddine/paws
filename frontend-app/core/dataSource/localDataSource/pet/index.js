import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const petSliceName = "Pet";

export const petSlice = createSlice({
  name: petSliceName,
  initialState,
  reducers: {
    loadPets: (state, { payload }) => {
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

export const { loadPets, cleanData } = petSlice.actions;

export default petSlice.reducer;
