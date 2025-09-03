import React from 'react';
import CategoryBrowser from '../../components/CategoryBrowser/categoryBrowser';
import BottomBanner from '../../components/BottomBanner/bottomBanner';
import FullHero from '../../components/Hero/FullHero';
import ProductHome from '../../components/Products_Home/Products_Home';
import ShopNow from '../../components/ShopNow/shopNow'

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
      <FullHero />
      <CategoryBrowser categories={sampleCategories} />
      <ProductHome />
      <ShopNow/>
      <BottomBanner />
    </>
  );
};

export default HomePage;