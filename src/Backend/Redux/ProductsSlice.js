import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await API.get("/products");
  return res.data;
});

export const addProduct = createAsyncThunk("products/addProduct", async (product) => {
  const res = await API.post("/products", product);
  return res.data;
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (product) => {
  const res = await API.put(`/products/${product.id}`, product);
  return res.data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await API.delete(`/products/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(addProduct.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;
