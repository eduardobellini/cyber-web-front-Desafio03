import ReactDOM from 'react-dom/client'
import AppWithoutClerk from './AppWithoutClerk.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

console.log('Running temporary version WITHOUT Clerk');
console.log('To enable Clerk: configure VITE_CLERK_KEY in .env and use original main.tsx');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppWithoutClerk />
    </BrowserRouter>
  </QueryClientProvider>
)