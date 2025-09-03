import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Apple iPhone 14 Pro 512GB Gold (MQ233)',
    price: '$1437',
    image: '/images/iphone-gold.png',
  },
  {
    id: 2,
    name: 'AirPods Max Silver Starlight Aluminium',
    price: '$549',
    image: '/images/airpods-starlight.png',
  },
  {
    id: 3,
    name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium',
    price: '$399',
    image: '/images/watch-starlight.png',
  },
  {
    id: 4,
    name: 'Apple iPhone 14 Pro 1TB Gold (MQ2V3)',
    price: '$1499',
    image: '/images/iphone-1tb-gold.png',
  },
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

const DiscountProduct = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full mt-24 mb-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h1 className="text-2xl font-bold mb-6 ml-44">Discounts up to -50%</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-fit mx-auto lg:grid-cols-[repeat(4,minmax(0,200px))]">
          {products.map((product) => (
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
              <div className="flex-1 flex flex-col items-center text-center mt-4">
                <h2 className="text-base font-semibold mb-2">{product.name}</h2>
                <span className="text-xl font-bold">{product.price}</span>
              </div>
              <button className="bg-black text-white rounded-md px-6 py-2 mt-auto flex justify-center w-full whitespace-nowrap">Buy Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountProduct;