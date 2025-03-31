import React, { useState } from 'react';
import ProductCards from './ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const TrendingsProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8); // Standardmäßig 8 Produkte anzeigen

    // 🔹 Daten vom API abrufen
    const { data: { products = [] } = {}, isLoading, error } = useFetchAllProductsQuery({
        category: '', 
        color: '', 
        minPrice: '', 
        maxPrice: '', 
        page: 1, // Nur die erste Seite abrufen
        limit: 20, // Maximale Anzahl an Produkten
    });

    // 🔹 Mehr Produkte laden
    const loadMoreProducts = () => {
        if (visibleProducts < products.length) {
            setVisibleProducts((prevCount) => prevCount + 4);
        }
    };

    return (
        <section className="section__container product__container">
            {/* 🔹 Titel & Beschreibung */}
            <h2 className="section__header">Trendprodukte</h2>
            <p className="section__subheader mb-12">
                Entdecke die angesagtesten Produkte dieser Saison.
            </p>

            {/* 🔹 Ladeanzeige */}
            {isLoading && <p className="text-center text-gray-500">Produkte werden geladen...</p>}

            {/* 🔹 Fehleranzeige */}
            {error && <p className="text-center text-red-500">Fehler beim Laden der Produkte.</p>}

            {/* 🔹 Produktkarten */}
            {!isLoading && !error && (
                <>
                    <div className="mt-12">
                        <ProductCards products={products.slice(0, visibleProducts)} />
                    </div>

                    {/* 🔹 "Mehr laden"-Button nur anzeigen, wenn es noch Produkte gibt */}
                    {visibleProducts < products.length && (
                        <div className="flex justify-center mt-6">
                            <button className="btn" onClick={loadMoreProducts}>
                                Mehr laden
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default TrendingsProducts;
