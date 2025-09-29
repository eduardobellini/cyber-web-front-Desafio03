import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react';

const queryClient = new QueryClient()

const clerk_key = import.meta.env.VITE_CLERK_KEY;

console.log('CLERK_KEY:', clerk_key);

// Verificação mais inteligente da chave do Clerk
if (!clerk_key || clerk_key === 'seu_clerk_publishable_key_aqui' || clerk_key.trim() === '') {
  console.error('❌ CLERK NÃO CONFIGURADO: Configure sua chave do Clerk no arquivo .env');
  console.log('📝 Instruções:');
  console.log('1. Acesse https://dashboard.clerk.com/');
  console.log('2. Crie um projeto');
  console.log('3. Vá em API Keys');
  console.log('4. Copie a Publishable Key');
  console.log('5. Cole no arquivo .env: VITE_CLERK_KEY=sua_chave_aqui');
  throw new Error('Configure o Clerk: Adicione VITE_CLERK_KEY no arquivo .env com sua chave do dashboard.clerk.com')
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={clerk_key}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </ClerkProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)

