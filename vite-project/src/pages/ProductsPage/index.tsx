// src/pages/ProductsPage/index.tsx

import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';

// 1. Imports corrigidos e padronizados
import ShopControls from '../../components/ShopControls/shopControls';
import FilterSidebar from '../../components/ShopControls/FilterSidebar/filterSideBar';
import Breadcrumb from '../../components/BreadCrumb/breadCrumb';
import ProductGrid from '../../components/ProductGrid/productGrid';
import Pagination from '../../components/Pagination/pagination';
import { mockProducts } from '../../mocks/products';
import { type BrandData } from '../../types'; 

const ProductsPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [sortOrder, setSortOrder] = useState('high-to-low');
  
  const selectedBrands = searchParams.get('brands')?.split(',') || [];
  
  const productsInCategory = useMemo(() => {
    if (category === 'all') return mockProducts;
    return mockProducts.filter(p => p.category === category);
  }, [category]);
  
  const availableBrands = useMemo<BrandData[]>(() => {
    const counts = new Map<string, number>();
    productsInCategory.forEach(p => {
      counts.set(p.brand, (counts.get(p.brand) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([brand, total]) => ({ brand, total }));
  }, [productsInCategory]);

  const filteredProducts = useMemo(() => {
    if (selectedBrands.length === 0) return productsInCategory;
    return productsInCategory.filter(p => selectedBrands.includes(p.brand));
  }, [selectedBrands, productsInCategory]);

  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];
    productsToSort.sort((a, b) => {
      if (sortOrder === 'high-to-low') {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    return productsToSort;
  }, [filteredProducts, sortOrder]);

  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');
  const pageSize = isDesktopOrTablet ? 9 : 8;

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const productsToDisplay = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleBrandChange = (brand: string) => {
    const currentSelected = searchParams.get('brands')?.split(',') || [];
    const newSelected = currentSelected.includes(brand)
      ? currentSelected.filter(b => b !== brand)
      : [...currentSelected, brand];
    
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSelected.length > 0) {
        newSearchParams.set('brands', newSelected.join(','));
    } else {
        newSearchParams.delete('brands');
    }

    newSearchParams.delete('page');
    setSearchParams(newSearchParams);
    setCurrentPage(1); 
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
  }

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
                  availableBrands={availableBrands}
              />
              <div className="mb-4 md:hidden">
                <p className="text-gray-700">
                    Products Result:
                    <span className="font-bold text-black ml-2">{totalProducts}</span>
                </p>
              </div>

              <ProductGrid products={productsToDisplay} />

              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
          </div>
      </div>
    </main>
  );
};

export default ProductsPage;