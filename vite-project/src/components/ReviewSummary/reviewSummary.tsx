// src/components/ReviewSummary/index.tsx

import React from 'react';
import StarRating from '../StarRating/starRating';
import RatingBar from '../RatingBar/ratingBar';

export interface ReviewSummaryData {
  averageRating: number;
  totalReviews: number;
  ratingCounts: {
    excellent: number;
    good: number;
    average: number;
    belowAverage: number;
    poor: number;
  };
}

interface ReviewSummaryProps {
  summary: ReviewSummaryData;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ summary }) => {
  const { averageRating, totalReviews, ratingCounts } = summary;
  
  const totalCountedReviews = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="font-sans">
      <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

      <div className="bg-[#FAFAFA] rounded-[25px] p-8 mb-8">

        <div>
          <div className="flex items-baseline gap-x-16">
            <p className="text-[56px] font-medium leading-none">{averageRating.toFixed(1)}</p>
            <StarRating rating={averageRating} />
          </div>

          <p className="text-[15px] font-medium text-black/30 mt-2">of {totalReviews} reviews</p>
        </div>
      </div>

      <div className="space-y-6">
        <RatingBar label="Excellent" count={ratingCounts.excellent} total={totalCountedReviews} />
        <RatingBar label="Good" count={ratingCounts.good} total={totalCountedReviews} />
        <RatingBar label="Average" count={ratingCounts.average} total={totalCountedReviews} />
        <RatingBar label="Below Average" count={ratingCounts.belowAverage} total={totalCountedReviews} />
        <RatingBar label="Poor" count={ratingCounts.poor} total={totalCountedReviews} />
      </div>
    </div>
  );
};

export default ReviewSummary;