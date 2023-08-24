import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7099/api/v1/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
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
      query: ({ userId, searchString, status }) => ({
        url: "orders",
        params: {
          ...(userId && { userId }),
          ...(searchString && { searchString }),
          ...(status && { status }),
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
    updateOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "orders/" + orderDetails.orderId,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIDQuery,
  useUpdateOrderMutation,
} = orderApi;
export default orderApi;
