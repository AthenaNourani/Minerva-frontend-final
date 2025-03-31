import React, { useState } from 'react';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

// 🔹 Definition der verfügbaren Filteroptionen
const filters = {
    categories: ['all', 'accessories', 'dress', 'jewelry', 'cosmetics'], 
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'green'],
    priceRanges: [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 and above', min: 200, max: Infinity },
    ]
};

const ShopPage = () => {
    // 🔹 Zustand für Filteroptionen
    const [filterState, setFilterState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

    // 🔹 Zustand für Paginierung
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // Produkte pro Seite

    // 🔹 Filterwerte extrahieren
    const { category, color, priceRange } = filterState;
    const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];

    // 🔹 API-Aufruf für Produkte mit Filtern und Paginierung
    const { data: { products = [], totalPages = 1, totalProducts = 0 } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productsPerPage
    });

    // 🔄 Filter zurücksetzen
    const clearFilters = () => {
        setFilterState({
            category: 'all',
            color: 'all',
            priceRange: ''
        });
        setCurrentPage(1);
    };

    // 🔄 Seitenwechsel für Paginierung
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // 🔄 Berechnung der angezeigten Produktnummern
    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    // 🔹 Lade- und Fehlerzustände
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Fehler beim Laden der Produkte.</div>;

    return (
        <>
            {/* 🔹 Kopfbereich der Seite */}
            <section className="section__container bg-primary-light text-center">
                <h2 className="section__header capitalize">Shop Seite</h2>
                <p className="section__subheader">
                    Finde deine Lieblingsprodukte aus unserer aktuellen Kollektion!
                </p>
            </section>

            {/* 🔹 Shop-Bereich mit Filtern und Produktliste */}
            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">
                    
                    {/* 🔹 Filterbereich */}
                    <ShopFiltering filters={filters} filterState={filterState} setFilterState={setFilterState} clearFilters={clearFilters} />

                    {/* 🔹 Produktliste mit Paginierung */}
                    <div className="w-full">
                        <h3 className="text-xl font-medium mb-4">
                            Zeige {startProduct} bis {endProduct} von {totalProducts} Produkten
                        </h3>

                        {/* 🔹 Produktkarten */}
                        <ProductCards products={products} />

                        {/* 🔹 Paginierung */}
                        <div className="mt-6 flex justify-center items-center space-x-2">
                            {/* 🔙 Vorherige Seite */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-900'}`}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {/* 🔢 Seitenzahlen */}
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            {/* ⏩ Nächste Seite */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-900'}`}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;
