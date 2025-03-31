import React from 'react';
import { Link } from 'react-router-dom'; // 📌 React Router für Navigation
import card1 from '../../assets/card-1.png';
import card2 from '../../assets/card-2.png';
import card3 from '../../assets/card-3.png';

// 📌 Karten-Daten (könnten auch aus einer API kommen)
const cards = [
    { id: 1, trend: '2023 Trend', title: 'Damen Shirts', image: card1, path: '/shop/shirts' },
    { id: 2, trend: '2023 Trend', title: 'Damen Kleider', image: card2, path: '/shop/dresses' },
    { id: 3, trend: '2023 Trend', title: 'Damen Freizeitmode', image: card3, path: '/shop/casual' },
];

const HeroSection = () => {
  return (
    <section className="section__container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
      {/* 📌 Karten-Rendering mit `map()` */}
      {cards.map((card) => (
        <div 
          key={card.id} 
          className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer transform hover:scale-105 transition-all duration-300"
        > 
          {/* 📌 Produktbild */}
          <img 
            src={card.image} 
            alt={card.title} 
            className="w-full h-64 object-cover"
          />

          {/* 📌 Overlay für bessere Lesbarkeit */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-semibold">{card.trend}</p>
            <h4 className="text-xl font-bold">{card.title}</h4>

            {/* 📌 Navigation über `Link` */}
            <Link to={card.path} className="mt-3 px-4 py-2 bg-primary rounded-lg shadow-md text-sm">
              Entdecken
            </Link>
          </div>

        </div>
      ))}

    </section>
  );
};

export default HeroSection;
