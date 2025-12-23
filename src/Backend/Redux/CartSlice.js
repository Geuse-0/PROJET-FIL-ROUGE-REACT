import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'

const CartSlice = createSlice({
  name: "cart",
  initialState: [
    {}

  ],

  reducers: {

    addToCart: (state, action) => {
      const { id, name, price } = action.payload;

      const item = state.items.find(i => i.id === id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity: 1,
        })
      }
    },

    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    },
    clearCart: (state) => {
      state = []
    },
    updateQuantity: (state, action) => {

      const { id, quantity } = action.payload;

      const item = state.items.find(i => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }

    }

  }

})

export default CartSlice.reducer;
export const { addToCart, removeFromCart, clearCart, updateQuantity } = CartSlice.actions
export const getCart = (state) => state.cart 