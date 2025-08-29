import React from 'react';

import Footer from './components/footer/footer';
import Header from './components/Header/header'
import BottomBanner from './components/BottomBanner/bottomBanner'

function App() {


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <BottomBanner/>
        <Footer />
      </div>
    </>
  );
}

export default App;