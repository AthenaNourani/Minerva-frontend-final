import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const AdminStatsChart = ({ stats }) => {
  // 🔹 Pie-Chart-Daten für Admin-Statistiken
  const pieData = {
    labels: ['Total Orders', 'Total Products', 'Total Reviews', 'All Users'],
    datasets: [
      {
        label: 'Admin Stats',
        data: [
          stats?.totalOrders || 0,
          stats?.totalProducts || 0,
          stats?.totalReviews || 0, // Korrektur von `totalReview`
          stats?.totalUsers || 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF4F70', '#2A8DD8', '#E6B800', '#38B4AD'],
      },
    ],
  };

  // 🔹 Leeres Array mit 12 Monaten initialisieren
  const data = new Array(12).fill(0);

  if (!stats?.monthlyEarnings || !Array.isArray(stats.monthlyEarnings)) {
    console.error("monthlyEarnings ist undefined oder kein Array:", stats?.monthlyEarnings);
    return <p className="text-red-500">Fehler: Einnahmen-Daten nicht verfügbar.</p>;
  }
  

  stats?.monthlyEarnings.forEach((entry) => {
    data[entry.month - 1] = entry.earnings;
  });

  // 🔹 Line-Chart-Daten für monatliche Einnahmen
  const lineData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Monthly Earnings',
        data,
        fill: false,
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        tension: 0.1,
      },
    ],
  };

  // 🔹 Chart-Optionen für bessere Darstellung
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className='mt-12 space-y-12'>
      <h2 className='text-xl font-semibold mb-4'>Admin Stats Overview</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* 🔹 Pie Chart */}
        <div className='max-h-96 md:h-96 w-full'>
          <Pie data={pieData} options={options} />
        </div>

        {/* 🔹 Line Chart */}
        <div className='max-h-96 md:h-96 w-full'>
          <Line data={lineData} options={options} />
        </div>
      </div>
      <div>
        <p className='text-center'>Made with Minerva</p>
      </div>
    </div>
  );
};

export default AdminStatsChart;
