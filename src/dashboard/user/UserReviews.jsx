import React from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsByUserIdQuery } from '../../redux/features/reviews/reviewsApi';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
  // 📌 Holen der Benutzerinformationen aus Redux
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // 📌 Abrufen der Benutzerbewertungen
  const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?._id);

  // 📌 Falls die Daten noch geladen werden, eine Ladeanzeige anzeigen
  if (isLoading) return <p className="text-center text-gray-500 mt-6">Lade Bewertungen...</p>;

  // 📌 Falls ein Fehler auftritt, eine Fehlermeldung anzeigen
  if (error) return <p className="text-center text-red-500 mt-6">Fehler beim Laden der Bewertungen. Bitte später erneut versuchen.</p>;

  // 📌 Falls keine Bewertungen vorhanden sind
  if (!reviews || reviews.length === 0) return <p className="text-center text-gray-500 mt-6">Keine Bewertungen gefunden!</p>;

  // 📌 Navigiert zur Shop-Seite, um eine neue Bewertung hinzuzufügen
  const handleCartClick = () => {
    navigate('/shop');
  };

  return (
    <div className="py-8 px-4">
      {/* 📌 Titel der Seite */}
      <h2 className="text-2xl font-bold mb-4 mt-8 text-center">Deine Bewertungen</h2>

      {/* 📌 Grid-Layout für die Bewertungen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {reviews &&
          reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:scale-105 transition-all duration-200"
            >
              {/* 📌 Bewertungspunktzahl */}
              <p className="text-lg font-semibold mb-2">Bewertung: {review.rating} ⭐</p>

              {/* 📌 Kommentar zur Bewertung */}
              <p className="mb-2">
                <strong>Kommentar:</strong> {review.comment}
              </p>

              {/* 📌 Produkt-ID, falls vorhanden */}
              <p className="text-gray-500 text-sm mb-1">
                <strong>Produkt-ID:</strong> {review.productId || "Nicht verfügbar"}
              </p>

              {/* 📌 Datum der Bewertung */}
              <p className="text-gray-500 text-sm">
                <strong>Erstellt am:</strong> {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        {/* 📌 Button für eine neue Bewertung */}
        <div
          onClick={handleCartClick}
          className="bg-gray-100 text-black flex flex-col items-center justify-center rounded-lg p-6 border border-gray-300 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
        >
          <span className="text-2xl font-bold">+</span>
          <p className="text-sm">Neue Bewertung hinzufügen</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
