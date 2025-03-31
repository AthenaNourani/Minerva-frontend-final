import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductsByIdQuery } from '../../redux/features/products/productsApi';
import { addToCart } from '../../redux/features/cart/cartSlice';
import ReviewsCard from './reviews/ReviewsCard';

const SinglePageProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Wenn keine ID vorhanden ist, zeige eine Fehlermeldung
  if (!id) {
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ Produkt-ID fehlt oder ist ungültig.
      </div>
    );
  }

  const { data, isLoading, error } = useFetchProductsByIdQuery(id);
  const singleProduct = data?.product || null;
  const productReviews = data?.reviews || [];

  const handleAddToCart = (product) => {
    if (!product || !product._id) {
      console.error("Ungültige Produktdaten:", product);
      return;
    }
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <div className="text-center text-gray-500 mt-10">🔄 Wird geladen...</div>;
  }

  if (error || !singleProduct) {
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ Fehler beim Laden des Produkts.
      </div>
    );
  }

  return (
    <>
      {/* 🔹 Kopfbereich mit Navigation */}
      <section className="section__container bg-primary-light text-center">
        <h2 className="section__header capitalize">Produktseite</h2>
        <div className="section__subheader space-x-2">
          <span><Link to="/" className="hover:text-primary">Home</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span><Link to="/shop" className="hover:text-primary">Shop</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{singleProduct.name}</span>
        </div>
      </section>

      {/* 🔹 Produktdetails */}
      <section className="section__container mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 🔹 Produktbild */}
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct.image}
              alt={singleProduct.name}
              className="rounded-md w-full h-auto object-cover"
            />
          </div>

          {/* 🔹 Produktinformationen */}
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">{singleProduct.name}</h3>
            <p className="text-primary text-2xl mb-4">
              ${singleProduct.price}
              {singleProduct.oldPrice && (
                <s className="ml-4 text-gray-500">${singleProduct.oldPrice}</s>
              )}
            </p>
            <p className="text-gray-500 mb-4">{singleProduct.description}</p>

            <div className="flex flex-col space-y-2">
              <p><strong>Kategorie:</strong> {singleProduct.category}</p>
              <p><strong>Farbe:</strong> {singleProduct.color}</p>
              <div className="flex gap-1 items-center">
                <strong>Bewertung:</strong>
                <RatingStars rating={singleProduct.rating} />
              </div>
            </div>

            {/* 🔹 Zum Warenkorb hinzufügen */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(singleProduct);
              }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-all duration-300"
            >
              In den Warenkorb
            </button>
          </div>
        </div>
      </section>

      {/* 🔹 Bewertungen anzeigen */}
      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SinglePageProduct;
