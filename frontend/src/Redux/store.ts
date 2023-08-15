import { configureStore } from "@reduxjs/toolkit";

import { productReducer } from "./productSlice";
import { cartApi, productApi } from "../Apis";
import { cartReducer } from "./cartSlice";

const store = configureStore({
  reducer: {
    productStore: productReducer,
    cartStore: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(cartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export { store };