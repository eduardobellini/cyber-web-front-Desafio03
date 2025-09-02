import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// 1. Correção da Importação: Buscando o tipo do lugar certo.
import { type BrandData } from '../../mocks/data';

const FilterIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

interface ShopControlsProps {
    sortOrder: string;
    onSortOrderChange: (value: string) => void;
    category: string;
    totalProducts: number;
    availableBrands: BrandData[];
}

const sortOptions = [
    { value: 'high-to-low', label: 'By price: High to Low' },
    { value: 'low-to-high', label: 'By price: Low to High' },
];

const SortDropdown: React.FC<Pick<ShopControlsProps, 'sortOrder' | 'onSortOrderChange'>> = ({ sortOrder, onSortOrderChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelectOption = (value: string) => {
        onSortOrderChange(value);
        setIsDropdownOpen(false);
    };

    const selectedLabel = sortOptions.find(opt => opt.value === sortOrder)?.label;

    return (
        <div className="relative h-[56px] w-full md:w-auto md:min-w-[220px]">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="
                    h-full w-full flex items-center justify-between rounded-lg border-[0.5px] border-[#D4D4D4] 
                    bg-white px-4 text-[10px] font-normal leading-4 tracking-tight
                    text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800
                "
            >
                <span>{selectedLabel}</span>
                <ChevronDownIcon />
            </button>

            {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20"> {/* 2. Correção do Z-Index */}
                    {sortOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleSelectOption(option.value)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const ShopControls: React.FC<ShopControlsProps> = ({ sortOrder, onSortOrderChange, category, totalProducts, availableBrands }) => {
    return (
        <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex md:hidden items-center justify-between w-full gap-4">
                <Link 
                    to={`/shop/filters?category=${category}`}
                    state={{ availableBrands: availableBrands }}
                    className="
                        flex items-center justify-between
                        h-[56px] w-full rounded-lg border-[0.5px] border-[#D4D4D4] 
                        bg-white px-4 text-gray-700 text-sm
                    "
                >
                    <span>Filters</span>
                    <FilterIcon />
                </Link>
                <SortDropdown sortOrder={sortOrder} onSortOrderChange={onSortOrderChange} />
            </div>

            <div className="hidden md:flex items-center justify-between w-full">
                <p className="text-gray-700">
                    Selected Products:
                    <span className="font-bold text-black ml-2">{totalProducts}</span>
                </p>
                <SortDropdown sortOrder={sortOrder} onSortOrderChange={onSortOrderChange} />
            </div>
        </div>
    );
};

export default ShopControls;