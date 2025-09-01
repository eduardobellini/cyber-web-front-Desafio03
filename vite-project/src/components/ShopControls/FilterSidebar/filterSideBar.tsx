// src/components/FilterSidebar/index.tsx

import React from 'react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, brands, selectedBrands, onBrandChange }) => {
  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />
      <aside 
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>
          
          {/* Seção de Marcas */}
          <div>
            <h4 className="font-semibold mb-4">Brand</h4>
            <div className="space-y-3">
              {brands.map(brand => (
                <label key={brand} className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => onBrandChange(brand)}
                    className="h-5 w-5 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
                  />
                  <span className="text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;