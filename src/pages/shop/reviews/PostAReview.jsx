import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProductsByIdQuery } from '../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';

const PostAReview = ({ isModalOpen, handleClose }) => {
  // 🛒 ID des Produkts aus der URL holen
  const { id } = useParams();
  // 🔑 Benutzerinformationen aus Redux abrufen
  const { user } = useSelector((state) => state.auth);

  // ⭐ Zustand für Bewertung (Sterne)
  const [rating, setRating] = useState(0);
  // 📝 Zustand für Kommentartext
  const [comment, setComment] = useState('');

  // 🔄 Produktinformationen erneut abrufen, um neue Bewertungen anzuzeigen
  const { refetch } = useFetchProductsByIdQuery(id, { skip: !id });

  // 🚀 Mutation zum Absenden einer neuen Bewertung
  const [PostReview, { error, isLoading }] = usePostReviewMutation();

  // 📌 Funktion zum Absenden der Bewertung
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ Validierung: Alle Felder müssen ausgefüllt sein
    if (!comment || !rating || !user?._id || !id) {
      alert('Alle Felder sind erforderlich.');
      return;
    }

    const newReview = {
      comment: comment,
      rating: rating,
      userId: user?._id,
      productId: id,
    };

    try {
      // 🔄 Review absenden
      const response = await PostReview(newReview).unwrap();
      console.log('Review erfolgreich gepostet:', response);

      // 🔄 Formular zurücksetzen
      setComment('');
      setRating(0);

      // 🔄 Produktdaten neu laden, um die neue Bewertung anzuzeigen
      refetch();
    } catch (error) {
      console.error('Fehler beim Posten der Bewertung:', error);
      alert(error?.message || 'Es gab ein Problem beim Absenden der Bewertung.');
    }
    handleClose(); // 🔴 Modal schließen
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? '' : 'hidden'
      }`}
    >
      {/* 📌 Modal-Inhalt */}
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Bewertung abgeben</h2>

        {/* ⭐ Stern-Bewertung */}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className="cursor-pointer text-2xl text-yellow-500"
              aria-label={`Bewertung: ${star} Sterne`}
            >
              {star <= rating ? <i className="ri-star-fill"></i> : <i className="ri-star-line"></i>}
            </span>
          ))}
        </div>

        {/* 📝 Eingabefeld für Kommentar */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 rounded-md mb-4 focus:outline-none px-2"
          placeholder="Schreiben Sie eine Bewertung..."
          aria-label="Bewertungstext eingeben"
        />

        {/* ✅ Buttons für Abbrechen und Absenden */}
        <div className="flex justify-between items-center">
          <button onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded-md">
            Abbrechen
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 bg-primary rounded-md text-white ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Absenden...' : 'Bewertung senden'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
