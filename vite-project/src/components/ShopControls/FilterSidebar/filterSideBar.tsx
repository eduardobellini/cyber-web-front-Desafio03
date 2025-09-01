import React from 'react';
import type { BrandData } from '../../../mocks/data';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  brands: BrandData[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, brands, selectedBrands, onBrandChange }) => {
  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />
      <aside 
        className={`
          fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:w-full md:h-auto md:translate-x-0 md:bg-transparent md:z-auto md:border-r md:pr-4
        `}
      >
        <div className="p-6 md:p-0">
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Brand</h4>
            <div className="space-y-3">
              {brands.map(brandData => (
                <label key={brandData.brand} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                        <input 
                            type="checkbox"
                            checked={selectedBrands.includes(brandData.brand)}
                            onChange={() => onBrandChange(brandData.brand)}
                            className="h-5 w-5 rounded border-gray-300 text-red-500 focus:ring-red-500"
                        />
                        <span className="text-gray-700">{brandData.brand}</span>
                    </div>
                    <span className="text-sm text-gray-500">{brandData.total}</span>
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