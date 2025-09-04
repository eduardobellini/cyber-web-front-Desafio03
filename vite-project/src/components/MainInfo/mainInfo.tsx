import React, { useState } from "react";
import url from "../../Assets/ShopNow2.png";
import ScrenSize from "../../Assets/MainInfo/ScreensizeMainInfo.png";
import cpuIcon from "../../Assets/MainInfo/CpuIcoMainInfo.png";
import coresIcon from "../../Assets/MainInfo/NumberOfCoresMainInfo.png";
import mainCameraIcon from "../../Assets/MainInfo/CameraMainInfo.png";
import frontCameraIcon from "../../Assets/MainInfo/FrontCameraMainInfo.png";
import bateryIcon from "../../Assets/MainInfo/ScreensizeMainInfo.png";
import delivryIcon from "../../Assets/MainInfo/deliveryIconMainInfo.png";
import inStockIcon from "../../Assets/MainInfo/inStockIconMainInfo.png";
import verifyIcon from "../../Assets/MainInfo/verifIconMainInfo.png";

interface Product {
  image: string;
  name: string;
  price: number;
  smartphoneSpecs: boolean;

  discounted?: number;
  screenSize?: any;
  memorie1?: string;
  memorie2?: string;
  memorie3?: string;
  memorie4?: string;
  cpu?: string;
  numberOfCores?: number;
  mainCamera?: string;
  frontCamera?: string;
  batery?: string;
}

const product: Product[] = [
  {
    image: url,
    name: "Apple Ipad 16 pro max",
    price: 1000,
    smartphoneSpecs: true,
    screenSize: '6.7"',
    cpu: "Apple A16 Bionic",
    numberOfCores: 6,
    mainCamera: "48-12 -12 MP",
    frontCamera: "12MP",
    batery: "4323 mAh",
    discounted: 880,
    memorie1: "128GB",
    memorie2: "256GB",
    memorie3: "512GB",
    memorie4: "1TB",
  },
];

const colorOptions = [
  { name: "black", class: "bg-black" },
  { name: "purple", class: "bg-purple-700" },
  { name: "red", class: "bg-red-600" },
  { name: "yellow", class: "bg-yellow-400" },
  { name: "gray", class: "bg-gray-200" },
];

export default function MainInfo() {
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div>
      <div className="lg:flex">
        <div className="flex-col w-full h-auto">
          <div className="lg:flex lg:justify-center lg:items-center">
            <div className="hidden lg:flex flex-col ">
              <img
                src={product[0].image}
                alt="Imagem"
                className="w-[74px] h-[66px]"
              />
              <img
                src={product[0].image}
                alt="Imagem"
                className="w-[74px] h-[66px]"
              />
              <img
                src={product[0].image}
                alt="Imagem"
                className="w-[74px] h-[66px]"
              />
              <img
                src={product[0].image}
                alt="Imagem"
                className="w-[74px] h-[66px]"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src={product[0].image}
                alt="Imagem"
                className="w-[263px] h-[329px] lg:w-[513px] lg:h-[516px]"
              />
            </div>
          </div>
          <div className="flex justify-around ml-7 mr-7 lg:hidden">
            <img
              src={product[0].image}
              alt="Imagem"
              className="w-[74px] h-[66px]"
            />
            <img
              src={product[0].image}
              alt="Imagem"
              className="w-[74px] h-[66px]"
            />
            <img
              src={product[0].image}
              alt="Imagem"
              className="w-[74px] h-[66px]"
            />
            <img
              src={product[0].image}
              alt="Imagem"
              className="w-[74px] h-[66px]"
            />
          </div>
        </div>
        <div className="flex justify-center mt-5 ">
          <div className="w-full h-auto lg:w-[90%]">
            <h1 className=" mr-4 font-bold text-[40px] leading-[40px]">
              {product[0].name}
            </h1>
            <div className="flex mt-5 items-center">
              <h1 className="font-medium text-[32px]">
                ${product[0].discounted}
              </h1>
              <h1 className="text-[24px] font-normal text-zinc-500 ml-4 line-through">
                ${product[0].price}
              </h1>
            </div>
            <div className="flex items-center mt-5">
              <h2 className="text-[15px] font-normal">Select color :</h2>
              <div className="ml-5 flex gap-2">
                {colorOptions.map((color) => (
                  <div
                    key={color.name}
                    className={`w-7 h-7 mr-1 rounded-full cursor-pointer ${
                      color.class
                    } ${
                      selectedColor === color.name
                        ? "border-2 border-blue-500"
                        : "hover:border-2"
                    }`}
                    onClick={() => setSelectedColor(color.name)}
                  ></div>
                ))}
              </div>
            </div>
            {product[0].smartphoneSpecs && (
              <div className="w-full h-auto mt-5">
                <div className="w-full h-[48px]">
                  <div className="flex justify-center">
                    {[
                      product[0].memorie1,
                      product[0].memorie2,
                      product[0].memorie3,
                      product[0].memorie4,
                    ].map(
                      (memorie) =>
                        memorie && (
                          <button
                            key={memorie}
                            className={`w-[79px] h-[48px] border-2 rounded-lg mr-2 lg:w-[122px] ${
                              selectedMemory === memorie
                                ? "border-black text-black"
                                : "border-zinc-300 text-zinc-300"
                            }`}
                            onClick={() => setSelectedMemory(memorie)}
                          >
                            {memorie}
                          </button>
                        )
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex justify-center">
                    <div className="mt-7 grid grid-cols-2 gap-2 lg:grid-cols-3">
                      <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg">
                        <img className="ml-3" src={ScrenSize} alt="" />
                        <div className="ml-3">
                          <h2 className="text-zinc-400 text-[14px] text-nowrap">
                            Screen Size
                          </h2>
                          <h2 className="text-zinc-800">
                            {product[0].screenSize}
                          </h2>
                        </div>
                      </div>
                      <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg">
                        <img className="ml-3" src={cpuIcon} alt="" />
                        <div className="ml-3">
                          <h2 className="text-zinc-400 text-[14px] text-nowrap">
                            CPU
                          </h2>
                          <h2 className="text-zinc-800">{product[0].cpu}</h2>
                        </div>
                      </div>
                      <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg">
                        <img className="ml-3" src={coresIcon} alt="" />
                        <div className="ml-3">
                          <h2 className="text-zinc-400 text-[14px] text-nowrap">
                            Number Of Cores
                          </h2>
                          <h2 className="text-zinc-800">
                            {product[0].numberOfCores}
                          </h2>
                        </div>
                      </div>
                      <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg">
                        <img className="ml-3" src={mainCameraIcon} alt="" />
                        <div className="ml-3">
                          <h2 className="text-zinc-400 text-[14px] text-nowrap">
                            Main Camera
                          </h2>
                          <h2 className="text-zinc-800">
                            {product[0].mainCamera}
                          </h2>
                        </div>
                      </div>
                      <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg">
                        <img className="ml-3" src={frontCameraIcon} alt="" />
                        <div className="ml-3">
                          <h2 className="text-zinc-400 text-[14px] text-nowrap">
                            Front Camera
                          </h2>
                          <h2 className="text-zinc-800">
                            {product[0].frontCamera}
                          </h2>
                        </div>
                      </div>
                      <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg">
                        <img className="ml-3" src={bateryIcon} alt="" />
                        <div className="ml-3">
                          <h2 className="text-zinc-400  text-[14px] text-nowrap">
                            Battery capacity
                          </h2>
                          <h2 className="text-zinc-800">{product[0].batery}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <h2 className="mt-5 text-[14px] text-zinc-600">
              Enhanced capabilities thanks toan enlarged display of 6.7
              inchesand work without rechargingthroughout the day. Incredible
              photosas in weak, yesand in bright lightusing the new systemwith
              two cameras more...
            </h2>
            <div className="mt-7 flex flex-col gap-4">
              <button className="w-full h-[56px] border border-black rounded-lg bg-white text-black text-lg font-medium">
                Add to Wishlist
              </button>
              <button className="w-full h-[56px] rounded-lg bg-black text-white text-lg font-medium">
                Add to Card
              </button>
            </div>
            <div className="w-full h-[122px] mt-7 flex justify-around">
              <div className="w-[92px] h-[120px] flex flex-col justify-center items-center text-center">
                <div className="bg-zinc-200 w-[56PX] h-[56px] rounded-lg flex justify-center items-center">
                  <img
                    className="bg-zinc-200 w-[24PX] h-[24px] rounded-lg"
                    src={delivryIcon}
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-zinc-600 text-[size-14px] text-nowrap">
                    Free Delivery
                  </h2>
                  <h2>1-2 days</h2>
                </div>
              </div>
              <div className="w-[92px] h-[120px] flex flex-col justify-center items-center text-center">
                <div className="bg-zinc-200 w-[56PX] h-[56px] rounded-lg flex justify-center items-center">
                  <img
                    className="bg-zinc-200 w-[24PX] h-[24px] rounded-lg"
                    src={inStockIcon}
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-zinc-600 text-[size-14px] text-nowrap">
                    In Stocky
                  </h2>
                  <h2>Today</h2>
                </div>
              </div>
              <div className="w-[92px] h-[120px] flex flex-col justify-center items-center text-center">
                <div className="bg-zinc-200 w-[56PX] h-[56px] rounded-lg flex justify-center items-center">
                  <img
                    className="bg-zinc-200 w-[24PX] h-[24px] rounded-lg"
                    src={verifyIcon}
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-zinc-600 text-[size-14px] text-nowrap">
                    Guaranteed
                  </h2>
                  <h2>1 year</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
