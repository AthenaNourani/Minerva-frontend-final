import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  // 🔐 Token aus der URL holen
  const { token } = useParams();

  // 🔄 States für neues Passwort und UI-Feedback
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Passwort absenden
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // 🔍 Clientseitige Validierung
    if (newPassword.length < 6) {
      setErrorMessage("❌ Das Passwort muss mindestens 6 Zeichen lang sein.");
      setLoading(false);
      return;
    }

    try {
      // 📡 Anfrage an Backend senden
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { newPassword }
      );

      setSuccessMessage("✅ Passwort wurde erfolgreich geändert!");
      // 🔄 Nach kurzer Zeit zur Login-Seite navigieren
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      // ❌ Fehlerbehandlung
      setErrorMessage(
        error.response?.data?.message ||
          "❌ Fehler beim Zurücksetzen des Passworts"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🔐 Neues Passwort festlegen
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium mb-2">
            Neues Passwort:
          </label>
          <input
            type="password"
            placeholder="Mindestens 6 Zeichen"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            disabled={loading}
          >
            {loading ? "🔄 Wird gesendet..." : "Passwort ändern"}
          </button>
        </form>

        {/* ✅ Erfolgsmeldung */}
        {successMessage && (
          <p className="text-green-600 mt-4 text-center">{successMessage}</p>
        )}

        {/* ❌ Fehlermeldung */}
        {errorMessage && (
          <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
