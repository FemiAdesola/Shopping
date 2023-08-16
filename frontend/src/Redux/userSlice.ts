import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../types";

const initialUserStateData: userType = {
  fullName: "",
  id: "",
  email: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserStateData,
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
export {initialUserStateData};