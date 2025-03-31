import React from 'react'
import { useSelector } from 'react-redux';
import { useGetUserStatsQuery } from '../../../redux/features/stats/statsApi';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import UserStats from './UserStats';

// 📌 Registrierung der notwendigen Chart.js-Komponenten
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserMain = () => {
  // 📌 Aktuellen Benutzer aus Redux abrufen
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;
  // 📌 Benutzerstatistiken aus der API abrufen
  const { data: stats, isLoading, error } = useGetUserStatsQuery(email, {
    skip: !email});

  // 📌 Ladeanzeige, falls die Daten noch geladen werden
  if (isLoading) return <div className='text-center text-gray-500'>Loading...</div>;

  // 📌 Fehlermeldung anzeigen, falls ein Fehler auftritt
  if (error) return <div className='text-center text-red-500'>Error: {error.message}</div>;
  
  // 📌 Falls keine Daten vorhanden sind, Nachricht anzeigen
  if (!stats) {
    return <div className='text-center text-gray-500'>No data available.</div>
  }

  // 📌 Daten für das Balkendiagramm definieren
  const data = {
    labels: ['Total Payments', 'Total Reviews', 'Total Purchased Products'],
    datasets: [{
      label: 'User Stats',
      data: [stats.totalPayments, stats.totalReviews, stats.totalPurchasedProducts], // Werte aus der API
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Hintergrundfarbe der Balken
      borderColor: 'rgb(75, 192, 192, 1)', // Rahmenfarbe der Balken
      borderWidth: 1 // Dicke der Balkenumrandung
    }]
  };

  // 📌 Optionen für das Diagramm
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Legende oben anzeigen
      },
      tooltip: {
        callbacks: {
            label: function (tooltipItem) {
                if (tooltipItem.label === 'Total Payments') {
                    return `Total Payments: $${tooltipItem.raw.toFixed(2)}`; // Rundung auf 2 Nachkommastellen
                }
                return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`; // Standardwert für andere Labels
            }
        }
      }
    }
  };

  return (
    <div className='p-6'>
        {/* 📌 Begrüßungsnachricht */}
        <div>
            <h2 className='font-semibold text-2xl mb-4'>User Dashboard</h2>
            <p className='text-gray-500 text-sm'>Hi {user?.username}! Welcome to your user dashboard.</p>
        </div>

        {/* 📌 Benutzerstatistiken anzeigen */}
        <UserStats stats={stats}/>

        {/* 📌 Balkendiagramm anzeigen */}
        <div className='mb-6 h-96'>
             <Bar data={data} options={options}/>
        </div>
    </div>
  )
}

export default UserMain
