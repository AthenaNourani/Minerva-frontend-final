import React, { useEffect, useState } from 'react';
import { getBaseUrl } from '../utils/baseUrl';
import TimeLineStep from './TimeLineStep';

const PaymentSuccess = () => {
    // Zustand für die Bestellung
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Abrufen der Session-ID aus der URL
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get('session_id');
        console.log("Session ID:", sessionId);

        // Falls eine Session-ID existiert, API-Anfrage zur Bestätigung der Zahlung senden
        if (sessionId) { 
            fetch(`${getBaseUrl()}/api/orders/confirm-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session_id: sessionId })
            })
            .then((res) => res.json()) 
            .then((data) => setOrder(data)) // Bestellung in den Zustand speichern
            .catch((err) => console.error("Error confirming payment:", err));
        }
    }, []);

    // Falls Bestellung noch nicht geladen ist, Ladeanzeige ausgeben
    if (!order) { 
        return <div>Loading...</div>;
    }

    // Überprüfen, ob ein Status bereits abgeschlossen ist
    const isCompleted = (status) => {
        const statuses = ["pending", "processing", "shipped", "completed"];
        return statuses.indexOf(status) < statuses.indexOf(order.status);
    };

    // Überprüfen, ob der aktuelle Status mit dem Bestellstatus übereinstimmt
    const isCurrent = (status) => order.status === status;
    
    // Bestellstatus-Schritte für die Zeitleiste definieren
    const steps = [
        {
            status: 'pending',
            label: 'Pending',
            description: 'Your order has been created and is awaiting processing.',
            icon: { iconName: 'time-line', bgColor: 'bg-red-500', textColor: 'text-gray-800' },
        },
        {
            status: 'processing',
            label: 'Processing',
            description: 'Your order is currently being processed.',
            icon: { iconName: 'loader-line', bgColor: 'bg-yellow-800', textColor: 'text-yellow-800' },
        },
        {
            status: 'shipped',
            label: 'Shipped',
            description: 'Your order has been shipped.',
            icon: { iconName: 'truck-line', bgColor: 'bg-blue-800', textColor: 'text-blue-800' },
        },
        {
            status: 'completed',
            label: 'Completed',
            description: 'Your order has been successfully completed.',
            icon: { iconName: 'check-line', bgColor: 'bg-green-800', textColor: 'text-green-900' },
        },
    ];

    return (
        <section className="section__container rounded p-6">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Payment {order?.status}</h2>
                <p className="mb-4">Order Id: {order?.orderId}</p>
                <p className="mb-8">Status: {order?.status}</p>
            </div>
            <ol className='sm:flex items-center relative'>
                {steps.map((step, index) => (
                    <TimeLineStep 
                        key={index}
                        step={step}
                        isCompleted={isCompleted(step.status)}
                        isCurrent={isCurrent(step.status)}
                        isLastStep={index === steps.length - 1}
                        icon={step.icon}
                        description={step.description}
                        order={order}
                    />
                ))}
            </ol>
        </section>
    );
};

export default PaymentSuccess;
