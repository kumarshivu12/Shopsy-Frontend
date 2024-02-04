import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
} from "./userApi";

const initialState = {
  status: "idle",
  userInfo: null,
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    try {
      const response = await fetchLoggedInUser();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updateData) => {
    try {
      const response = await updateUser(updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => {
    try {
      const response = await fetchLoggedInUserOrders();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo.orders = action.payload;
      })
      .addCase(fetchLoggedInUserOrderAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

// export const { } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;
