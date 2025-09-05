import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/header';

import Footer from './components/footer/footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FilterPage from './pages/FilterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ScrollToTop from './components/ScrollToTop/scrollToTop';
import MainInfo from './components/MainInfo/mainInfo';

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
            <Route path='/product/:productId' element={<MainInfo/>}/>
          </Routes>
        </div>

      <Footer />
    </>
  );
}

export default App;