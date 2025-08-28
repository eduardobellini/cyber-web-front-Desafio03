import React from 'react';

import iphoneImage from './assets/Iphone_Hero.png';
import playstation5Image from './assets/PlayStation.png';
import macbookAirImage from './assets/MacBookPro14.png';
import airpodsMaxImage from './assets/airpodMax_hero.png';
import visionProImage from './assets/image 36.png';

const FullHero = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-start bg-zinc-900 p-6 text-white md:min-h-[600px] md:flex-row md:justify-between md:py-0 md:pl-12 md:relative md:overflow-hidden"> 
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:pr-12 md:pb-24 md:z-10">
          <h2 className="text-sm font-light text-zinc-400">Pro.Beyond.</h2>
          <h1 className="text-5xl font-bold md:text-7xl">iPhone 14</h1>
          <h1 className="text-5xl font-bold md:text-7xl">Pro</h1>
          <p className="mt-4 max-w-sm text-sm font-light text-zinc-400">
            Created to change everything for the better. For everyone
          </p>
          <div className="mt-8">
            <button className="rounded-xl border border-zinc-700 px-10 py-3 text-sm font-light transition-colors duration-200 hover:bg-zinc-800">
              Shop Now
            </button>
          </div>
        </div>
        <div className="relative mt-8 md:mt-0 md:h-full md:w-full md:absolute md:right-0 md:bottom-0 md:flex md:items-end md:justify-end md:pr-10"> 
          <img
            src={iphoneImage}
            alt="iPhone 14 Pro"
            className="w-full h-auto object-contain md:max-h-[600px] md:w-auto"
          />
        </div>
      </div>
      <div className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:h-[600px]">
        <div className="flex flex-col items-center justify-center p-6 bg-zinc-100 text-zinc-900 md:col-span-2 md:row-span-2">
          <div className="relative w-full max-w-md">
            <img src={playstation5Image} alt="Playstation 5" className="mx-auto block h-auto max-h-52 w-auto" />
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-4xl font-normal tracking-tight md:text-6xl">Playstation <span className="font-extrabold">5</span></h1>
            <p className="mt-4 max-w-sm text-base text-zinc-600">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-zinc-100 text-zinc-900 md:col-span-2 md:row-span-2">
          <div className="relative w-full max-w-lg">
            <img src={macbookAirImage} alt="Macbook Air" className="mx-auto block" />
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-4xl font-normal tracking-tight md:text-6xl">Macbook Air</h1>
            <p className="mt-4 max-w-sm text-base text-zinc-600">
              The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
            </p>
            <div className="mt-8">
              <button className="rounded-xl border border-zinc-300 px-10 py-3 text-sm font-normal transition-colors duration-200 hover:bg-zinc-200">Shop Now</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-zinc-100 text-zinc-900 md:col-span-1 md:row-span-1">
          <div className="relative w-full max-w-xs">
            <img src={airpodsMaxImage} alt="Apple AirPods Max" className="mx-auto block" />
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-3xl font-light leading-tight">Apple <span className="font-bold">AirPods Max</span></h1>
            <p className="mt-2 text-sm text-zinc-600">Computational audio. Listen, it's powerful</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-zinc-800 text-white md:col-span-1 md:row-span-1">
          <div className="relative w-full max-w-lg">
            <img src={visionProImage} alt="Apple Vision Pro" className="mx-auto block" />
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-3xl font-light leading-tight">Apple Vision <span className="font-bold">Pro</span></h1>
            <p className="mt-2 text-sm font-light text-zinc-400">An immersive way to experience entertainment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullHero;