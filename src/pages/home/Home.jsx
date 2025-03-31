import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import HeroSection from './HeroSection';
import TrendingsProducts from '../shop/TrendingsProducts';
import DealsSection from './DealsSection';
import PromoBanner from './PromoBanner';
import Blogs from './blogs/Blogs';

const Home = () => {
  return (
    <main className="space-y-12">
      
      {/* 📌 Header-Banner mit Hauptwerbung */}
      <Banner />

      {/* 📌 Kategorienübersicht */}
      <Categories />

      {/* 📌 Beliebte Produkte in einer Hero-Sektion */}
      <HeroSection />

      {/* 📌 Trending-Produkte (dynamische Daten von Shop-API) */}
      <TrendingsProducts />

      {/* 📌 Monatliche Angebote & Rabatte */}
      <DealsSection />

      {/* 📌 Ein weiterer Werbebereich */}
      <PromoBanner />

      {/* 📌 Blog-Bereich mit neuesten Beiträgen */}
      <Blogs />

    </main>
  );
};

export default Home;
