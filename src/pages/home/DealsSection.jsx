import React from 'react';
import dealsImg from '../../assets/deals.png';

const DealsSection = () => {
  // 📌 Countdown-Werte (können aus einer API oder `useState` stammen)
  const countdown = {
    days: 14,
    hours: 20,
    minutes: 15,
    seconds: 5,
  };

  return (
    <section className="section__container flex flex-col md:flex-row items-center bg-gray-100 rounded-lg p-6 shadow-md">
      
      {/* 📌 Angebotsbild */}
      <div className="md:w-1/2">
        <img
          src={dealsImg}
          alt="Monatsangebote - Bis zu 20% Rabatt"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* 📌 Angebotstext & Countdown */}
      <div className="md:w-1/2 p-6 text-center md:text-left">
        <h5 className="text-primary text-lg font-semibold">Bis zu 20% Rabatt</h5>
        <h4 className="text-2xl font-bold my-2">Monatsangebote</h4>
        <p className="text-gray-700 mb-5">
          Schnappen Sie sich die besten Angebote! Diese Rabatte gelten nur für eine begrenzte Zeit. 
          Beeilen Sie sich und profitieren Sie von unseren Top-Deals!
        </p>

        {/* 📌 Countdown-Timer */}
        <div className="flex justify-center md:justify-start gap-4">
          {Object.entries(countdown).map(([key, value]) => (
            <div key={key} className="text-center p-3 bg-primary text-white rounded-md w-16 shadow-md">
              <h4 className="text-xl font-bold">{value}</h4>
              <p className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default DealsSection;
