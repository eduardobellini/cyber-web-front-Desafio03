import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../../services/productService';
import Breadcrumb from '../../components/BreadCrumb/breadCrumb';
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
    { id: 1, name_user: 'Grace Carey', url_image_user: 'https://i.pravatar.cc/56?u=1', message: 'I was a bit nervous...', rating: 4.8, created_at: '24 January, 2023' },
    // ...
];

const ProductDetailsPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId!),
        enabled: !!productId, 
    });

    const breadcrumbPaths = product ? [
        { name: 'Shop', path: '/shop' },
        { name: product.category.name, path: `/shop/${product.category.name.toLowerCase().replace(/ /g, '-')}` },
        { name: product.brand, path: `/shop?brands=${product.brand}` },
        { name: product.name, path: `/product/${product.id}` }
    ] : [];

    if (isLoading) return <div className="text-center p-12">Loading product...</div>;
    if (isError) return <div className="text-center p-12 text-red-500">Error: {(error as Error).message}</div>;

    return (
        <main className="container mx-auto px-6 py-12">
            <Breadcrumb customPaths={breadcrumbPaths} />

            {product && <MainInfo product={product} />}

            <div className="max-w-4xl mx-auto mt-12">
                <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
                <ReviewSummary summary={sampleSummary} />
                <ReviewList reviews={sampleReviews} />
            </div>
        </main>
    );
};

export default ProductDetailsPage;