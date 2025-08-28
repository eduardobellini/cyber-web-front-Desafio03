import React from 'react';
import playstation5Image from './assets/PlayStation.png';

const Hero0004 = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-zinc-900 md:h-screen bg-zinc-100">
      
      <div className="relative mt-10 w-full max-w-md md:mt-0">
        <img
          src={playstation5Image}
          alt="Playstation 5"
          className="mx-auto block h-auto max-h-52 w-auto"
        />
      </div>
      <div className="mt-8 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-normal tracking-tight md:text-6xl">
          Playstation <span className="font-extrabold">5</span>
        </h1>
        <p className="mt-4 max-w-sm text-sm text-zinc-600 md:text-base">
          Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
        </p>
      </div>

    </div>
  );
};

export default Hero0004;