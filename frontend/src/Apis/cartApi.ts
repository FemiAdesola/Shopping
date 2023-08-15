import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7099/api/v1/" }),
  tagTypes: ["carts"],
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: (userId) => ({
        url: `carts`,
        params: {
          userId: userId,
        },
        method: "GET",
      }),
      providesTags: ["carts"],
    }),
    updateCart: builder.mutation({
      query: ({ productId, updateQuantityBy, userId }) => ({
        url: "carts",
        method: "POST",
        params: {
          productId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const { useGetCartsQuery, useUpdateCartMutation } = cartApi;
export default cartApi;
