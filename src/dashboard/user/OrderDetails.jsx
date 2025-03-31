import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../../redux/features/order/orderApi'
import TimeLineStep from '../../components/TimeLineStep'

const OrderDetails = () => {
    const { orderId } = useParams() // 📌 Holt die Order-ID aus der URL-Parameter
    console.log(orderId) // ✅ Debugging-Zweck: Ausgabe der Order-ID
    const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId) // 📌 Fetch der Bestelldaten basierend auf der ID

    // 📌 Falls die Daten noch geladen werden, zeige einen Ladeindikator
    if (isLoading) return <div>Loading...</div>

    // 📌 Falls ein Fehler auftritt oder keine Bestellung gefunden wird, eine Nachricht ausgeben
    if (error) return <div>No orders!</div>

    // 📌 Prüft, ob ein Status bereits abgeschlossen ist (Vergleich mit der aktuellen Bestellstatus)
    const isCompleted = (status) => {
        const statuses = ["pending", "processing", "shipped", "completed"]
        return statuses.indexOf(status) < statuses.indexOf(order.status)
    }

    // 📌 Prüft, ob der aktuelle Status mit dem Schritt-Status übereinstimmt
    const isCurrent = (status) => order.status === status;

    // 📌 Definiert die Bestellstatus-Schritte für die Zeitleiste
    const steps = [
        {
            status: 'pending',
            label: 'Pending',
            description: 'Your order has been created and is awaiting processing.',
            icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
        },
        {
            status: 'processing',
            label: 'Processing',
            description: 'Your order is currently being processed.',
            icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
        },
        {
            status: 'shipped',
            label: 'Shipped',
            description: 'Your order has been shipped.',
            icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
        },
        {
            status: 'completed',
            label: 'Completed',
            description: 'Your order has been successfully completed.',
            icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
        },
    ];

    return (
        <section className="section__container rounded p-6">
            {/* 📌 Anzeige der Bestellinformationen */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Payment {order?.status}</h2>
                <p className="mb-4">Order Id: {order?.orderId}</p>
                <p className="mb-8">Status: {order?.status}</p>
            </div>

            {/* 📌 Zeitleiste für den Bestellstatus */}
            <ol className='sm:flex items-center relative'>
                {steps.map((step, index) => (
                    <TimeLineStep 
                        key={index}
                        step={step}
                        isCompleted={isCompleted(step.status)} // ✅ Prüft, ob der Schritt abgeschlossen ist
                        isCurrent={isCurrent(step.status)} // ✅ Prüft, ob dies der aktuelle Schritt ist
                        isLastStep={index === steps.length - 1} // ✅ Prüft, ob es der letzte Schritt ist
                        icon={step.icon}
                        description={step.description}
                        order={order}
                    />
                ))}
            </ol>
        </section>
    )
}

export default OrderDetails
