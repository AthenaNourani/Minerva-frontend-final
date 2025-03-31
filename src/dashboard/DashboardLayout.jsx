import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardLayout = () => {
    // 📌 Den aktuellen Benutzer aus dem Redux-Store abrufen
    const { user } = useSelector((state) => state.auth);

    // 📌 Falls kein Benutzer angemeldet ist, zur Login-Seite weiterleiten
    if (!user) return <Navigate to="/login" replace />;

    // 📌 Je nach Benutzerrolle das richtige Dashboard rendern
    const renderDashboard = () => {
        if (user?.role === 'admin') return <AdminDashboard />;
        if (user?.role === 'user') return <UserDashboard />;
        return <Navigate to="/login" replace />; // Falls Rolle unbekannt ist, zurück zur Login-Seite
    };

    return (
        <div className="container mx-auto flex flex-col md:flex-row gap-6">
            {/* 📌 Dashboard-Sidebar für Admin oder User */}
            <aside className="lg:w-1/5 sm:w-2/5 w-full border-r bg-gray-100 p-4 shadow-md">
                {renderDashboard()}
            </aside>

            {/* 📌 Hauptbereich für den Inhalt der Dashboard-Seiten */}
            <main className="p-8 bg-white flex-1 mt-5 shadow-md rounded-md">
                <Outlet /> {/* 📌 Hier wird der aktuelle Dashboard-Content gerendert */}
            </main>
        </div>
    );
};

export default DashboardLayout;
