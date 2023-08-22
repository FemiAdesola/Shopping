import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7099/api/v1/" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: "products/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: "products/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
export default productApi;