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
      state.pets = action.payload; // Mutate the state directly
    },
    selectPet: (state, action) => {
      state.curerntSelected = action.payload; // Mutate the state directly
    },
    cleanData: (state) => {
      return initialState; // Return the initial state to reset
    },
    updateSelectedPet: (state, action) => {
      state.curerntSelected = { ...state.curerntSelected, ...action.payload }; // Mutate the state directly
    }
  }
});

export const { loadPets, cleanData, selectPet, updateSelectedPet } = petSlice.actions;

export default petSlice.reducer;
