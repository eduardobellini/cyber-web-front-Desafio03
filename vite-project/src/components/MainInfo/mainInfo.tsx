  import React, { useState } from "react";
  import { type Product } from "../../types";
  import Toast from "../Toast/toast";

  import ScrenSize from "../../Assets/MainInfo/ScreensizeMainInfo.png";
  import cpuIcon from "../../Assets/MainInfo/CpuIcoMainInfo.png";
  import coresIcon from "../../Assets/MainInfo/NumberOfCoresMainInfo.png";
  import mainCameraIcon from "../../Assets/MainInfo/CameraMainInfo.png";
  import frontCameraIcon from "../../Assets/MainInfo/FrontCameraMainInfo.png";
  import bateryIcon from "../../Assets/MainInfo/ScreensizeMainInfo.png";
  import delivryIcon from "../../Assets/MainInfo/deliveryIconMainInfo.png";
  import inStockIcon from "../../Assets/MainInfo/inStockIconMainInfo.png";
  import verifyIcon from "../../Assets/MainInfo/verifIconMainInfo.png";

  interface MainInfoProps {
    product: Product;
  }

  const MainInfo: React.FC<MainInfoProps> = ({ product }) => {
    const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const [galleryThumbnails, setGalleryThumbnails] = useState(
      Array(4).fill(null).map((_, index) => ({
        id: index,
        src: product.image,
      }))
    );

    const [selectedThumbnailId, setSelectedThumbnailId] = useState<number>(0); 

    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      setToastMessage(message);
      setToastType(type);
    };

    const areOptionsSelected = !!selectedColor && !!selectedMemory;

    const handleAddToCart = () => {
      if (areOptionsSelected) {
        showToast("Product added to cart", "success");
      } else {
        showToast("Please select color and storage options", "error");
      }
    };

    const handleAddToWishlist = () => {
      if (areOptionsSelected) {
        showToast("Product added to wishlist", "success");
      } else {
        showToast("Please select color and storage options", "error");
      }
    };

    if (!product) return null;

    React.useEffect(() => {
      if (product.image) {
        setGalleryThumbnails(
          Array(4).fill(null).map((_, index) => ({
            id: index,
            src: product.image,
          }))
        );
        setSelectedThumbnailId(0);
      }
    }, [product.image]);

    if (!product) {
      return null;
    }

    const mainImageToShow = galleryThumbnails[selectedThumbnailId]?.src || product.image;

    return (
      <div>
        {toastMessage && (
          <Toast 
            message={toastMessage} 
            onClose={() => setToastMessage(null)} 
            type={toastType}
          />
        )}
        <div className="flex flex-col lg:flex-row">
          <div className="flex-col w-full h-auto lg:w-1/2">
            <div className="lg:flex lg:justify-center lg:items-center">
              <div className="hidden lg:flex flex-col gap-y-2 mr-4">
                {galleryThumbnails.map((thumb) => (
                  <button
                    key={thumb.id}
                    onClick={() => setSelectedThumbnailId(thumb.id)}
                    className={`w-[74px] h-[66px] p-1 rounded-lg transition-opacity duration-200
                                ${selectedThumbnailId === thumb.id ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
                  >
                    <img src={thumb.src} alt={`Thumbnail ${thumb.id + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
              <div className="flex justify-center items-center flex-grow">
                <img
                  src={mainImageToShow}
                  alt={product.name}
                  className="w-auto h-auto max-h-[329px] lg:max-h-[516px] object-contain"
                />
              </div>
            </div>

            <div className="flex justify-around mt-4 lg:hidden">
              {galleryThumbnails.map((thumb) => (
                  <button
                    key={thumb.id}
                    onClick={() => setSelectedThumbnailId(thumb.id)}
                    className={`w-[74px] h-[66px] p-1 rounded-lg transition-opacity duration-200
                                ${selectedThumbnailId === thumb.id ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
                  >
                    <img src={thumb.src} alt={`Thumbnail ${thumb.id + 1}`} className="w-full h-full object-contain" />
                  </button>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <div className="w-full h-auto lg:w-[90%]">
              <h1 className="font-bold text-[40px] leading-[40px]">
                {product.name}
              </h1>

              <div className="flex mt-5 items-center">
                {product.discounted_price ? (
                  <>
                    <h1 className="font-medium text-[32px]">${Number(product.discounted_price).toFixed(2)}</h1>
                    <h1 className="text-[24px] font-normal text-zinc-500 ml-4 line-through">${Number(product.price).toFixed(2)}</h1>
                  </>
                ) : (
                  <h1 className="font-medium text-[32px]">${Number(product.price).toFixed(2)}</h1>
                )}
              </div>

              <div className="flex items-center mt-5">
                <h2 className="text-[15px] font-normal">Select color :</h2>
                <div className="ml-5 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      style={{ backgroundColor: color.hex_code }}
                      className={`w-7 h-7 rounded-full cursor-pointer transition-all ${
                        selectedColor === color.name ? "ring-2 ring-offset-2 ring-blue-500" : "hover:ring-1 hover:ring-gray-400"
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                    ></button>
                  ))}
                </div>
              </div>

              {product.storageOptions && product.storageOptions.length > 0 && (
                <div className="w-full h-auto mt-5">
                  <div className="flex flex-wrap gap-2">
                    {product.storageOptions.map((option) => (
                      <button
                        key={option.id}
                        className={`h-[48px] px-4 border-2 rounded-lg text-sm transition-colors ${
                          selectedMemory === option.size
                            ? "border-black text-black font-semibold"
                            : "border-zinc-300 text-zinc-500 hover:border-zinc-400"
                        }`}
                        onClick={() => setSelectedMemory(option.size)}
                      >
                        {option.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.smartphoneSpecs && ( 
                <div className="w-full h-auto mt-7">
                  <div>
                    <div className="flex">
                      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                        <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg p-3">
                          <img className="w-6 h-6 mr-3" src={ScrenSize} alt="" />
                          <div>
                            <h2 className="text-zinc-400 text-sm">Screen Size</h2>
                            <h2 className="text-zinc-800 font-semibold">{product.smartphoneSpecs.screen_size}</h2>
                          </div>
                        </div>
                        <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg p-3">
                          <img className="w-6 h-6 mr-3" src={cpuIcon} alt="" />
                          <div>
                            <h2 className="text-zinc-400 text-sm">CPU</h2>
                            <h2 className="text-zinc-800 font-semibold">{product.smartphoneSpecs.cpu}</h2>
                          </div>
                        </div>
                        <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg p-3">
                          <img className="w-6 h-6 mr-3" src={coresIcon} alt="" />
                          <div>
                            <h2 className="text-zinc-400 text-sm">Number Of Cores</h2>
                            <h2 className="text-zinc-800 font-semibold">{product.smartphoneSpecs.total_cores}</h2>
                          </div>
                        </div>
                        <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg p-3">
                          <img className="w-6 h-6 mr-3" src={mainCameraIcon} alt="" />
                          <div>
                            <h2 className="text-zinc-400 text-sm">Main Camera</h2>
                            <h2 className="text-zinc-800 font-semibold">{product.smartphoneSpecs.main_camera}</h2>
                          </div>
                        </div>
                        <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg p-3">
                          <img className="w-6 h-6 mr-3" src={frontCameraIcon} alt="" />
                          <div>
                            <h2 className="text-zinc-400 text-sm">Front Camera</h2>
                            <h2 className="text-zinc-800 font-semibold">{product.smartphoneSpecs.front_camera}</h2>
                          </div>
                        </div>
                        <div className="w-[166px] h-[64px] bg-zinc-100 flex items-center rounded-lg p-3">
                          <img className="w-6 h-6 mr-3" src={bateryIcon} alt="" />
                          <div>
                            <h2 className="text-zinc-400 text-sm">Battery capacity</h2>
                            <h2 className="text-zinc-800 font-semibold">{product.smartphoneSpecs.battery}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <h2 className="mt-5 text-sm text-zinc-600">
                  {product.description}
              </h2>
              
              <div className="mt-7 flex flex-col gap-4">
                <button 
                  onClick={handleAddToWishlist}
                  className="w-full h-[56px] border border-black rounded-lg bg-white text-black text-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Add to Wishlist
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="w-full h-[56px] rounded-lg bg-black text-white text-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
              
              <div className="w-full mt-7 flex flex-wrap justify-around gap-4">
                <div className="w-[92px] flex flex-col items-center text-center">
                  <div className="bg-zinc-200 w-[56px] h-[56px] rounded-lg flex justify-center items-center">
                    <img className="w-[24px] h-[24px]" src={delivryIcon} alt="" />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-zinc-600 text-sm">Free Delivery</h2>
                    <h2 className="text-sm">1-2 days</h2>
                  </div>
                </div>
                <div className="w-[92px] flex flex-col items-center text-center">
                  <div className="bg-zinc-200 w-[56px] h-[56px] rounded-lg flex justify-center items-center">
                    <img className="w-[24px] h-[24px]" src={inStockIcon} alt="" />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-zinc-600 text-sm">In Stock</h2>
                    <h2 className="text-sm">Today</h2>
                  </div>
                </div>
                <div className="w-[92px] flex flex-col items-center text-center">
                  <div className="bg-zinc-200 w-[56px] h-[56px] rounded-lg flex justify-center items-center">
                    <img className="w-[24px] h-[24px]" src={verifyIcon} alt="" />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-zinc-600 text-sm">Guaranteed</h2>
                    <h2 className="text-sm">1 year</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default MainInfo;