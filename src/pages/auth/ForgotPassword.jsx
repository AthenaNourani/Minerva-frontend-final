import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  // 🔹 Lokale States für E-Mail und Status (Fehler, Erfolg, Ladevorgang)
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  // 🔸 Formular-Submit-Handler
  const handleSubmit = async (e) => {1
    e.preventDefault(); // verhindert Neuladen der Seite
    setStatus({ loading: true, error: "", success: "" });

    try {
      // 📤 Anfrage an Backend senden zum Zurücksetzen des Passworts
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      // ✅ Erfolgreiche Antwort
      setStatus({
        loading: false,
        success: "✅ Email zum Zurücksetzen wurde erfolgreich gesendet.",
        error: "",
      });
    } catch (error) {
      // ❌ Fehler bei der Anfrage
      setStatus({
        loading: false,
        error: error.response?.data?.message || "❌ Fehler beim Senden der E-Mail.",
        success: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📧 Passwort vergessen?
        </h2>

        {/* 🔐 Formular zur Eingabe der E-Mail-Adresse */}
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium mb-2">
            Deine E-Mail-Adresse:
          </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="z.B. max@beispiel.de"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            disabled={status.loading}
          >
            {status.loading ? "Wird gesendet..." : "Link senden"}
          </button>
        </form>

        {/* ✅ Erfolgs- oder ❌ Fehlermeldung anzeigen */}
        {status.success && (
          <p className="mt-4 text-green-600 text-center">{status.success}</p>
        )}
        {status.error && (
          <p className="mt-4 text-red-600 text-center">{status.error}</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
