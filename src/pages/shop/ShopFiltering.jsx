import React from 'react';

const ShopFiltering = ({ filters = { categories: [], colors: [], priceRanges: [] }, filterState, setFilterState, clearFilters }) => {
    
    // 🔄 Funktion zum Ändern der Filterwerte
    const handleFilterChange = (type, value) => {
        setFilterState((prevState) => ({
            ...prevState,
            [type]: value
        }));
    };

    return (
        <div className="space-y-5 flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
            {/* 🏷️ Überschrift */}
            <h3 className="text-xl font-semibold">Filteroptionen</h3>

            {/* 🔎 Kategorie-Filter */}
            <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-lg">Kategorie</h4>
                <hr className="border-gray-300" />
                {filters.categories.map((category) => (
                    <label key={category} className="capitalize cursor-pointer flex items-center gap-2 hover:text-primary transition">
                        <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={filterState.category === category}
                            onChange={() => handleFilterChange("category", category)}
                            className="accent-primary"
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>

            {/* 🎨 Farbfilter */}
            <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-lg">Farben</h4>
                <hr className="border-gray-300" />
                {filters.colors.map((color) => (
                    <label key={color} className="capitalize cursor-pointer flex items-center gap-2 hover:text-primary transition">
                        <input
                            type="radio"
                            name="color"
                            value={color}
                            checked={filterState.color === color}
                            onChange={() => handleFilterChange("color", color)}
                            className="accent-primary"
                        />
                        <span>{color}</span>
                    </label>
                ))}
            </div>

            {/* 💰 Preisfilter */}
            <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-lg">Preisspanne</h4>
                <hr className="border-gray-300" />
                {filters.priceRanges.map((range) => (
                    <label key={range.label} className="capitalize cursor-pointer flex items-center gap-2 hover:text-primary transition">
                        <input
                            type="radio"
                            name="priceRange"
                            value={`${range.min}-${range.max}`}
                            checked={filterState.priceRange === `${range.min}-${range.max}`}
                            onChange={() => handleFilterChange("priceRange", `${range.min}-${range.max}`)}
                            className="accent-primary"
                        />
                        <span>{range.label}</span>
                    </label>
                ))}
            </div>

            {/* 🧹 Alle Filter zurücksetzen */}
            <button onClick={clearFilters} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition">
                Alle Filter zurücksetzen
            </button>
        </div>
    );
};

export default ShopFiltering;
