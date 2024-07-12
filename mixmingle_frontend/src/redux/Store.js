import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './Slices/SignupSlice';
import authReducer from './Slices/AuthSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
  },
});

export default store;
