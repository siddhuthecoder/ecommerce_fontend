import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk("/user/orders", async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
});

const orderSlice = createSlice({
  name: "Orders",
  initialState: { data: null, status: "idle", error: null },
  reducers: {
    removeOrder: (state, action) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.status = "loading";
      state.data = null;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = "loaded";
      state.data = null;
      state.error = action.error.message;
    });
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
