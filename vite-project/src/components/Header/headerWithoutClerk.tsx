import { useState } from "react";
import CyberImg from "../../Assets/Cyber.png";
import NavItem from "./navItem";
import NavItemMobile from "./navItemMobile";

import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

export default function HeaderWithoutClerk() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30">
      <nav className="bg-white  w-full start-0 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto flex items-center justify-around p-4 relative">
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center space-x-3 justify-start"
            >
              <img src={CyberImg} className="h-8" alt="Cyber Logo" />
            </a>
            <div className="hidden xl:block ml-10 mr-10">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-96 pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>

          <div className="hidden xl:flex items-center ml-4 text-center w-auto pr-10">
            <ul className="flex space-x-20 font-medium text-gray-500 whitespace-nowrap">
              <NavItem
                home="/"
                shop="/shop"
                contatUs="/"
                blog="/"
              />
            </ul>
          </div>
          
          <div className="hidden xl:flex items-center space-x-4">
            <CiHeart size={28} />
            <CiShoppingCart size={28} />
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <CiUser size={20} className="mr-2" />
              Sign In
            </button>
          </div>
          
          <div className="xl:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`absolute top-16 right-4 w-64 xl:hidden ${menuOpen ? "" : "hidden"} bg-white shadow-lg rounded-lg z-100`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 font-medium border border-gray-100 rounded-lg bg-gray-50">
              <NavItemMobile
                home="/"
                shop="/shop"
                contatUs="/"
                blog="/"
              />
              
              <li className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}