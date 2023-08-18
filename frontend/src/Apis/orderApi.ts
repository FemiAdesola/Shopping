import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7099/api/v1/",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "orders",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: (userId) => ({
        url: "orders",
        params: {
          userId: userId,
        },
      }),
      providesTags: ["Orders"],
    }),
    getOrderByID: builder.query({
      query: (id) => ({
        url: `orders/${id}`,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIDQuery } =
  orderApi;
export default orderApi;
