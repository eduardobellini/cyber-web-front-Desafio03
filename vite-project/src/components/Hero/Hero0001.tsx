import React from 'react';
import iphoneImage from './assets/Iphone_Hero.png'; 

const Hero0001 = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-white md:h-screen bg-zinc-950">
      
      <div className="flex flex-col items-center justify-center pt-10 text-center md:pt-0">
        <h2 className="text-sm font-light text-zinc-400">Pro.Beyond.</h2>
        <h1 className="text-5xl font-bold md:text-7xl">iPhone 14</h1>
        <h1 className="text-5xl font-bold md:text-7xl">Pro</h1>
        <p className="mt-4 max-w-sm text-sm font-light text-zinc-400">
          Created to change everything for the better. For everyone
        </p>
      </div>
      <div className="mt-8">
        <button className="rounded-xl border border-zinc-700 px-8 py-3 text-sm font-light transition-colors duration-200 hover:bg-zinc-800">
          Shop Now
        </button>
      </div>
      <div className="relative mt-8 w-full max-w-lg overflow-hidden">
        <img
          src={iphoneImage}
          alt="iPhone 14 Pro"
          className="mx-auto block"
        />
      </div>

    </div>
  );
};

export default Hero0001;

