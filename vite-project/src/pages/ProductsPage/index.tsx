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
  
  // O estado das marcas selecionadas continua aqui, lendo da URL
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get('brands')?.split(',') || []
  );

  const availableBrands = mockBrandsByCategory[category] || [];

  // Esta função agora é usada apenas pela sidebar estática
  const handleBrandChange = (brand: string) => {
    const newSelected = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    setSelectedBrands(newSelected);
    // Idealmente, aqui você atualizaria a URL em tempo real para refletir a seleção no desktop
  };
  
  return (
    <main className="container mx-auto px-6 py-8">
      {/* Adicionaremos o Breadcrumb aqui depois */}
      
      {/* Container principal com o layout de Grid para tablet/desktop */}
      <div className="md:grid md:grid-cols-4 md:gap-x-8">

          {/* Coluna 1: Sidebar Estática (escondida no mobile) */}
          <aside className="hidden md:block md:col-span-1">
              <FilterSidebar 
                  brands={availableBrands}
                  selectedBrands={selectedBrands}
                  onBrandChange={handleBrandChange}
              />
          </aside>

          {/* Coluna 2: Conteúdo Principal */}
          <div className="md:col-span-3">
              <ShopControls 
                  sortOrder={sortOrder}
                  onSortOrderChange={setSortOrder}
                  category={category}
              />

              {/* A Grade de Produtos virá aqui */}
              <div className="text-center">
                  <p>Grade de produtos aparecerá aqui...</p>
                  <p className="mt-4 text-sm text-gray-500">Categoria: {category}</p>
                  <p className="text-sm text-gray-500">Marcas selecionadas pela URL: {selectedBrands.join(', ')}</p>
              </div>
          </div>
      </div>
    </main>
  );
};

export default ProductsPage;