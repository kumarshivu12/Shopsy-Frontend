import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchBrands,
  fetchCategories,
  createProduct,
  updateProduct,
  fetchProductById,
  fetchProducts,
} from "./ProductApi";

const initialState = {
  status: "idle",
  brands: [],
  categories: [],
  products: [],
  totalItems: 0,
  selectedProduct: null,
};

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    try {
      const response = await fetchBrands();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    try {
      const response = await fetchCategories();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    try {
      const response = await createProduct(productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (productData) => {
    try {
      const response = await updateProduct(productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (_id) => {
    try {
      const response = await fetchProductById(_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProductsAsync = createAsyncThunk(
  "product/fetchProducts",
  async (filterData) => {
    try {
      const response = await fetchProducts(filterData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.brands = [];
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "idle";
        state.categories = [];
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.selectedProduct = null;
      })
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
