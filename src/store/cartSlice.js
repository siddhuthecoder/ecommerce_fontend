import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("/user/cart", async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.items;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
});

const cartSlice = createSlice({
  name: "Cart",
  initialState: { data: null, status: "idle", error: null },
  reducers: {
    removeCart: (state, action) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state, action) => {
      state.status = "loading";
      state.data = null;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "loaded";
      state.data = null;
      state.error = action.error.message;
    });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
