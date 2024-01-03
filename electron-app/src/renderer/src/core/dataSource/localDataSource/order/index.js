import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  curerntSelected: null
};

export const orderSliceName = "Order";

export const orderSlice = createSlice({
  name: orderSliceName,
  initialState,
  reducers: {
    loadOrders: (state, action) => {
      state.orders = action.payload;
    },
    selectOrder: (state, action) => {
      state.curerntSelected = action.payload;
    },
    cleanData: (state, action) => {
      return { ...initialState };
    }
  }
});

export const { loadOrders, cleanData, selectOrder, updateSelectedorder } = orderSlice.actions;

export default orderSlice.reducer;
