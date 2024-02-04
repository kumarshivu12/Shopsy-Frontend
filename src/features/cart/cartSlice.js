import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  updateCart,
  resetCart,
  deleteItemFromCart,
  fetchItemsByUserId,
} from "./cartApi";

const initialState = {
  status: "idle",
  items: [],
  cartLoaded: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (cartItem) => {
    try {
      console.log(cartItem);
      const response = await addToCart(cartItem);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (cartItem) => {
    try {
      console.log(cartItem);
      const response = await updateCart(cartItem);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    try {
      const response = await deleteItemFromCart(itemId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    try {
      const response = await fetchItemsByUserId();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  try {
    const response = await resetCart();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateCartAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteItemFromCartAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

// export const { } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
