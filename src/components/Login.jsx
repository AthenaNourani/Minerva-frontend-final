import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  // 🔐 Lokale Zustände für E-Mail, Passwort und Fehlermeldung
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); // 📦 Redux-Dispatch zum Setzen des Benutzers
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation(); // API-Mutation (Login)
  const navigate = useNavigate(); // 🚀 Navigation nach erfolgreichem Login

  // 🧠 Login-Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      // 🔄 Login-Anfrage an den Server senden
      const response = await loginUser(data).unwrap();
      const { token, user } = response;

      // 💾 Benutzer im localStorage speichern
      localStorage.setItem("user", JSON.stringify(user));

      // 🗃️ Benutzer im Redux-Store setzen
      dispatch(setUser(user));

      // 📢 Erfolgreiches Login anzeigen
      alert('Login erfolgreich');

      // 🔀 Zur Startseite weiterleiten
      navigate('/');
    } catch (error) {
      // ⚠️ Fehlermeldung anzeigen
      setMessage('Bitte geben Sie eine gültige E-Mail und ein gültiges Passwort ein');
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">🔐 Bitte einloggen</h2>

        <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
          {/* 📧 E-Mail-Eingabe */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="E-Mail"
            id="email"
            name="email"
            required
            className="bg-gray-100 rounded-sm text-gray-700 px-5 py-3 w-full focus:outline-none"
          />

          {/* 🔑 Passwort-Eingabe */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Passwort"
            id="password"
            name="password"
            required
            className="bg-gray-100 rounded-sm text-gray-700 px-5 py-3 w-full focus:outline-none"
          />

          {/* 🔘 Login-Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md mt-5 hover:bg-indigo-500 font-medium py-3"
          >
            {loginLoading ? 'Wird eingeloggt...' : 'Login'}
          </button>
        </form>

        {/* ⚠️ Fehlermeldung bei falschen Eingaben */}
        {message && (
          <p className="text-red-500 px-1 underline">{message}</p>
        )}

        {/* 🔗 Registrierung und Passwort vergessen */}
        <p className="my-5 text-sm text-center italic">
          Noch kein Konto?{' '}
          <Link to="/register" className="text-primary-dark underline">
            Registrieren
          </Link>{' '}
          hier.
        </p>
        <p className="text-center mt-2 text-sm">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Passwort vergessen?
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
