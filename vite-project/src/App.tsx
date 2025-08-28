import React from 'react';

import Footer from './components/Footer/footer';
import Header from './components/Header/header'

function App() {


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pagina-principal">
          <h1>Bem-vindo à Cyber</h1>
          <p>Conteúdo da sua página vai aqui...</p>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;