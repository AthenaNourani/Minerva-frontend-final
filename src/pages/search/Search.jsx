import React, { useState } from 'react';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // 🔄 Daten vom Server mit Suchbegriff abrufen
  const { data, isLoading, error } = useFetchAllProductsQuery({
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 100, // mehr Produkte anzeigen
  });

  // 🔍 Produkte anhand des Suchbegriffs filtern
  const filteredProducts = data?.products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <>
      {/* 🔹 Suchbereich */}
      <section className="section__container bg-primary-light text-center">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
          Durchsuchen Sie unsere neuesten Produkte nach Name oder Beschreibung.
        </p>
      </section>

      {/* 🔹 Suchfeld & Ergebnisse */}
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search for products..."
            className="search-bar w-full max-w-4xl p-2 border rounded"
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Product search input"
          />
        </div>

        {/* 🔄 Ladeanzeige */}
        {isLoading && <p className="text-center text-gray-500">Wird geladen...</p>}

        {/* ⚠️ Fehleranzeige */}
        {error && <p className="text-center text-red-500">Fehler beim Laden der Produkte.</p>}

        {/* ✅ Ergebnisse anzeigen */}
        {!isLoading && !error && <ProductCards products={filteredProducts} />}
      </section>
    </>
  );
};

export default Search;
