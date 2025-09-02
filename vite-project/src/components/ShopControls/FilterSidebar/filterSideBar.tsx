import React, { useState } from 'react';
import type { BrandData } from '../../../mocks/data';

const ChevronUpIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

interface FilterSidebarProps {
  brands: BrandData[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ brands, selectedBrands, onBrandChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isBrandSectionOpen, setIsBrandSectionOpen] = useState(true);

  const filteredBrands = brands.filter(brandData =>
    brandData.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside>
        <div>
            <button 
                onClick={() => setIsBrandSectionOpen(!isBrandSectionOpen)}
                className="w-full flex items-center justify-between py-4 border-b border-gray-200"
            >
                <h4 className="font-bold text-xl">Brand</h4>
                <div className={`transition-transform duration-300 ${!isBrandSectionOpen && 'rotate-180'}`}>
                    <ChevronUpIcon />
                </div>
            </button>
            
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isBrandSectionOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className="pb-6 pt-4">
                    <div className="relative w-full mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-red-500 focus:border-red-500 outline-none"
                            placeholder="Search"
                        />
                    </div>
                    
                    <div className="space-y-4">
                    {filteredBrands.map(brandData => (
                        <label key={brandData.brand} className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <input 
                                    type="checkbox"
                                    checked={selectedBrands.includes(brandData.brand)}
                                    onChange={() => onBrandChange(brandData.brand)}
                                    className="h-5 w-5 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
                                />
                                <span className="text-gray-700 text-base">{brandData.brand}</span>
                            </div>
                            <span className="text-sm text-gray-500">{brandData.total}</span>
                        </label>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </aside>
  );
};

export default FilterSidebar;