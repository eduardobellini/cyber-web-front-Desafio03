import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { fetchProducts } from '../../services/productService';
import { fetchBrandsByCategory } from '../../services/brandService';
import ShopControls from '../../components/ShopControls/shopControls';
import FilterSidebar from '../../components/ShopControls/FilterSidebar/filterSideBar';
import Breadcrumb from '../../components/BreadCrumb/breadCrumb';
import ProductGrid from '../../components/ProductGrid/productGrid';
import Pagination from '../../components/Pagination/pagination';

const ProductsPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOrder = searchParams.get('sort') || 'high-to-low';
  const selectedBrands = searchParams.get('brands')?.split(',') || [];
  const currentPage = Number(searchParams.get('page')) || 1;
  
  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');
  const pageSize = isDesktopOrTablet ? 9 : 8;

  const { data: productsResponse, isLoading: isLoadingProducts, isError: isErrorProducts } = useQuery({
    queryKey: ['products', category, selectedBrands, sortOrder, currentPage, pageSize],
    queryFn: () => fetchProducts(category, selectedBrands, sortOrder, currentPage, pageSize),
    placeholderData: keepPreviousData,
  });

  const { data: availableBrands, isLoading: isLoadingBrands } = useQuery({
    queryKey: ['brands', category],
    queryFn: () => fetchBrandsByCategory(category),
  });

  const productsToDisplay = productsResponse?.data || [];
  const totalProducts = productsResponse?.metadata.total_items || 0;
  const totalPages = productsResponse?.metadata.total_pages || 0;

  const handleBrandChange = (brand: string) => {
    const newSelected = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSelected.length > 0) {
        newSearchParams.set('brands', newSelected.join(','));
    } else {
        newSearchParams.delete('brands');
    }
    newSearchParams.delete('page');
    setSearchParams(newSearchParams);
  };
  
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
  };
  
  const handleSortOrderChange = (newSortOrder: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', newSortOrder);
    setSearchParams(newSearchParams);
  }

  return (
    <main className="container mx-auto px-6 py-8">
      <Breadcrumb />
      <div className="md:grid md:grid-cols-4 md:gap-x-8">
          <aside className="hidden md:block md:col-span-1">
              <FilterSidebar 
                  brands={isLoadingBrands ? [] : availableBrands || []}
                  selectedBrands={selectedBrands}
                  onBrandChange={handleBrandChange}
              />
          </aside>
          <div className="md:col-span-3">
              <ShopControls 
                  sortOrder={sortOrder}
                  onSortOrderChange={handleSortOrderChange}
                  category={category}
                  totalProducts={totalProducts}
                  availableBrands={availableBrands || []}
              />
              <div className="mb-4 md:hidden">
                <p className="text-gray-700">
                    Products Result:
                    <span className="font-bold text-black ml-2">{totalProducts}</span>
                </p>
              </div>
              
              {isLoadingProducts && <div className="text-center py-20">Loading products...</div>}
              {isErrorProducts && <div className="text-center py-20 text-red-500">Failed to load products.</div>}
              
              {!isLoadingProducts && !isErrorProducts && productsToDisplay.length > 0 && (
                <>
                  <ProductGrid products={productsToDisplay} />
                  <div className="flex justify-center">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}

              {!isLoadingProducts && !isErrorProducts && productsToDisplay.length === 0 && (
                <div className="text-center py-20 text-gray-500">No products found.</div>
              )}
          </div>
      </div>
    </main>
  );
};

export default ProductsPage;