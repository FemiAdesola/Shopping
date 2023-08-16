import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const userApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7099/api/v1/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "users/register",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "users/login",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: userCredentials,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
export default userApi;