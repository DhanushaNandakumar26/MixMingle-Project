// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError, handleSuccess } from '../../utils';

export const fetchProducts = createAsyncThunk('user/fetchProducts', async (_, thunkAPI) => {
  try {
    const url = "https://deploy-mern-app-1-api.vercel.app/products";
    const headers = {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(url, headers);
    const result = await response.json();
    return result;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: localStorage.getItem('loggedInUser') || '',
    products: [],
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      state.loggedInUser = '';
      handleSuccess('User Logged out');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        handleError(action.payload);
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
