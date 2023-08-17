import { configureStore } from "@reduxjs/toolkit";

import { productReducer } from "./productSlice";
import { cartApi, orderApi, paymentApi, productApi, userApi } from "../Apis";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    productStore: productReducer,
    cartStore: cartReducer,
    userStore: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(userApi.middleware)
      .concat(paymentApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export { store };