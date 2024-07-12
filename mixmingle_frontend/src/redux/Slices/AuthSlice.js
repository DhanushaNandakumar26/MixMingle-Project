// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedInUser: localStorage.getItem('loggedInUser') || null,
  token: localStorage.getItem('token') || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.loggedInUser = action.payload.name;
      state.token = action.payload.jwtToken;
      state.error = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, clearError } = authSlice.actions;

export default authSlice.reducer;
