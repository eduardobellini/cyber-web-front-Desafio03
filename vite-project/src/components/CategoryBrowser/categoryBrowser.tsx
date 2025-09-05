import React from 'react';
import { Link } from 'react-router-dom';
import { type Category } from '../../types';

interface Props {
  categories: Category[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const CategoryBrowser: React.FC<Props> = ({ categories, currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 max-w-[1225px] mx-auto">
          <h2 className="font-medium text-2xl tracking-wide">
            Browse By Category
          </h2>
          <div className="flex items-center gap-x-1"> 
            <button
              onClick={onPrevPage} 
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-200 text-2xl font-bold"
            >
              &lt;
            </button>
            <button
              onClick={onNextPage}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-200 text-2xl font-bold"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1225px] mx-auto">
          {categories.map((category) => (
            <Link to={`/shop/${category.name.toLowerCase().replace(/ /g, '-')}`} key={category.id}>
              <div
                className="
                  flex flex-col items-center justify-center gap-y-2
                  h-[128px] rounded-[15px] border-2 border-transparent 
                  bg-gray-100 transition-all duration-300
                  hover:bg-gray-800 hover:text-white group
                "
              >
                <img 
                  src={category.url_image}
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