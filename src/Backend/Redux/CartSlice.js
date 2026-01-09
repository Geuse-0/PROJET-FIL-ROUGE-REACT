import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: []
  },

  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, stock } = action.payload;

      const item = state.cartItems.find(i => i.id === id);

      if (item) {
        if (item.quantity < item.stock) {
          item.quantity += 1;
        }
      } else {
        state.cartItems.push({
          id,
          name,
          price,
          stock,
          quantity: 1
        });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i.id === id);

      if (!item) return;

      if (quantity < 1) {
        item.quantity = 1;
        return;
      }

      if (quantity > item.stock) {
        item.quantity = item.stock;
        return;
      }

      item.quantity = quantity;
    }
  }
});

export default CartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity
} = CartSlice.actions;

export const getCart = (state) => state.cart.cartItems;
