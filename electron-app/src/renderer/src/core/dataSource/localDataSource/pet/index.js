import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: [],
  curerntSelected: null
};

export const petSliceName = "Pet";

export const petSlice = createSlice({
  name: petSliceName,
  initialState,
  reducers: {
    loadPets: (state, action) => {
      state.pets = action.payload;
    },
    selectPet: (state, action) => {
      state.curerntSelected = action.payload;
    },
    cleanData: (state) => {
      return initialState;
    },
    updateSelectedPet: (state, action) => {
      state.curerntSelected = { ...state.curerntSelected, ...action.payload };
    }
  }
});

export const { loadPets, cleanData, selectPet, updateSelectedPet } = petSlice.actions;

export default petSlice.reducer;
