// src/App.jsx

import React from 'react';
// Pode haver outros imports aqui, como o CSS do App, logos, etc.

// --- PASSO 1: IMPORTAR O SEU COMPONENTE FOOTER ---
// O caminho './components/Footer' funciona porque o App.jsx está na pasta `src`,
// e a partir dela, ele entra em `components` e depois em `Footer`.
// Não é preciso escrever '/index.jsx' no final, o JavaScript resolve isso sozinho.
import Footer from './components/footer/index';

function App() {
  // Aqui fica toda a lógica e o estado do seu componente App
  // const [count, setCount] = useState(0)

  return (
    // Usamos um "Fragment" <>...</> para agrupar a página e o footer
    <>
      {/* Aqui virá todo o conteúdo principal da sua aplicação.
        No futuro, você terá o Header, as rotas para as páginas Home, Shop, etc.
      */}
      <div className="pagina-principal">
        <h1>Bem-vindo à Cyber</h1>
        <p>Conteúdo da sua página vai aqui...</p>
        {/* ... mais componentes e conteúdo ... */}
      </div>

      {/* --- PASSO 2: USAR (RENDERIZAR) O COMPONENTE FOOTER --- */}
      {/* Colocamos o Footer no final, fora da div principal, 
          para que ele sempre fique na parte de baixo da estrutura da página. */}
      <Footer />
    </>
  );
}

export default App;