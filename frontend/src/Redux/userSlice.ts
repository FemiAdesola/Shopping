import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../types";

const initialState: userType = {
  fullName: "",
  id: "",
  email: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setLoggedInUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
