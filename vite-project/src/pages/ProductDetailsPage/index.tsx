import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../../services/productService';
import { fetchReviewsByProductId } from '../../services/reviewService';
import { fetchRelatedProducts } from '../../services/productService';
import Breadcrumb from '../../components/BreadCrumb/breadCrumb';
import ReviewSummary from '../../components/ReviewSummary/reviewSummary';
import ReviewList from '../../components/ReviewList/reviewList';
import MainInfo from '../../components/MainInfo/mainInfo';
import RelatedProducts from '../../components/RelatedProduct/relatedProduct';


const ProductDetailsPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId!),
        enabled: !!productId, 
    });
    
    const { data: reviewsResponse, isLoading: isLoadingReviews, isError: isErrorReviews } = useQuery({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviewsByProductId(productId!),
        enabled: !!productId,
    });
    const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery({
        queryKey: ['relatedProducts', product?.brand],
        queryFn: () => fetchRelatedProducts(product!.brand),
        enabled: !!product, 
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

                {isLoadingReviews && <div className="text-center p-8">Loading reviews...</div>}
                {isErrorReviews && <div className="text-center p-8 text-red-500">Could not load reviews.</div>}
                
                {reviewsResponse && (
                    <>
                        <ReviewSummary summary={reviewsResponse.summary} />
                        <ReviewList reviews={reviewsResponse.data} />
                    </>
                )}
            </div>
            
            {isLoadingRelated && <div className="text-center p-8">Loading related products...</div>}
            {relatedProducts && product && (
                <RelatedProducts products={relatedProducts} currentProductId={product.id} />
            )}
        </main>
    );
};

export default ProductDetailsPage;