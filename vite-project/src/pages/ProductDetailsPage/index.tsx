import React from 'react';
import ReviewSummary, { type ReviewSummaryData } from '../../components/ReviewSummary/reviewSummary';
import ReviewList from '../../components/ReviewList/reviewList';
import { type Review } from '../../components/ReviewCard/reviewCard';
import MainInfo from '../../components/MainInfo/mainInfo';

const sampleSummary: ReviewSummaryData = {
  averageRating: 4.8,
  totalReviews: 125,
  ratingCounts: {
    excellent: 100,
    good: 11,
    average: 3,
    belowAverage: 8,
    poor: 1,
  },
};

const sampleReviews: Review[] = [
    { id: 1, name_user: 'Grace Carey', url_image_user: 'https://i.pravatar.cc/56?u=1', message: 'I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase!! ... Highly recommend!!! 🖤', rating: 4.8, created_at: '24 January, 2023' },
    { id: 2, name_user: 'Ronald Richards', url_image_user: 'https://i.pravatar.cc/56?u=2', message: 'This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! (All about the Benjamin’s) So if you want a phone that’s going to last grab an iPhone 14 pro max and get several cords and plugs.', rating: 5, created_at: '24 January, 2023' },
    { id: 3, name_user: 'Darcy King', url_image_user: 'https://i.pravatar.cc/56?u=3', message: 'I might be the only one to say this but the camera is a little funky. Hoping it will change with a software update; otherwise, love this phone! Came in great condition', rating: 3.5, created_at: '24 January, 2023' },
    { id: 4, name_user: 'John Malcolm', url_image_user: 'https://i.pravatar.cc/56?u=4', message: 'It took almost two weeks to ship, but it is still possible. Expecting it to be a True Cortado and you get what you pay for.', rating: 4.1, created_at: '24 January, 2023' },
    { id: 5, name_user: 'Jane Doe', url_image_user: 'https://i.pravatar.cc/56?u=5', message: 'Great product, fast delivery. Would buy again from this seller.', rating: 5, created_at: '24 January, 2023' },
];

const ProductDetailsPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <MainInfo/>
      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

        <ReviewSummary summary={sampleSummary} />

        <ReviewList reviews={sampleReviews} />
      </div>
    </main>
  );
};

export default ProductDetailsPage;