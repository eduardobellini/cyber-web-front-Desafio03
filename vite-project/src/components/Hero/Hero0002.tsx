import React from 'react';
import airpodsMaxImage from './assets/airpodMax_hero.png'; 

const Hero0002 = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-zinc-900 md:h-screen bg-zinc-50">
      <div className="relative mt-8 w-full max-w-sm md:mt-0">
        <img
          src={airpodsMaxImage}
          alt="Apple AirPods Max"
          className="mx-auto block h-auto max-h-72 w-auto"
        />
      </div>
      <div className="mt-8 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-light leading-tight md:text-5xl">
          Apple <span className="font-bold">AirPods Max</span>
        </h1>
        <p className="mt-2 max-w-xs text-sm text-zinc-600 md:text-base">
          Computational audio. Listen, it's powerful
        </p>
      </div>

    </div>
  );
};

export default Hero0002;