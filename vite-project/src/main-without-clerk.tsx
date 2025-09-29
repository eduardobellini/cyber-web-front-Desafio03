import ReactDOM from 'react-dom/client'
import AppWithoutClerk from './AppWithoutClerk.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// Versão temporária sem Clerk - renomeie este arquivo para main.tsx se quiser usar
console.log('🚀 Executando versão temporária SEM Clerk');
console.log('📝 Para habilitar Clerk: configure VITE_CLERK_KEY no .env e use o main.tsx original');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppWithoutClerk />
    </BrowserRouter>
  </QueryClientProvider>
)