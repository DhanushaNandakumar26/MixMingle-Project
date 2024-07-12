import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './Slices/SignupSlice';
import authReducer from './Slices/AuthSlice';
import userReducer from './Slices/UserSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
