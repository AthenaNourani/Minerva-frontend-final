import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/order/orderApi';
import { useSelector } from 'react-redux';

const UserPayments = () => {
  // 📌 Abrufen des Benutzers aus dem Redux-Store
  const { user } = useSelector((state) => state.auth);

  // 📌 Abrufen aller Bestellungen des Benutzers
  const { data: orders, error, isLoading } = useGetOrderByEmailQuery(user?.email);
  
  // 📌 Fehlerbehandlung und Ladeanzeige
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders. Please try again later.</div>;
  if (!orders || orders.length === 0) return <div>No payments found!</div>;

  // 📌 Berechnung des gesamten ausgegebenen Betrags
  const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2);

  return (
    <div className='py-6 px-4'>
      <h3 className="text-xl font-semibold mb-4">Total Payments</h3>
      <div className="border p-4 rounded shadow-md bg-white">
        {/* 📌 Gesamtbetrag anzeigen */}
        <p className="text-lg font-medium text-gray-800 mb-5">
          Total Spent: <span className="font-bold text-primary">${totalSpent ? totalSpent : 0}</span>
        </p>
        
        {/* 📌 Liste aller Bestellungen */}
        {orders.map((order, index) => (
          <li key={order._id} className="border-b-2 border-gray-300 last:border-b-0 py-4 list-none">
            {/* 📌 Bestellnummer */}
            <h5 className="font-medium text-gray-800 mb-2">Order #{index + 1}</h5>

            {/* 📌 Betrag der Bestellung */}
            <div>
              <span className='text-gray-600'>Total: <span className="font-semibold">${order?.amount.toFixed(2)}</span></span>
            </div>

            {/* 📌 Bestelldatum & Status */}
            <div className='flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-x-2 mt-2'>
              <span className='text-gray-600'>Date: {new Date(order?.createdAt).toLocaleDateString()}</span>
              
              {/* 📌 Statusanzeige mit farblicher Hervorhebung */}
              <p className='text-gray-600'>
                Status:
                <span className={`ml-2 py-[2px] px-2 text-sm font-medium rounded-md 
                  ${order?.status === "completed" ? "bg-green-100 text-green-700" : 
                    order?.status === "pending" ? "bg-red-200 text-red-700" :
                    order?.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                    "bg-blue-200 text-blue-700"
                  }`}
                >
                  {order?.status}
                </span>
              </p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default UserPayments;
