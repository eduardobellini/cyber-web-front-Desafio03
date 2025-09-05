import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";

import ButtonBlack from "../Buttons/buttonBlack";
import ButtonWhite from "../Buttons/buttonWhite";
import ShopNow1 from "../../Assets/ShopNow1.png";
import ShopNow2 from "../../Assets/ShopNow2.png";
import ShopNow3 from "../../Assets/ShopNow3.png";
import ShopNow4 from "../../Assets/ShopNow4.png";

interface Slides {
  url: string;
  name: string;
  description: string;
}

const slides: Slides[] = [
  {
    url: ShopNow1,
    name: "Popular Products",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
  },
  {
    url: ShopNow2,
    name: "Ipad Pro",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
  },
  {
    url: ShopNow3,
    name: "Samsung Galaxy ",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
  },
  {
    url: ShopNow4,
    name: "Macbook Pro",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
  },
];

export default function ShopNow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlideDot = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="w-full h-[723px] flex justify-center  bg-zinc-100 mt-5 xl:hidden">
        <div className="justify-center text-center gap-[16px] w-[311px] h-[555px] mt-10">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-[321px] h-[331px] bg-cover bg-center duration-300 relative group"
          >
            <div className="hidden group-hover:block absolute translate-y-32 translate-x-0 left-0 cursor-pointer z-10">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className="hidden group-hover:block absolute translate-y-32 translate-x-0 right-0 cursor-pointer z-10">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
          </div>

          <h1 className="font-sans font-light text-[49px] leading-[48px] text-center font-inter w-[311px] ">
            {slides[currentIndex].name}
          </h1>
          <h3 className="font-medium text-[14px] text-zinc-400 mt-5 mb-5">
            {slides[currentIndex].description}
          </h3>
          <Link to="/shop">
            <ButtonBlack name="Shop Now" />
          </Link>
          <div className="flex justify-center mt-10 ">
            {slides.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlideDot(slideIndex)}
                className={`text-2xl cursor-pointer ${
                  currentIndex === slideIndex
                    ? "text-black scale-150"
                    : "text-zinc-400 "
                }`}
              >
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden xl:block w-full h-[640px] mt-10">
        <div className="flex">
          <div className="w-[360px] h-[640px] bg-zinc-100">
            <div className="w-full h-full flex flex-col justify-center items-center">
              
              <div
                style={{ backgroundImage: `url(${slides[0].url})` }}
                className="w-[360px] h-[327px]"
              ></div>
              <div className="w-[226px] h-[206px] mr-20">
                <h1 className="font-light text-[33px] leading-[48px] text-nowrap">
                  {slides[0].name}
                </h1>
                <h3 className="font-medium text-[14px] text-zinc-400 mt-5 mb-5 w-[296px]">
                  {slides[0].description}
                </h3>
                <Link to="/shop/headphones">
                  <ButtonBlack name="Shop Now"/>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-[360px] h-[640px] bg-zinc-200">
            <div className="w-full h-full flex flex-col justify-center items-center">
              
              <div
                style={{ backgroundImage: `url(${slides[1].url})` }}
                className="w-[360px] h-[327px]"
              ></div>
              <div className="w-[226px] h-[206px] mr-20">
                <h1 className="font-light text-[33px] leading-[48px] text-nowrap">
                  {slides[1].name}
                </h1>
                <h3 className="font-medium text-[14px] text-zinc-400 mt-5 mb-5 w-[296px]">
                  {slides[1].description}
                </h3>
                <Link to="/shop/smartphones">
                  <ButtonBlack name="Shop Now"/>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-[360px] h-[640px] bg-zinc-300">
            <div className="w-full h-full flex flex-col justify-center items-center">
              
              <div
                style={{ backgroundImage: `url(${slides[2].url})` }}
                className="w-[360px] h-[327px]"
              ></div>
              <div className="w-[226px] h-[206px] mr-20">
                <h1 className="font-light text-[33px] leading-[48px] text-nowrap">
                  {slides[2].name}
                </h1>
                <h3 className="font-medium text-[14px] text-zinc-400 mt-5 mb-5 w-[296px]">
                  {slides[2].description}
                </h3>
                <Link to="/shop/smartphones">
                  <ButtonBlack name="Shop Now"/>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-[360px] h-[640px] bg-zinc-800">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className=""></div>
              <div
                style={{ backgroundImage: `url(${slides[3].url})` }}
                className="w-[360px] h-[327px]"
              ></div>
              <div className="w-[226px] h-[206px] mr-20">
                <h1 className="font-light text-[33px] leading-[48px] text-nowrap  text-zinc-400">
                  {slides[3].name}
                </h1>
                <h3 className="font-medium text-[14px] text-zinc-400 mt-5 mb-5 w-[296px]">
                  {slides[3].description}
                </h3>
                <Link to="/shop/computers">
                  <ButtonWhite name="Shop Now"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
