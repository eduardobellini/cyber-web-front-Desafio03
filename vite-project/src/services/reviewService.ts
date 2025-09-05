// src/services/reviewService.ts

import { api } from './api';
import { type Review, type ReviewSummaryData, type ReviewsResponse } from '../types';

export const fetchReviewsByProductId = async (productId: string): Promise<ReviewsResponse> => {
  try {
    const response = await api.get(`/reviews/${productId}`);
    
    const summaryFromApi = response.data.summary;
    const formattedSummary: ReviewSummaryData = {
      averageRating: summaryFromApi.media,
      totalReviews: summaryFromApi.reviews,
      ratingCounts: {
        excellent: summaryFromApi.excellent,
        good: summaryFromApi.good,
        average: summaryFromApi.average,
        belowAverage: summaryFromApi.bellow_average,
        poor: summaryFromApi.poor,
      }
    };

    return {
        data: response.data.data,
        summary: formattedSummary,
    };
  } catch (error) {
    console.error(`Failed to fetch reviews for product ${productId}:`, error);
    throw error;
  }
};