import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../API";
export const fetchProducts = createAsyncThunk("products/fetchProducts",
async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/products");
      return res.data;
    } catch (error) {
      return rejectWithValue("Erreur chargement produits");
    }
})
const productsSlice = createSlice({
    name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers:{ },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, state  => {
state.loading = true;
state.error = null;
    })
      builder.addCase(fetchProducts.fulfilled,( state, action ) => {
state.loading = false;
state.items = action.payload;
    })
    builder.addCase(fetchProducts.rejected,( state, action ) => {
state.loading = false;
state.error = action.payload;
    })
  }
})
export default productsSlice.reducer;