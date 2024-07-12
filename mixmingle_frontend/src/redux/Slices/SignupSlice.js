// src/features/signup/signupSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError, handleSuccess } from '../../utils';

const initialState = {
  name: '',
  email: '',
  password: '',
  loading: false,
  error: null,
  success: null,
};

export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (signupInfo, { rejectWithValue }) => {
    try {
      const url = `https://deploy-mern-app-1-api.vercel.app/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        return result;
      } else {
        const details = result.error?.details[0].message;
        return rejectWithValue(details || result.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignupInfo: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetSignupInfo: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.loading = false;
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSignupInfo, resetSignupInfo } = signupSlice.actions;

export default signupSlice.reducer;
