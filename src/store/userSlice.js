import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("/user/fetchUser", async (token) => {
  if (token) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.user;
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message);
    }
  } else {
    throw new Error("Not Logged In");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.status = "loaded";
    },
    removeUser: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(fetchUser.pending, (state, action) => {
      state.status = "loading";
      state.user = null;
      state.error = null;
    });
    bulider.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
      state.error = null;
    });
    bulider.addCase(fetchUser.rejected, (state, action) => {
      state.status = "loaded";
      state.user = null;
      state.error = action.error.message;
    });
  },
});

export const UserActions = userSlice.actions;
export default userSlice;
