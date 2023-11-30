import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileDetails: {
    id: "",
    photo: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    department: "",
    role: "",
    staffID: "",
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileDetails: (state, action) => {
      state.profileDetails.id = action.payload.id;
      state.profileDetails.photo = action.payload.photo;
      state.profileDetails.firstName = action.payload.firstName;
      state.profileDetails.lastName = action.payload.lastName;
      state.profileDetails.mobileNumber = action.payload.mobileNumber;
      state.profileDetails.department = action.payload.department;
      state.profileDetails.role = action.payload.role;
      state.profileDetails.staffID = action.payload.staffID;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileDetails } = profileSlice.actions;

export default profileSlice.reducer;
