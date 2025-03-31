import { createSlice } from '@reduxjs/toolkit';

// 🔄 Funktion zum Laden des gespeicherten Benutzers aus dem localStorage
const loadUserFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? { user: JSON.parse(userData) } : { user: null }; // ✅ Wenn vorhanden, parsen – sonst null
  } catch (error) {
    console.error("Fehler beim Laden des Benutzers aus localStorage:", error);
    return { user: null };
  }
};

// 📦 Initialer Zustand wird aus localStorage geladen
const initialState = loadUserFromLocalStorage();

// 🧩 Auth-Slice mit Redux Toolkit
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ Benutzer setzen (z. B. nach Login) und in localStorage speichern
    setUser: (state, action) => {
      if (!action.payload) return state; // Falls keine Daten vorhanden sind, nichts tun
      state.user = action.payload;
      try {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } catch (error) {
        console.error("Fehler beim Speichern im localStorage:", error);
      }
    },

    // 🔓 Logout: Benutzer aus dem State und localStorage entfernen
    logout: (state) => {
      state.user = null;
      try {
        localStorage.removeItem('user');
      } catch (error) {
        console.error("Fehler beim Entfernen aus localStorage:", error);
      }
    },
  },
});

// 📤 Export der Actions zur Verwendung in Komponenten (z. B. dispatch(logout()))
export const { setUser, logout } = authSlice.actions;

// 📥 Export des Reducers für den Store
export default authSlice.reducer;
