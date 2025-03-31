import React from 'react'

const UserStats = ({ stats }) => {
  return (
    <div className='my-5 space-y-4'>
        {/* 📌 Grid-Layout für Statistikkarten */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
            {/* 📌 Karte für die gesamten Zahlungen */}
            <div className='bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                <h4 className='text-xl font-semibold mb-2'>Total Payments</h4>
                <p className='text-2xl font-bold'>
                    ${stats?.totalPayments || 0} {/* Falls kein Wert vorhanden ist, wird 0 angezeigt */}
                </p>
            </div>

            {/* 📌 Karte für die gesamten Bewertungen */}
            <div className='bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                <h4 className='text-xl font-semibold mb-2'>Total Reviews</h4>
                <p className='text-2xl font-bold'>
                    {stats?.totalReviews || 0} {/* Falls kein Wert vorhanden ist, wird 0 angezeigt */}
                </p>
            </div>

            {/* 📌 Karte für die gesamten gekauften Produkte */}
            <div className='bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                <h4 className='text-xl font-semibold mb-2'>Total Purchased Products</h4>
                <p className='text-2xl font-bold'>
                    {stats?.totalPurchasedProducts || 0} {/* Falls kein Wert vorhanden ist, wird 0 angezeigt */}
                </p>
            </div>
        </div>
    </div>
  )
}

export default UserStats
