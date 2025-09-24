import ButtonWhite from "../Buttons/buttonWhite"; 
import { Link } from "react-router-dom";

export default function BottomBanner() {
  return (
    <div className="w-full h-full bg-black flex justify-center">
      <div className="hidden md:flex  bg-[url('Assets/BottomBannerIMGDesktop.png')] h-[28rem] w-[90rem]  bg-cover bg-center  justify-center text-center  flex-col items-center">
        <h1 className="font-thin text-4xl text-white mb-5">Big Summer</h1>
        <h1 className=" text-4xl text-white mb-3 font-medium">Sale</h1>
        <h3 className="text-zinc-500 mb-8">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </h3>
        <Link to="/shop">
          <ButtonWhite name="Shop Now" />
        </Link>
      </div>
      <div className="bg-[url('Assets/BottomBannerIMG.png')] bg-cover bg-center h-[32rem]  w-[23.4rem] justify-center text-center flex flex-col  items-center md:hidden">
        <h1 className="font-thin text-4xl text-white mb-5">Big Summer</h1>
        <h1 className=" text-4xl text-white mb-3 font-medium">Sale</h1>
        <h3 className="text-zinc-500 mb-8">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </h3>
        <Link to="/shop">
          <ButtonWhite name="Shop Now" />
        </Link>
      </div>
    </div>
  );
}
