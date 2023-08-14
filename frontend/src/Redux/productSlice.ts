import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  product: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    }
  },
});

export const { setProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;