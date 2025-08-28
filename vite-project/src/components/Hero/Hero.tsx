import React from 'react';
import Iphone_Image from "./assets/Iphone_Hero.png";


const Hero = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-950 p-6 text-white md:justify-center">
      <div className="flex flex-col items-center justify-center pt-20 text-center md:pt-0">
        <h2 className="text-sm font-light text-zinc-400">Pro.Beyond.</h2>
        <h1 className="text-5xl font-bold md:text-7xl">iPhone 14</h1>
        <h1 className="text-5xl font-bold md:text-7xl">Pro</h1>
        <p className="mt-4 max-w-sm text-sm font-light text-zinc-400">
          Created to change everything for the <br /> better. For everyone
        </p>
      </div>
      <div className="mt-8">
        <button className="rounded-xl border border-zinc-700 px-10 py-3 text-sm font-light transition-colors duration-200 hover:bg-zinc-800">
          Shop Now
        </button>
      </div>
      <div className="relative mt-8 w-full max-w-lg overflow-hidden">
        <img
        src={Iphone_Image}
       alt="iPhone 14 Pro"
       className="mx-auto block"
        />
      </div>
    </div>
  );
};

export default Hero;