// src/pages/ProductsPage/index.tsx

import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ShopControls from '../../components/ShopControls/shopControls';
import FilterSidebar from '../../components/ShopControls/FilterSidebar/filterSideBar';
import Breadcrumb from '../../components/BreadCrumb/breadCrumb';
import ProductGrid from '../../components/ProductGrid/productGrid';
import Pagination from '../../components/Pagination/pagination';
import { mockBrandsByCategory } from '../../mocks/data';
import { mockProducts } from '../../mocks/products';

const ProductsPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('high-to-low');
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get('brands')?.split(',') || []
  );
  
  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');
  const pageSize = isDesktopOrTablet ? 9 : 8;

  const availableBrands = mockBrandsByCategory[category] || [];

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(p => {
        if (selectedBrands.length === 0) return true;
        return selectedBrands.includes(p.brand);
    });
  }, [selectedBrands]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const productsToDisplay = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleBrandChange = (brand: string) => {
    const newSelected = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    setSelectedBrands(newSelected);
    
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSelected.length > 0) {
        newSearchParams.set('brands', newSelected.join(','));
    } else {
        newSearchParams.delete('brands');
    }
    setSearchParams(newSearchParams);
  };
  
  return (
    <main className="container mx-auto px-6 py-8">
      <Breadcrumb />
      
      <div className="md:grid md:grid-cols-4 md:gap-x-8">
          <aside className="hidden md:block md:col-span-1">
              <FilterSidebar 
                  brands={availableBrands}
                  selectedBrands={selectedBrands}
                  onBrandChange={handleBrandChange}
              />
          </aside>

          <div className="md:col-span-3">
              <ShopControls 
                  sortOrder={sortOrder}
                  onSortOrderChange={setSortOrder}
                  category={category}
                  totalProducts={totalProducts}
              />

              <ProductGrid products={productsToDisplay} />

              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => setCurrentPage(page)}
              />
          </div>
      </div>
    </main>
  );
};

export default ProductsPage;