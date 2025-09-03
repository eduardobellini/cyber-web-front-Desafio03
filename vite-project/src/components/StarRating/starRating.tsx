import React from 'react';

const FullStar = () => (
  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

const HalfStar = () => (
  <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z" fill="currentColor" />
  </svg>
);

const EmptyStar = () => ( 
    <svg className="w-6 h-6 text-yellow-400" fill="white" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1">
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );


interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FullStar key={i} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<HalfStar key={i} />);
    } else {
      stars.push(<EmptyStar key={i} />);
    }
  }
  
  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;