// src/pages/ProductsPage/index.tsx
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ShopControls from '../../components/ShopControls/shopControls';
import FilterSidebar from '../../components/ShopControls/FilterSidebar/filterSideBar';
import { mockBrandsByCategory } from '../../mocks/data';

const ProductsPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  
  const [sortOrder, setSortOrder] = useState('high-to-low');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get('brands')?.split(',') || []
  );

  const availableBrands = mockBrandsByCategory[category] || [];

  console.log('[ProductsPage] Categoria atual:', category);

  const handleBrandChange = (brand: string) => {
    const newSelected = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    setSelectedBrands(newSelected);
  };
  
  return (
    <>
      <div className="md:hidden">
        <FilterSidebar 
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            brands={availableBrands}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
        />
      </div>

      <main className="container mx-auto px-6 py-8">
        <div className="md:grid md:grid-cols-4 md:gap-x-8">
            <aside className="hidden md:block md:col-span-1">
                <FilterSidebar 
                    isOpen={true} 
                    onClose={() => {}} 
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
                />

                <div className="text-center">
                    <p>Grade de produtos aparecerá aqui...</p>
                    <p className="mt-4 text-sm text-gray-500">Categoria: {category}</p>
                    <p className="text-sm text-gray-500">Marcas selecionadas pela URL: {selectedBrands.join(', ')}</p>
                </div>
            </div>
        </div>
      </main>
    </>
  );
};

export default ProductsPage;