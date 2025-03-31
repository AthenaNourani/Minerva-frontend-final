import React, { useState } from 'react';
import RatingStars from '../../../components/RatingStars';
import commentorIcon from '../../../assets/avatar.png';
import { formatDate } from '../../../utils/formatDate';
import PostAReview from './PostAReview';

function ReviewsCard({ productReviews = [] }) {
  // 📌 Sicherstellen, dass `productReviews` ein Array ist
  const reviews = Array.isArray(productReviews) ? productReviews : [];

  // 📝 State für das Öffnen und Schließen des Modals
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="my-6 bg-white p-8 rounded-lg shadow-md">
      {/* 🔹 Abschnitt für vorhandene Bewertungen */}
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium mb-4">Alle Kommentare:</h3>
            <div className="flex flex-col gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="mt-4 p-4 border rounded-md">
                  <div className="flex gap-4 items-center">
                    {/* 🔹 Benutzer-Avatar */}
                    <img
                      className="w-14 h-14 rounded-full"
                      src={commentorIcon}
                      alt="Benutzer Icon"
                    />
                    <div className="space-y-1">
                      {/* 🔹 Benutzername */}
                      <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                        {review?.userId?.username || "Anonym"}
                      </p>

                      {/* 🔹 Erstellungsdatum */}
                      <p className="text-[12px] italic">{formatDate(review?.createdAt)}</p>

                      {/* ⭐ Sternebewertung */}
                      <RatingStars rating={review?.rating} />
                    </div>
                  </div>
                  {/* 📝 Kommentar-Text */}
                  <div className="text-gray-600 mt-5 border p-4 rounded-md bg-gray-100">
                    <p className="md:w-4/5">{review?.comment || "Kein Kommentar abgegeben."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 italic">Noch keine Bewertungen vorhanden.</p>
        )}
      </div>

      {/* ➕ Button zum Hinzufügen einer neuen Bewertung */}
      <div className="mt-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white py-3 px-6 rounded-md shadow-md hover:bg-primary-dark transition duration-300"
          aria-label="Neuen Kommentar hinzufügen"
        >
          <i className="ri-pencil-line mr-2"></i>
          <span>Bewertung schreiben</span>
        </button>
      </div>

      {/* 📌 Modal für die Bewertung */}
      <PostAReview isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default ReviewsCard;
