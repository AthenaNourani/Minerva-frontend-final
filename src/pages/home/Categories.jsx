import React from 'react';
import { Link } from 'react-router-dom';

// 📌 Import der Kategorie-Bilder
import category1 from '../../assets/category-1.jpg';
import category2 from '../../assets/category-2.jpg';
import category3 from '../../assets/category-3.jpg';
import category4 from '../../assets/category-4.jpg';

const Categories = () => {
  // 📌 Array mit Kategorie-Daten
  const categories = [
    { name: 'Accessoires', path: 'accessories', image: category1 },
    { name: 'Kleiderkollektion', path: 'dress', image: category2 },
    { name: 'Schmuck', path: 'jewellery', image: category3 },
    { name: 'Kosmetik', path: 'cosmetics', image: category4 },
  ];

  return (
    <section className="section__container">
      <h2 className="text-3xl font-bold text-center mb-6">Entdecke unsere Kategorien</h2>

      {/* 📌 Grid-Layout für Kategorien */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/categories/${category.path}`}
            className="relative group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* 📌 Bild */}
            <img
              src={category.image}
              alt={`Kategorie: ${category.name}`}
              className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* 📌 Kategorie-Name */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-3 text-center">
              <h4 className="text-white text-lg font-semibold">{category.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
