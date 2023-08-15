import { createSlice } from "@reduxjs/toolkit";

import { CartType } from "../types";

const initialState: CartType = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      //in payload it needs cart item that needs to be updated, newquantity
      state.cartItems = state.cartItems?.map((itemInCart) => {
        if (itemInCart.id === action.payload.cartItem.id) {
          itemInCart.quantity = action.payload.quantity;
        }
        return itemInCart;
      });
    },
    removeItemFromCart: (state, action) => {
      //The payload to remove  cart item that needs to be updated, newquantity
      state.cartItems = state.cartItems?.filter((itemInCart) => {
        if (itemInCart.id === action.payload.cartItem.id) {
          return null;
        }
        return itemInCart;
      });
    },
  },
});

export const { setCart, updateQuantity, removeItemFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
