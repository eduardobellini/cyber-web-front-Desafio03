import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/header';
import Footer from './components/footer/footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FilterPage from './pages/FilterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ScrollToTop from './components/ScrollToTop/scrollToTop';
import ShoppingCart from './components/CartShop/cartShop';

// Versão temporária sem Clerk para desenvolvimento
function AppWithoutClerk() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <div className="flex-grow">
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/shop/:category" element={<ProductsPage />} />
          <Route path="/shop/filters" element={<FilterPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          
          {/* Rotas temporariamente públicas (normalmente seriam protegidas) */}
          <Route path="/cart" element={<ShoppingCart />} />
          
          {/* Rota de aviso para páginas que precisam do Clerk */}
          <Route path="/profile" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🔐 Configuração Necessária</h2>
                <p className="text-gray-600 mb-4">
                  Para acessar o perfil, você precisa configurar o Clerk.
                </p>
                <div className="text-left text-sm text-gray-500 space-y-2">
                  <p><strong>1.</strong> Acesse https://dashboard.clerk.com/</p>
                  <p><strong>2.</strong> Crie um projeto</p>
                  <p><strong>3.</strong> Copie a Publishable Key</p>
                  <p><strong>4.</strong> Adicione no arquivo .env</p>
                </div>
                <button 
                  onClick={() => window.history.back()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Voltar
                </button>
              </div>
            </div>
          } />
          
          <Route path="/login" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🔑 Configure o Clerk</h2>
                <p className="text-gray-600 mb-4">
                  O sistema de login requer configuração do Clerk.
                </p>
                <a 
                  href="https://dashboard.clerk.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Ir para Clerk Dashboard
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