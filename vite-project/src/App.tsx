import React from 'react';

import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import FullHero from './components/Hero/FullHero';

function App() {


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <FullHero/>
        <Footer />
      </div>
    </>
  );
}

export default App;