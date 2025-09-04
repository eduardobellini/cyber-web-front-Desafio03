import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByTag } from '../../services/productService';
import { type Product } from '../../types';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'New Arrival', tag: 'new_arrival' },
  { label: 'Bestseller', tag: 'bestseller' },
  { label: 'Featured Product', tag: 'featured_product' },
];

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

const ProductHome: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTag, setActiveTag] = useState(navLinks[0].tag);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products', activeTag],
    queryFn: () => fetchProductsByTag(activeTag),
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full mt-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="mb-6">
          <nav className="flex gap-6 pl-4 md:pl-10">
            {navLinks.map((link) => (
              <button
                key={link.tag}
                className={`pb-2 font-medium border-b-2 transition-colors ${
                  activeTag === link.tag
                    ? 'border-black text-black'
                    : 'border-transparent text-zinc-400 hover:text-black'
                }`}
                onClick={() => setActiveTag(link.tag)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        
        {isLoading && <div className="text-center p-8">Loading products...</div>}
        {isError && <div className="text-center p-8 text-red-500">Could not fetch products.</div>}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:grid-cols-[repeat(4,minmax(0,200px))] mx-auto w-fit">
          {products && products.map((product: Product) => (
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
              <Link to={`/product/${product.id}`}>
                <button className="bg-black text-white rounded-md px-6 py-2 mt-auto flex justify-center w-full whitespace-nowrap">Buy Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHome;