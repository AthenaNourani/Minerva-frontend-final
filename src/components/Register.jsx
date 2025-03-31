import React, { useState } from "react";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { Link } from "react-router-dom";

const Register = () => {
  // 📌 Lokaler State für das Formular
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 📡 RTK Query Hook für Registrierung
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // 📢 Nachricht für Erfolg oder Fehler
  const [message, setMessage] = useState("");

  // 🔄 Funktion zum Aktualisieren der Formulareingaben
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Formular absenden
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // alte Nachricht zurücksetzen

    try {
      // 📤 Registrierung senden
      const response = await registerUser(formData).unwrap();

      // ✅ Erfolgreiche Nachricht anzeigen
      setMessage("✅ Registrierung erfolgreich. Bitte überprüfen Sie Ihre E-Mail.");
    } catch (error) {
      // ❌ Fehlermeldung anzeigen (vom Server oder Standard)
      setMessage(error?.data?.message || "❌ Registrierung fehlgeschlagen.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        {/* 🔤 Überschrift */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">📝 Registrieren</h2>

        {/* 🧾 Registrierungsformular */}
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium mb-2">Benutzername:</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label className="block text-gray-700 font-medium mb-2">E-Mail:</label>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label className="block text-gray-700 font-medium mb-2">Passwort:</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mb-6"
          />

          {/* 📩 Registrierungsbutton */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {isLoading ? "Wird gesendet..." : "Registrieren"}
          </button>
        </form>

        {/* 📢 Rückmeldung nach dem Senden */}
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        {/* 🔁 Link zum Login */}
        <p className="mt-4 text-center text-sm">
          Bereits registriert? <Link to="/login" className="text-blue-500 underline">Einloggen</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
