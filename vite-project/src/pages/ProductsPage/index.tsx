import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para pegar a categoria da URL
import ShopControls from '../../components/ShopControls/shopControls';
import FilterSidebar from '../../components/ShopControls/FilterSidebar/filterSidebar';

const mockBrandsByCategory: { [key: string]: string[] } = {
  'phones': ['Apple', 'Samsung', 'Xiaomi', 'Google'],
  'computers': ['Apple', 'Dell', 'HP', 'Lenovo'],
  'gaming': ['Razer', 'Logitech', 'Corsair'],
  'all': ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Dell', 'HP', 'Lenovo', 'Razer', 'Logitech', 'Corsair']
};

const ProductsPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category?: string }>();
  
  const [sortOrder, setSortOrder] = useState('high-to-low');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const availableBrands = mockBrandsByCategory[category] || [];

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  return (
    <>
      <FilterSidebar 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        brands={availableBrands}
        selectedBrands={selectedBrands}
        onBrandChange={handleBrandChange}
      />
      <main className="container mx-auto px-6 py-8">
        <ShopControls 
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onFiltersClick={() => setIsFilterOpen(true)}
        />
        <div className="text-center">
          <p>Grade de produtos aparecerá aqui...</p>
          <p className="mt-4 text-sm text-gray-500">Categoria: {category}</p>
          <p className="text-sm text-gray-500">Marcas selecionadas: {selectedBrands.join(', ')}</p>
        </div>
      </main>
    </>
  );
};

export default ProductsPage;