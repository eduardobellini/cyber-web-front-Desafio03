import React from 'react';
import macbookAirImage from './assets/MacBookPro14.png'; 

const Hero0005 = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-zinc-900 md:h-screen bg-zinc-400">
      
      <div className="relative mt-8 w-full max-w-2xl md:mt-0">
        <img
          src={macbookAirImage}
          alt="Macbook Air"
          className="mx-auto block h-auto max-h-72 w-auto"
        />
      </div>
      <div className="mt-8 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-normal tracking-tight md:text-6xl">
          Macbook Air
        </h1>
        <p className="mt-4 max-w-sm text-sm text-zinc-600 md:text-base">
          The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
        </p>
      </div>
      <div className="mt-8">
        <button className="rounded-xl border border-zinc-300 px-8 py-3 text-sm font-normal transition-colors duration-200 hover:bg-zinc-200">
          Shop Now
        </button>
      </div>

    </div>
  );
};

export default Hero0005;