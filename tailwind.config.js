/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1400px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      colors: {
        'primary': '#ed3849',
        'primary-dark': "#d23141",
        'primary-light': '#f4e5ec',
        'text-dark': '#0f172a',
        'text-light': '#64748b',
        'extra-light': '#f8fafc',

        // 🎨 Zusätzliche Farben für Status-Meldungen & Buttons
        'success': '#22c55e',   // Grün für Erfolgsnachrichten
        'warning': '#facc15',   // Gelb für Warnungen
        'danger': '#ef4444',    // Rot für Fehler
      },
      borderRadius: {
        'xl': '1rem',     // Größere Abrundung für Karten und Buttons
        '2xl': '1.5rem',  // Noch größere Abrundung für besondere UI-Elemente
      },
      boxShadow: {
        'primary': '0 4px 6px -1px rgba(237, 56, 73, 0.5)', // Soft Shadow für primary Elemente
      },
    },
  },
  plugins: [],
}
