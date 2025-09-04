import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/header';


const sampleCategories = [
  { name: 'Phones', slug: 'phones', iconUrl: 'https://.../phone-icon.svg' },
  { name: 'Smart Watches', slug: 'smart-watches', iconUrl: 'https://.../watch-icon.svg' },
  { name: 'Laptops', slug: 'laptops', iconUrl: 'https://.../laptop-icon.svg' },
  { name: 'Tablets', slug: 'tablets', iconUrl: 'https://.../tablet-icon.svg' },
  { name: 'Headphones', slug: 'headphones', iconUrl: 'https://.../headphones-icon.svg' },
  { name: 'Cameras', slug: 'cameras', iconUrl: 'https://.../camera-icon.svg' },
  { name: 'Cameras', slug: 'cameras', iconUrl: 'https://.../camera-icon.svg' },
];
import Footer from './components/Footer/footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FilterPage from './pages/FilterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ScrollToTop from './components/ScrollToTop/scrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ProductsPage />} />
            <Route path="/shop/:category" element={<ProductsPage />} />
            <Route path="/shop/filters" element={<FilterPage />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
          </Routes>
        </div>

      <Footer />
    </>
  );
}

export default App;