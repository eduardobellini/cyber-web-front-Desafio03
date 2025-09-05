import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../../types/index';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill={filled ? "#EF4444" : "none"} 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke={filled ? "#EF4444" : "#9CA3AF"}
      className="w-6 h-6 transition-colors"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      className="
        relative flex flex-col items-center 
        h-[432px] w-full max-w-[266px] 
        bg-[#F6F6F6] rounded-[9px] 
        pt-6 px-4 pb-6
      "
    >
      <button
        onClick={onToggleFavorite}
        className="absolute top-4 right-4 z-10"
      >
        <HeartIcon filled={isFavorite} />
      </button>

      <div className="w-full aspect-square max-w-[160px] max-h-[160px] flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain object-center"
        />
      </div>

      <div className="flex flex-col items-center flex-grow w-full">

        <h3 className="text-base font-medium text-center text-black leading-6 h-[48px]">
            {product.name}
        </h3>

        <div className="flex-grow" /> 

        <p className="text-2xl font-semibold text-center text-black leading-6 tracking-[.03em] mb-4">
            ${product.price}
        </p>

        <Link to={`/product/${product.id}`} className="w-full flex justify-center">
            <button 
                className="
                    h-12 w-[188px] bg-black text-white rounded-lg
                    text-sm font-medium leading-6
                "
            >
                Buy Now
            </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;