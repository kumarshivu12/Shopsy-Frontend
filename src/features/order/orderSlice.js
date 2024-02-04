import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrder } from "./orderApi";

const initialState = {
  status: "idle",
  orders: [],
  totalOrders: 0,
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (orderData) => {
    try {
      const response = await createOrder(orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (orderData) => {
    try {
      const response = await updateOrder(orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    try {
      const response = await fetchAllOrders(sort, pagination);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        state.orders[index] = action.payload;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectStatus = (state) => state.order.status;

export default orderSlice.reducer;
