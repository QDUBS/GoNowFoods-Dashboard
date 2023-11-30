import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: { email: "", password: "" },
  enterpriseDetails: { name: ""},
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    saveUserDetails: (state, action) => {
      state.userDetails.email = action.payload.email;
      state.userDetails.password = action.payload.password;
    },
    saveEnterpriseDetails: (state, action) => {
      state.enterpriseDetails.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUserDetails, saveEnterpriseDetails } =
  signupSlice.actions;

export default signupSlice.reducer;
