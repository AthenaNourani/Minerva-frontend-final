import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const CategoryPage = () => {
  const { categoryName } = useParams();

  // 📡 API-Abfrage: alle Produkte laden
  const { data, isLoading, error } = useFetchAllProductsQuery({ category: categoryName });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Fehler beim Laden der Produkte.</p>;
  }

  const filteredProducts = data?.products || [];

  return (
    <>
      {/* 📌 Titel-Sektion für die Kategorie */}
      <section className="section__container bg-primary-light text-center py-8">
        <h2 className="text-3xl font-bold capitalize">{categoryName}</h2>
        <p className="text-gray-600 mt-2">
          Hier finden Sie alle Produkte der Kategorie <strong>{categoryName}</strong>.
        </p>
      </section>

      {/* 📌 Produktanzeige oder Meldung, falls keine gefunden wurden */}
      <div className="section__container py-10">
        {filteredProducts.length > 0 ? (
          <ProductCards products={filteredProducts} />
        ) : (
          <p className="text-center text-gray-500 text-xl mt-10">
            Keine Produkte in dieser Kategorie gefunden.
          </p>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
