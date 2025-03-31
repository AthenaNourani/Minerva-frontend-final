import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 🔐 PrivateRoute schützt Routen vor unberechtigtem Zugriff.
 * Optional kann auch eine bestimmte Rolle (z. B. "admin") verlangt werden.
 */
const PrivateRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth); // 📌 Aktueller Nutzer aus Redux-State
  const location = useLocation(); // 📍 Aktuelle Route für spätere Weiterleitung

  // 🚫 Nutzer ist nicht eingeloggt → Weiterleitung zur Login-Seite
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚫 Nutzer hat nicht die erforderliche Rolle → Weiterleitung zur „unauthorized“-Seite
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Zugriff erlaubt → Geschützte Komponente wird gerendert
  return children;
};

export default PrivateRoute;
