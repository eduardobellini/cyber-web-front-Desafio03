import React, { useState } from 'react';
import ReviewCard, { type Review } from '../ReviewCard/reviewCard';

interface ReviewListProps {
  reviews: Review[];
}

const ChevronDownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {

  const [visibleReviews, setVisibleReviews] = useState(3);


  const handleViewMore = () => {
    setVisibleReviews(prev => prev + 1);
  };

  const reviewsToShow = reviews.slice(0, visibleReviews);

  return (
    <div className="mt-12">
      <div className="space-y-8">
        {reviewsToShow.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {visibleReviews < reviews.length && (
        <div className="mt-8">
          <button 
            onClick={handleViewMore}
            className="
              mx-auto flex h-12 w-[216px] items-center justify-center gap-x-2 
              rounded-lg border border-[#545454] py-3 px-14 
              text-sm font-medium text-black
              transition-colors hover:bg-gray-100
            "
          >
            <span className="whitespace-nowrap">View More</span>
            <ChevronDownIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;