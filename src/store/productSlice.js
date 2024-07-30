import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("/products", async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products`
    );
    return res.data.products;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: { data: null, status: "idle", error: null },
  reducers: {
    addProduct: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    updateProduct: (state, action) => {},
    removeProduct: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "loading";
      state.data = null;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "loaded";
      state.data = null;
      state.error = action.error.message;
    });
  },
});

export const productActions = productSlice.actions;
export default productSlice;
