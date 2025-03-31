import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';

// 📌 Navigations-Elemente für das Admin-Dashboard
const navItems = [
    { path: '/dashboard/admin', label: 'Dashboard' },
    { path: '/dashboard/add-product', label: 'Neues Produkt hinzufügen' },
    { path: '/dashboard/manage-products', label: 'Produkte verwalten' },
    { path: '/dashboard/users', label: 'Alle Benutzer' },
    { path: '/dashboard/manage-orders', label: 'Bestellungen verwalten' },
];

const UserDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 📌 Funktion zum Ausloggen des Benutzers
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap(); // 📌 Anfrage zum Logout senden
            dispatch(logout()); // 📌 Redux-Store aktualisieren
            alert('Erfolgreich abgemeldet');
            navigate('/'); // 📌 Benutzer zur Startseite leiten
        } catch (error) {
            console.error("Fehler beim Abmelden", error);
        }
    };

    return (
        <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
            {/* 📌 Header-Bereich */}
            <div>
                <div className="nav__logo flex flex-col">
                    <Link to="/" className="text-2xl font-bold">
                        Minerva<span className="text-primary">.</span>
                    </Link>
                    <p className="text-xs italic text-gray-500">Admin Dashboard</p>
                </div>

                {/* 📌 Trennlinie */}
                <hr className="mt-5" />

                {/* 📌 Navigationsmenü */}
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path} className="mt-3">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-blue-600 font-bold border-l-4 border-blue-600 pl-2'
                                        : 'text-gray-700 hover:text-blue-600 transition'
                                }
                                end
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 📌 Logout-Bereich */}
            <div className="mb-3">
                <hr className="mb-3" />
                <button
                    onClick={handleLogout}
                    className="text-white bg-red-500 hover:bg-red-600 font-medium px-5 py-2 rounded-sm w-full transition"
                >
                    Abmelden
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
