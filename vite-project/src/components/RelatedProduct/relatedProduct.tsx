import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../../types';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: number;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? "#ec4899" : "none"}
    viewBox="0 0 24 24"
    stroke={filled ? "#ec4899" : "currentColor"}
    className="w-6 h-6 transition-colors"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, currentProductId }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const relatedProductsToShow = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  return (
    <div className="w-full mt-24 mb-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h1 className="text-2xl font-bold mb-6">Related Products</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-fit mx-auto">
          {relatedProductsToShow.map((product) => (
            <div
              key={product.id}
              className="flex flex-col h-[340px] bg-zinc-200 bg-opacity-60 rounded-md shadow-md p-6 relative"
            >
              <button
                className="absolute top-4 right-4 bg-transparent border-none outline-none"
                onClick={() => toggleFavorite(product.id)}
              >
                <HeartIcon filled={favorites.includes(product.id)} />
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-contain mb-4 mx-auto"
              />
              <div className="flex flex-col items-center text-center mt-4 flex-grow">
                <h2 className="text-base font-semibold mb-2">{product.name}</h2>
                <div className='flex-grow'></div>
                <span className="text-xl font-bold">${product.price}</span>
              </div>
              <Link to={`/product/${product.id}`} className="mt-auto w-full">
                <button className="bg-black text-white rounded-md px-6 py-2 flex justify-center w-full whitespace-nowrap">
                  Buy Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;