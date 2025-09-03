/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Apple iPhone 14 Pro Max',
    price: '$900',
    image: '/images/iphone.png',
  },
  {
    id: 2,
   name: 'Blackmagic Pocket Cinema',
   price: '$2535',
   image: '/images/camera.png',
 },
 {
   id: 3,
   name: 'Apple Watch Series 9 GPS',
   price: '$399',
   image: '/images/watch.png',
 },
 {
   id: 4,
   name: 'AirPods Max Silver',
   price: '$549',
   image: '/images/airpods.png',
 },
 {
  id: 5,
    name: 'Samsung Galaxy Watch6',
    price: '$369',
    image: '/images/galaxywatch.png',
  },
  {
    id: 6,
    name: 'Galaxy Z Fold5 Unlocked',
    price: '$1799',
    image: '/images/fold5.png',
  },
 {
   id: 7,
   name: 'Galaxy Buds FE Graphite',
   price: '$99.99',
   image: '/images/buds.png',
 },
 {
  id: 8,
  name: 'Apple iPad 9 10.2"',
  price: '$398',
  image: '/images/ipad.png',
 },
];

const navLinks = [
 'New Arrival',
 'Bestseller',
 'Featured Product',
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

const ProductGrid = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeNav, setActiveNav] = useState(navLinks[0]);

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
            {navLinks.map((label) => (
              <button
                key={label}
                className={`pb-2 font-medium border-b-2 transition-colors ${
                  activeNav === label
                    ? 'border-black text-black'
                    : 'border-transparent text-zinc-400 hover:text-black'
                }`}
                onClick={() => setActiveNav(label)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:grid-cols-[repeat(4,minmax(0,200px))] mx-auto w-fit">
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

export default ProductGrid;