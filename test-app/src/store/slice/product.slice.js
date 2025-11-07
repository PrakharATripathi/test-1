import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ skip = 0, limit = 20, category = '' }, { rejectWithValue }) => {
    try {
      const url = category 
        ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/products/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    total: 0,
    isLoading: false,
    isCategoriesLoading: false,
    error: null,
    currentPage: 1,
    selectedCategory: ''
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isCategoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isCategoriesLoading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isCategoriesLoading = false;
      });
  }
});

export const { setCurrentPage, setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;