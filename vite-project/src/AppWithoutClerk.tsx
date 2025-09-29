import { Routes, Route } from 'react-router-dom';

import HeaderWithoutClerk from './components/Header/headerWithoutClerk';
import Footer from './components/footer/footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FilterPage from './pages/FilterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ScrollToTop from './components/ScrollToTop/scrollToTop';
import ShoppingCart from './components/CartShop/cartShop';

function AppWithoutClerk() {
  return (
    <>
      <ScrollToTop />
      <HeaderWithoutClerk />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/shop/:category" element={<ProductsPage />} />
          <Route path="/shop/filters" element={<FilterPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          
          <Route path="/profile" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Required</h2>
                <p className="text-gray-600 mb-4">
                  To access profile, you need to configure Clerk.
                </p>
                <div className="text-left text-sm text-gray-500 space-y-2">
                  <p><strong>1.</strong> Go to https://dashboard.clerk.com/</p>
                  <p><strong>2.</strong> Create a project</p>
                  <p><strong>3.</strong> Copy the Publishable Key</p>
                  <p><strong>4.</strong> Add to .env file</p>
                </div>
                <button 
                  onClick={() => window.history.back()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Back
                </button>
              </div>
            </div>
          } />
          
          <Route path="/login" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Configure Clerk</h2>
                <p className="text-gray-600 mb-4">
                  Login system requires Clerk configuration.
                </p>
                <a 
                  href="https://dashboard.clerk.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go to Clerk Dashboard
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default AppWithoutClerk;