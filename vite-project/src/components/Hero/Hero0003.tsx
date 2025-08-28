import React from 'react';
import visionProImage from './assets/visionPro.png';

const Hero0003 = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-white md:h-screen bg-zinc-900">

      <div className="relative mt-10 w-full max-w-lg md:mt-0">
        <img
          src={visionProImage}
          alt="Apple Vision Pro"
          className="mx-auto block"
        />
      </div>
      <div className="mt-8 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-light leading-tight md:text-5xl">
          Apple Vision <span className="font-bold">Pro</span>
        </h1>
        <p className="mt-2 max-w-xs text-sm font-light text-zinc-400 md:text-base">
          An immersive way to experience entertainment
        </p>
      </div>

    </div>
  );
};

export default Hero0003;