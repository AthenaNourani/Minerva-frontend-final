import { configureStore } from '@reduxjs/toolkit';

// Importiere alle benötigten Reducer und APIs
import cartReducer from './features/cart/cartSlice'; // 🛒 Handhabt den Warenkorb
import authReducer from './features/auth/authSlice'; // 🔐 Handhabt die Benutzer-Authentifizierung
import authApi from './features/auth/authApi'; // 🌐 API für Authentifizierung
import productsApi from './features/products/productsApi'; // 🏪 API für Produkte
import { reviewApi } from './features/reviews/reviewsApi'; // ⭐ API für Bewertungen
import statsApi from './features/stats/statsApi'; // 📊 API für Admin-Statistiken
import orderApi from './features/order/orderApi'; // 🛍️ API für Bestellungen

// ✅ Konfiguriere den Redux Store
export const store = configureStore({
  reducer: {
    // 🔥 Standard-Reducer für lokale Redux-Zustände
    cart: cartReducer, // 🛒 Warenkorb-Zustand
    auth: authReducer, // 🔐 Benutzer-Authentifizierung

    // 🛠️ RTK Query API Reducer (verwaltet API-Zustände)
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  
  // ⚙️ Middleware für RTK Query APIs hinzufügen
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚨 Verhindert Warnungen bei nicht-seriellen Werten (z.B. Promises)
    }).concat(
      authApi.middleware,
      productsApi.middleware,
      reviewApi.middleware,
      statsApi.middleware,
      orderApi.middleware
    ),
});
