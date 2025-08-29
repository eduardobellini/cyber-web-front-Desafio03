// src/components/CategoryBrowser/index.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Definindo os tipos de dados
interface Category {
  name: string;
  slug: string;
  iconUrl: string;
}

interface Props {
  categories: Category[];
}

const ArrowLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
const ArrowRightIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

const CategoryBrowser: React.FC<Props> = ({ categories }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const totalPages = Math.ceil(categories.length / pageSize);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCategories = categories.slice(startIndex, endIndex);

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 max-w-[1225px] mx-auto">
          <h2 className="font-medium text-2xl tracking-wide">
            Browse By Category
          </h2>
          <div className="flex items-center gap-x-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="p-1 rounded-full transition-colors disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-200"
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1 || totalPages <= 1}
              className="p-1 rounded-full transition-colors disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-200"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1225px] mx-auto">
          {currentCategories.map((category) => (
            <Link to={`/shop/${category.slug}`} key={category.slug}>
              <div
                className="
                  flex flex-col items-center justify-center gap-y-2
                  h-[128px] rounded-[15px] border-2 border-transparent 
                  bg-gray-100 transition-all duration-300
                  hover:bg-gray-800 hover:text-white group
                "
              >
                <img 
                    src={category.iconUrl} 
                    alt={`${category.name} icon`} 
                    className="w-12 h-12 object-contain"
                />
                <h3 className="font-medium text-base group-hover:text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBrowser;