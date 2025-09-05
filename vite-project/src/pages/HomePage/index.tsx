import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCategories } from '../../services/categoryService';

import CategoryBrowser from '../../components/CategoryBrowser/categoryBrowser';
import BottomBanner from '../../components/BottomBanner/bottomBanner';
import FullHero from '../../components/Hero/FullHero';
import ProductHome from '../../components/Products_Home/Products_Home';
import DiscountProduct from '../../components/DiscountProducts/DiscountProducts';
import ShopNow from '../../components/ShopNow/shopNow';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categoriesResponse, isLoading, isError } = useQuery({
    queryKey: ['categories', currentPage], 
    queryFn: () => fetchCategories(currentPage),
    placeholderData: keepPreviousData, 
  });

  const handleNextPage = () => {
    if (categoriesResponse && categoriesResponse.metadata.current_page < categoriesResponse.metadata.total_pages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <FullHero />

      {isLoading && <div className="text-center p-8">Loading Categories...</div>}
      {isError && <div className="text-center p-8 text-red-500">Failed to load categories.</div>}
      
      {categoriesResponse && (
        <CategoryBrowser 
          categories={categoriesResponse.data}
          currentPage={categoriesResponse.metadata.current_page}
          totalPages={categoriesResponse.metadata.total_pages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      )}

      <ProductHome />

      <ShopNow />
      <DiscountProduct />
      <BottomBanner />
    </>
  );
};

export default HomePage;