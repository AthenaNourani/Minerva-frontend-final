import React from 'react';
import RatingStars from '../../components/RatingStars';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const ProductCards = ({ products = [] }) => {
  const dispatch = useDispatch();

  // 🛒 Funktion zum Hinzufügen eines Produkts zum Warenkorb
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Verhindert die Weiterleitung beim Klicken auf den Button
    dispatch(addToCart(product));
  };

  // 📌 Falls keine Produkte vorhanden sind, eine Nachricht anzeigen
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">Keine Produkte gefunden.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={product._id || index} className="product__cards">
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              {/* 🖼️ Produktbild mit Hover-Effekt */}
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </Link>

            {/* 🛒 Einkaufswagen-Button */}
            <div className="absolute top-3 right-3 hover:opacity-100 opacity-80 transition-opacity duration-200">
              <button onClick={(e) => handleAddToCart(e, product)}>
                <i className="ri-shopping-basket-2-line bg-primary p-2 text-white hover:bg-primary-dark rounded-full"></i>
              </button>
            </div>
          </div>

          {/* 📝 Produktbeschreibung */}
          <div className="product__card__content p-4">
            <h4 className="font-semibold text-lg">{product.name}</h4>
            <p className="text-gray-700 text-sm mt-1">
              <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <s className="text-gray-400 text-xs ml-2">${product.oldPrice.toFixed(2)}</s>
              )}
            </p>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
