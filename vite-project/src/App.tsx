import React from 'react';
import Header from './components/Header/header'
import Footer from './components/footer/index';

function App() {


  return (
    <>
      <Header />
      <div className="pagina-principal">
        <h1>Bem-vindo à Cyber</h1>
        <p>Conteúdo da sua página vai aqui...</p>
      </div>
      <Footer />
    </>
  );
}

export default App;