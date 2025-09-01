import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ShopControls from '../../components/ShopControls/shopControls';
import FilterSidebar from '../../components/ShopControls/FilterSidebar/filterSideBar';
import Breadcrumb from '../../components/BreadCrumb/breadCrumb';
import { mockBrandsByCategory } from '../../mocks/data';

const ProductsPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [sortOrder, setSortOrder] = useState('high-to-low');
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get('brands')?.split(',') || []
  );

  const availableBrands = mockBrandsByCategory[category] || [];

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

  const totalProducts = useMemo(() => {
    const brandsToConsider = selectedBrands.length > 0 
      ? availableBrands.filter(brandData => selectedBrands.includes(brandData.brand))
      : availableBrands;

    return brandsToConsider.reduce((sum, currentBrand) => sum + currentBrand.total, 0);
  }, [availableBrands, selectedBrands]);
  
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

              <div className="text-center">
                  <p>Grade de produtos aparecerá aqui...</p>
              </div>
          </div>
      </div>
    </main>
  );
};

export default ProductsPage;