import React from 'react';
import { Link } from 'react-router-dom';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  brand: string;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w.org/2000/svg" fill={filled ? "#ef4444" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group relative flex flex-col bg-gray-100 rounded-lg p-4 transition-shadow hover:shadow-xl">
      <button
        onClick={onToggleFavorite}
        className="absolute top-3 right-3 z-10 p-1 rounded-full bg-white bg-opacity-50 group-hover:bg-opacity-100 transition-opacity"
      >
        <HeartIcon filled={isFavorite} />
      </button>
      
      <div className="aspect-square w-full overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain object-center transition-transform group-hover:scale-105"
        />
      </div>
      
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
        {product.description && <p className="mt-1 text-xs text-gray-500">{product.description}</p>}
        
        <div className="flex-grow" />

        <p className="mt-2 text-lg font-bold text-black">${product.price}</p>
        
        <Link to={`/product/${product.id}`} className="mt-4">
            <button className="w-full bg-black text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition-colors">
                Buy Now
            </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;