import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import FullHero from './components/Hero/FullHero';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <>
      
      <Header />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/shop/:category" element={<ProductsPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;