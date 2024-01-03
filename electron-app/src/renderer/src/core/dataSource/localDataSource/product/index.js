import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productSliceName = "Product";

export const productSlice = createSlice({
  name: productSliceName,
  initialState,
  reducers: {
    loadProducts: (state, { payload }) => {
      return {
        ...state,
        products: payload
      };
    },
    selectProduct: (state, { payload }) => {
      return {
        ...state,
        curerntSelected: payload
      };
    },
    cleanData: (state, action) => {
      return { ...initialState };
    },
    updateSelectedProduct: (state, action) => {
      state.curerntSelected = { ...state.curerntSelected, ...action.payload };
    }
  }
});

export const { loadProducts, cleanData, selectProduct, updateSelectedProduct } =
  productSlice.actions;

export default productSlice.reducer;
