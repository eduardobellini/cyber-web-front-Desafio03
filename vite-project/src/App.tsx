
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/header';

import Footer from './components/footer/footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FilterPage from './pages/FilterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ScrollToTop from './components/ScrollToTop/scrollToTop';
import ShoppingCart from './components/CartShop/cartShop';
import UserProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

import { SignIn, SignUp } from '@clerk/clerk-react';

function App() {
  return (
    <>
      
      <ScrollToTop />
      
      <Header />

        <div className="flex-grow">
          <Routes>
           
            <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
            <Route path="/login" element={<SignIn />} />
            
            
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ProductsPage />} />
            <Route path="/shop/:category" element={<ProductsPage />} />
            <Route path="/shop/filters" element={<FilterPage />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <ShoppingCart />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>


      <Footer />
    </>
  );
}

export default App;