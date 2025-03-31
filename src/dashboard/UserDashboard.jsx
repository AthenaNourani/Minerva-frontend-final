import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';

// 📌 Definiere die Navigationspunkte für das Benutzer-Dashboard
const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/orders', label: 'Meine Bestellungen' },
    { path: '/dashboard/payments', label: 'Meine Zahlungen' },
    { path: '/dashboard/profile', label: 'Mein Profil' },
    { path: '/dashboard/reviews', label: 'Meine Bewertungen' },
];

const UserDashboard = () => {
    const [logoutUser] = useLogoutUserMutation(); // 📌 Mutation für den Logout-Vorgang
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 📌 Funktion zum Ausloggen des Benutzers
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap(); // 📌 Anfrage an den Server senden
            alert('Erfolgreich ausgeloggt!'); // 📌 Benutzer informieren
            dispatch(logout()); // 📌 Redux-Store aktualisieren
            navigate('/'); // 📌 Zur Startseite weiterleiten
        } catch (error) {
            console.error('Fehler beim Logout:', error);
        }
    };

    return (
        <div className="bg-white p-8 md:h-screen flex flex-col justify-between shadow-md rounded-md">
            {/* 📌 Obere Sektion mit Logo und Navigation */}
            <div>
                <div className="nav__logo">
                    <Link to="/" className="text-2xl font-bold">
                        Minerva<span className="text-primary">.</span>
                    </Link>
                    <p className="text-xs italic text-gray-500">User Dashboard</p>
                </div>
                <hr className="mt-5" />

                {/* 📌 Navigationsliste für Benutzer-Dashboard */}
                <ul className="mt-3 space-y-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded-md transition-all ${
                                        isActive ? 'bg-primary text-white font-bold' : 'text-black hover:bg-gray-200'
                                    }`
                                }
                                end
                                to={item.path}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 📌 Logout-Bereich */}
            <div className="mt-5">
                <hr className="mb-3" />
                <button
                    onClick={handleLogout}
                    className="w-full text-white bg-red-500 font-medium px-5 py-2 rounded-md hover:bg-red-600 transition-all"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
