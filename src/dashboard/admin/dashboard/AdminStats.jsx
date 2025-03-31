import React from 'react';

const AdminStats = ({ stats }) => {
    console.log("Admin Stats Data:", stats);

    // 🔹 Fallback-Werte für Statistik-Daten (falls `undefined`)
    const formattedStats = {
        totalEarnings: stats?.totalEarnings || 0,
        totalOrders: stats?.totalOrders || 0,
        totalUsers: stats?.totalUsers || 0,
        totalProducts: stats?.totalProducts || 0,
    };

    // 🔹 Funktion für besseres Zahlenformat (z.B. `1,000` statt `1000`)
    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    return (
        <div className='my-5 space-y-4'>
            {/* 🔹 Grid für Statistik-Karten */}
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2'>

                {/* 🔹 Gesamtumsatz */}
                <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                    <h3 className='text-xl font-semibold mb-2'>Total Earnings</h3>
                    <p className='text-2xl font-bold'>${formatNumber(formattedStats.totalEarnings)}</p>
                </div>

                {/* 🔹 Alle Bestellungen */}
                <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                    <h3 className='text-xl font-semibold mb-2'>All Orders</h3>
                    <p className='text-2xl font-bold'>{formatNumber(formattedStats.totalOrders)}</p>
                </div>

                {/* 🔹 Alle Benutzer */}
                <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                    <h3 className='text-xl font-semibold mb-2'>All Users</h3>
                    <p className='text-2xl font-bold'>{formatNumber(formattedStats.totalUsers)}</p>
                </div>

                {/* 🔹 Gesamtanzahl der Produkte */}
                <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                    <h3 className='text-xl font-semibold mb-2'>Total Products</h3>
                    <p className='text-2xl font-bold'>{formatNumber(formattedStats.totalProducts)}</p>
                </div>

            </div>
        </div>
    );
};

export default AdminStats;
