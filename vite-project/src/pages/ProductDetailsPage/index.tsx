import React from 'react';
import ReviewSummary, { type ReviewSummaryData } from '../../components/ReviewSummary/reviewSummary';
import ReviewList from '../../components/ReviewList/reviewList';
import { type Review } from '../../components/ReviewCard/reviewCard';

const sampleSummary: ReviewSummaryData = {
  averageRating: 3.4,
  totalReviews: 125,
  ratingCounts: {
    excellent: 10,
    good: 11,
    average: 3,
    belowAverage: 8,
    poor: 1,
  },
};

const sampleReviews: Review[] = [
  { id: 1, name_user: 'Grace Carey', url_image_user: 'https://placehold.co/56x56', message: 'I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase!! ... Highly recommend!!! 🖤', rating: 4.8, created_at: '24 January, 2023' },
  { id: 2, name_user: 'Ronald Richards', url_image_user: 'https://placehold.co/56x56', message: 'This phone has 1T storage and a great camera. No issues so far, and it’s nice to have a C port! Apple is making it easy for people to switch.', rating: 5, created_at: '20 January, 2023' },
  { id: 3, name_user: 'Darcy King', url_image_user: 'https://placehold.co/56x56', message: 'I was the only one to say this but the camera is a little buggy with a software update. Other than that, love the phone!', rating: 3.5, created_at: '15 January, 2023' },
  { id: 4, name_user: 'John Malcolm', url_image_user: 'https://placehold.co/56x56', message: 'It took almost two weeks to ship, but it is still possible. Expecting it to be a True Cortado and you get what you pay for.', rating: 4.1, created_at: '10 January, 2023' },
  { id: 5, name_user: 'Jane Doe', url_image_user: 'https://placehold.co/56x56', message: 'Great product, fast delivery. Would buy again from this seller.', rating: 5, created_at: '05 January, 2023' },
];

const ProductDetailsPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Página de Detalhes do Produto (Teste)</h1>

      <div className="max-w-4xl">
        <ReviewSummary summary={sampleSummary} />

        <ReviewList reviews={sampleReviews} />
      </div>
    </main>
  );
};

export default ProductDetailsPage;