import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productId_array: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      if (!state.productId_array.includes(productId)) {
        state.productId_array.push(productId);
        localStorage.setItem("cartItems", JSON.stringify(state.productId_array));
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.productId_array = state.productId_array.filter((id) => id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(state.productId_array));
    },
    clearCart: (state) => {
      state.productId_array = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
