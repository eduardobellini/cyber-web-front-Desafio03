import React from 'react';

import Footer from './components/Footer/footer';

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">

        <main className="flex-grow">
          <div className="pagina-principal">
            <h1>Bem-vindo à Cyber</h1>
            <p>Conteúdo da sua página vai aqui...</p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;