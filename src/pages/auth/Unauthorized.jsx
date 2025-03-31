import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full text-center">
        {/* ❌ Titel der Fehlermeldung */}
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Kein Zugriff</h1>

        {/* 📢 Beschreibung der Fehlermeldung */}
        <p className="text-gray-700 mb-6">
          Sie haben keine Berechtigung, auf diese Seite zuzugreifen.
        </p>

        {/* 🔁 Zurück-Link zur Startseite */}
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
