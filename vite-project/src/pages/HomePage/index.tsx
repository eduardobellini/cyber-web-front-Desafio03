import React from 'react';
import CategoryBrowser from '../../components/CategoryBrowser/categoryBrowser';
import BottomBanner from '../../components/BottomBanner/bottomBanner';

const sampleCategories = [
  { name: 'Phones', slug: 'phones', iconUrl: 'https://.../phone-icon.svg' },
  { name: 'Smart Watches', slug: 'smart-watches', iconUrl: 'https://.../watch-icon.svg' },
  { name: 'Laptops', slug: 'laptops', iconUrl: 'https://.../laptop-icon.svg' },
  { name: 'Tablets', slug: 'tablets', iconUrl: 'https://.../tablet-icon.svg' },
  { name: 'Headphones', slug: 'headphones', iconUrl: 'https://.../headphones-icon.svg' },
  { name: 'Cameras', slug: 'cameras', iconUrl: 'https://.../camera-icon.svg' },
  { name: 'Cameras', slug: 'cameras', iconUrl: 'https://.../camera-icon.svg' },

];

const HomePage = () => {
  return (
    <>
      <main className="pagina-principal">
        <h1>Bem-vindo à Cyber</h1>
        <p>Conteúdo da sua página vai aqui...</p>
      </main>
      <CategoryBrowser categories={sampleCategories} />
      <BottomBanner />
    </>
  );
};

export default HomePage;