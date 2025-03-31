import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderByEmailQuery } from '../../redux/features/order/orderApi';
import { Link } from 'react-router-dom';

const UserOrders = () => {
    // 📌 Holen der Benutzerdaten aus dem Redux-Store
    const { user } = useSelector((state) => state.auth);
    const email = user.email; // 📌 Speichern der Benutzer-E-Mail
    console.log(email); // ✅ Debugging: Benutzer-E-Mail ausgeben

    // 📌 API-Call zum Abrufen der Bestellungen des Benutzers
    const { data: orders, error, isLoading } = useGetOrderByEmailQuery(email);

    console.log({ orders: orders, error: error, isLoading: isLoading }); // ✅ Debugging: Bestelldaten ausgeben

    // 📌 Falls die Daten noch geladen werden, Ladeanzeige anzeigen
    if (isLoading) return <div>Loading...</div>;

    // 📌 Falls ein Fehler auftritt, Fehlermeldung ausgeben
    if (error) return <div>Error fetching orders. Please try again later.</div>;

    // 📌 Falls keine Bestellungen vorhanden sind, eine Nachricht anzeigen
    if (!orders || orders.length === 0) return <div>No orders found!</div>;

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Your Orders</h3>
                            </div>
                        </div>
                    </div>

                    {/* 📌 Tabelle zur Anzeige der Bestellungen */}
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">#</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">Order ID</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">Date</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">Status</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">Total</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">View Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        {/* 📌 Reihenfolge-Nummerierung */}
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                            {index + 1}
                                        </th>
                                        {/* 📌 Bestell-ID */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {order?.orderId}
                                        </td>
                                        {/* 📌 Bestelldatum */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {new Date(order?.createdAt).toLocaleString()}
                                        </td>
                                        {/* 📌 Bestellstatus mit farblicher Hervorhebung */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <span className={`p-1 rounded-md font-bold
                                                ${order.status === 'completed' ? 'bg-green-200 text-green-700' :
                                                    order.status === 'pending' ? 'bg-red-200 text-red-700' :
                                                        order.status === 'processing' ? 'bg-blue-200 text-blue-700' :
                                                            'bg-gray-200 text-gray-700'}`}>
                                                {order?.status}
                                            </span>
                                        </td>
                                        {/* 📌 Bestellsumme */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            ${order?.amount}
                                        </td>
                                        {/* 📌 Link zur Detailansicht der Bestellung */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <Link to={`/orders/${order._id}`} className="underline text-blue-500 hover:text-blue-700">View Order</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 📌 Footer-Bereich */}
            <footer className="relative pt-8 pb-6 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Made with{' '}
                                <a href="https://www.creative-tim.com/product/notus-js"
                                    className="text-blueGray-500 hover:text-gray-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Notus JS
                                </a>{' '}
                                by{' '}
                                <a href="https://www.creative-tim.com"
                                    className="text-blueGray-500 hover:text-blueGray-800"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Creative Tim
                                </a>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default UserOrders;
