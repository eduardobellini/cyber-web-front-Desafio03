import React from 'react';
import StarRating from '../StarRating/starRating';
import RatingBar from '../RatingBar/ratingBar';
import { type ReviewSummaryData } from '../../types';

interface ReviewSummaryProps {
  summary: ReviewSummaryData;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ summary }) => {
  if (!summary) {
    return null; 
  }

  const { averageRating = 0, totalReviews = 0, ratingCounts } = summary;
  
  const totalCountedReviews = ratingCounts 
    ? Object.values(ratingCounts).reduce((sum, count) => sum + count, 0) 
    : 0;

  return (
    <div className="font-sans">
      <div className="bg-[#FAFAFA] rounded-[25px] p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:gap-x-16"> 
          <div className="flex flex-col items-center md:items-start md:w-1/3 mb-8 md:mb-0">
            <div className="flex items-baseline gap-x-3">
              <p className="text-[56px] font-medium leading-none">
                {Number(averageRating).toFixed(1)}
              </p>
              <StarRating rating={averageRating} />
            </div>
            <p className="text-[15px] font-medium text-black/30 mt-2">of {totalReviews} reviews</p>
          </div>
          <div className="space-y-6 md:w-2/3">
            {ratingCounts && (
                <>
                    <RatingBar label="Excellent" count={ratingCounts.excellent || 0} total={totalCountedReviews} />
                    <RatingBar label="Good" count={ratingCounts.good || 0} total={totalCountedReviews} />
                    <RatingBar label="Average" count={ratingCounts.average || 0} total={totalCountedReviews} />
                    <RatingBar label="Below Average" count={ratingCounts.belowAverage || 0} total={totalCountedReviews} />
                    <RatingBar label="Poor" count={ratingCounts.poor || 0} total={totalCountedReviews} />
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;