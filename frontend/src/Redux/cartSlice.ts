import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
