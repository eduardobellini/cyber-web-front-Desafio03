import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppWithoutClerk from './AppWithoutClerk.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react';

const queryClient = new QueryClient()

const clerk_key = import.meta.env.VITE_CLERK_KEY;

console.log('CLERK_KEY:', clerk_key);

const hasValidClerkKey = clerk_key && 
  clerk_key !== 'seu_clerk_publishable_key_aqui' && 
  clerk_key.trim() !== '';

if (!hasValidClerkKey) {
  console.warn('CLERK NOT CONFIGURED: Using app without authentication');
  console.log('To enable Clerk:');
  console.log('1. Go to https://dashboard.clerk.com/');
  console.log('2. Create a project');
  console.log('3. Go to API Keys');
  console.log('4. Copy the Publishable Key');
  console.log('5. Add to .env file: VITE_CLERK_KEY=your_key_here');
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {hasValidClerkKey ? (
          <ClerkProvider publishableKey={clerk_key}>
            <App />
          </ClerkProvider>
        ) : (
          <AppWithoutClerk />
        )}
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

