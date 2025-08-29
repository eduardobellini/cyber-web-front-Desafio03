import React from 'react';

import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import CategoryBrowser from './components/CategoryBrowser/categoryBrowser';

const sampleCategories = [
  { name: 'Phones', slug: 'phones', iconUrl: 'https://.../phone-icon.svg' },
  { name: 'Smart Watches', slug: 'smart-watches', iconUrl: 'https://.../watch-icon.svg' },
  { name: 'Laptops', slug: 'laptops', iconUrl: 'https://.../laptop-icon.svg' },
  { name: 'Tablets', slug: 'tablets', iconUrl: 'https://.../tablet-icon.svg' },
  { name: 'Headphones', slug: 'headphones', iconUrl: 'https://.../headphones-icon.svg' },
  { name: 'Cameras', slug: 'cameras', iconUrl: 'https://.../camera-icon.svg' },
  { name: 'Cameras', slug: 'cameras', iconUrl: 'https://.../camera-icon.svg' },
];

function App() {


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pagina-principal">
          <h1>Bem-vindo à Cyber</h1>
          <p>Conteúdo da sua página vai aqui...</p>
        </main>
        <CategoryBrowser categories={sampleCategories} />
        <Footer />
      </div>
    </>
  );
}

export default App;