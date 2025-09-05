import React, { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { type BrandData } from '../../components/ShopControls/FilterSidebar/filterSideBar';

const BackArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const FilterPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const availableBrands: BrandData[] = location.state?.availableBrands || [];

    const category = searchParams.get('category') || 'all';
    const initialBrands = searchParams.get('brands')?.split(',') || [];
    
    const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
    const [searchTerm, setSearchTerm] = useState('');

    const handleBrandChange = (brandName: string) => {
        setSelectedBrands(prev => 
            prev.includes(brandName) 
            ? prev.filter(b => b !== brandName)
            : [...prev, brandName]
        );
    };

    const applyFilters = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (selectedBrands.length > 0) {
            newSearchParams.set('brands', selectedBrands.join(','));
        } else {
            newSearchParams.delete('brands');
        }
        const categoryPath = category === 'all' ? '' : `/${category}`;
        navigate(`/shop${categoryPath}?${newSearchParams.toString()}`);
    };

    const filteredBrands = availableBrands.filter(brandData =>
        brandData.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center p-4 border-b">
                <button onClick={() => navigate(-1)} className="p-2">
                    <BackArrowIcon />
                </button>
                <h1 className="text-xl font-semibold mx-auto">Filters</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow p-6 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Brand</h2>
                
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
                    className="block w-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-gray-800 focus:border-gray-800 outline-none"
                    placeholder="Search Brand..."
                  />
                </div>
                
                {availableBrands.length > 0 ? (
                    <div className="space-y-4">
                        {filteredBrands.map(brandData => (
                            <label key={brandData.brand} className="flex items-center justify-between cursor-pointer">
                                <div className="flex items-center space-x-3">
                                    <input 
                                        type="checkbox"
                                        checked={selectedBrands.includes(brandData.brand)}
                                        onChange={() => handleBrandChange(brandData.brand)}
                                        className="h-5 w-5 rounded border-gray-300 text-gray-800 focus:ring-offset-gray-800"
                                    />
                                    <span className="text-gray-700 font-medium">{brandData.brand}</span>
                                </div>
                                <span className="text-sm text-gray-500">{brandData.total}</span>
                            </label>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No brands found for this category.</p>
                )}
            </main>

            <footer className="p-4 border-t">
                <button 
                    onClick={applyFilters}
                    className="w-full bg-black text-white font-bold py-4 rounded-lg"
                >
                    Apply
                </button>
            </footer>
        </div>
    );
};

export default FilterPage;