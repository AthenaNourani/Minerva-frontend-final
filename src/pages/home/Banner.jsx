import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/header.png';

const Banner = () => {
  return (
    <div className="section__container header__container relative w-full h-[600px] overflow-hidden">
      {/* 🔽 Hintergrundbild über die ganze Fläche */}
      <img
        src={bannerImg}
        alt="Fashion Banner for Girls"
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* 🔽 Text-Inhalt über dem Bild */}
      <div className="header__content relative z-20 text-center md:text-left px-4">
        <h4 className="uppercase text-primary font-semibold tracking-wide">
          Up to 20% off
        </h4>
        <h1 className="text-4xl font-bold text-gray-900 mt-2">
          Girls' Fashion
        </h1>
        <p className="text-gray-700 mt-4">
          Discover the latest fashion trends for girls with exclusive discounts and premium quality materials.
        </p>
        <button className="btn mt-6 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-all duration-300">
          <Link to="/shop">SHOP NOW</Link>
        </button>
      </div>
    </div>
  );
};

export default Banner;
