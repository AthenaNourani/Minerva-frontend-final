import React from 'react';
import { useGetAdminStatsQuery } from '../../../redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import { useSelector } from 'react-redux';
import AdminStatsChart from './AdminStatsChart';

const AdminDMain = () => {
    // 🔹 User-Daten aus Redux abrufen
    const { user } = useSelector((state) => state.auth) || {};
    
    // 🔹 Admin-Statistiken abrufen
    const { data: stats, error, isLoading } = useGetAdminStatsQuery();

    // 🔹 Ladezustand anzeigen
    if (isLoading) return <div className="text-gray-500 text-center">Loading...</div>;

    // 🔹 Fehlerbehandlung
    if (error) return <div className="text-red-500 text-center">Failed to load stats!</div>;

    // 🔹 Falls keine Daten vorhanden sind
    if (!stats) return <div className="text-gray-500 text-center">No Stats found</div>;

    return (
        <div className='p-6'>
            <div>
                {/* 🔹 Begrüßungstext für den Admin */}
                <h1 className='text-2xl font-semibold mb-4'>
                    Admin Dashboard
                </h1>
                <p className='text-gray-500'>
                    Hi {user?.username || 'Admin'}! Welcome to the admin dashboard
                </p>

                {/* 🔹 Admin-Statistiken anzeigen, wenn vorhanden */}
                {stats && <AdminStats stats={stats} />}

                {/* 🔹 Admin-Diagramm anzeigen, wenn vorhanden */}
                {stats && <AdminStatsChart stats={stats} />}
            </div>
        </div>
    );
};

export default AdminDMain;
