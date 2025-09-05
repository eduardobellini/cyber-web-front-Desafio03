import React from 'react';
import StarRating from '../StarRating/starRating';
import { type Review } from '../../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formattedDate = new Date(review.created_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div 
      className="
        flex gap-x-4 bg-[#FAFAFA] rounded-[10px] 
        pt-6 pb-6 pr-7 pl-4
      "
    >
      <img 
        src={review.url_image_user || 'https://i.pravatar.cc/56'}
        alt={review.name_user} 
        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-900">{review.name_user}</h4>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>

        <StarRating rating={review.rating} />

        <p className="text-[15px] font-medium leading-6 text-[#7E7E7E]">
          {review.message}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;