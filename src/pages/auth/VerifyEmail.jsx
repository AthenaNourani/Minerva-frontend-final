import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmailManually = () => {
  const [token, setToken] = useState(''); // 🔹 Zustand für das Token
  const [message, setMessage] = useState(''); // 🔹 Zustand für die Rückmeldung

  // 🔄 Funktion zum Senden des Tokens an den Server
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${getBaseUrl()}/api/auth//verify-email/${token}`);
      setMessage(response.data.message || '✅ Ihre E-Mail wurde erfolgreich bestätigt.');
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Fehler bei der E-Mail-Bestätigung.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* 🔹 Titel */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🔐 Manuelle E-Mail-Bestätigung (Test)
        </h2>

        {/* 🔹 Formular zur Token-Eingabe */}
        <form onSubmit={handleVerify}>
          <label className="block text-gray-700 font-medium mb-2">
            🔑 E-Mail-Verifikationstoken:
          </label>
          <input
            type="text"
            placeholder="Token aus der Konsole einfügen"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Bestätigen
          </button>
        </form>

        {/* 🔹 Rückmeldung */}
        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailManually;
