import React from 'react';

const RatingStars = ({ rating }) => {
  let stars = [];

  // Schleife für 5 Sterne
  for (let index = 1; index <= 5; index++) {
    stars.push(
      <span key={index} className="text-yellow-500">
        {/* Falls index kleiner oder gleich dem Rating ist, fülle den Stern, sonst nur Umrandung */}
        <i className={`ri-star${index <= rating ? '-fill' : '-line'}`}></i>
      </span>
    );
  }

  return <div className='flex items-center gap-1'>{stars}</div>;
};

export default RatingStars;
