import { createSlice } from '@reduxjs/toolkit';

// 🧠 Funktion zum Laden des Warenkorbs aus dem localStorage
const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {
      products: [],
      selectedItems: 0,
      totalPrice: 0,
      tax: 0,
      taxRate: 0.05,
      grandTotal: 0
    };
  } catch (error) {
    console.error("Fehler beim Laden des Warenkorbs:", error);
    return {
      products: [],
      selectedItems: 0,
      totalPrice: 0,
      tax: 0,
      taxRate: 0.05,
      grandTotal: 0
    };
  }
};

// 🧾 Anfangszustand aus localStorage laden
const initialState = loadCartFromLocalStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 🟢 Produkt zum Warenkorb hinzufügen
    addToCart: (state, action) => {
      const existingProduct = state.products.find((product) => product._id === action.payload._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      recalculateAndSave(state); // ✅ Werte berechnen & speichern
    },

    // 🔄 Produktmenge aktualisieren
    updateQuantity: (state, action) => {
      const product = state.products.find((product) => product._id === action.payload._id);

      if (product) {
        if (action.payload.type === 'increment') {
          product.quantity += 1;
        } else if (action.payload.type === 'decrement' && product.quantity > 1) {
          product.quantity -= 1;
        }
      }

      recalculateAndSave(state); // ✅ Werte berechnen & speichern
    },

    // ❌ Produkt aus dem Warenkorb entfernen
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload._id);
      recalculateAndSave(state); // ✅ Werte berechnen & speichern
    },

    // 🧹 Warenkorb komplett leeren
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
      localStorage.removeItem('cart'); // 🧹 Auch aus localStorage entfernen
    },
  },
});

// 🧮 Hilfsfunktion zur Neuberechnung der Summen und zum Speichern im localStorage
const recalculateAndSave = (state) => {
  state.selectedItems = state.products.reduce((total, product) => total + product.quantity, 0);
  state.totalPrice = state.products.reduce((total, product) => total + product.price * product.quantity, 0);
  state.tax = state.totalPrice * state.taxRate;
  state.grandTotal = state.totalPrice + state.tax;

  // 💾 Im localStorage speichern
  localStorage.setItem('cart', JSON.stringify(state));
};

// 🎯 Aktionen & Reducer exportieren
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
