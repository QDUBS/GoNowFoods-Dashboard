import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../slices/signupSlice';
import profileReducer from "../slices/profileSlice";


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    signup: signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
