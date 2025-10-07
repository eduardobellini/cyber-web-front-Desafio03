import axios from 'axios';

// Log para debug - REMOVER depois
console.log('🔍 Environment Variable VITE_URL_API:', import.meta.env.VITE_URL_API);
console.log('🔍 All Environment Variables:', import.meta.env);

// Temporário: forçar URL da AWS se não encontrar variável de ambiente
const baseURL = import.meta.env.VITE_URL_API || 'http://3.22.168.72:7777/api';
console.log('🔍 Using baseURL:', baseURL);

export const api = axios.create({
  baseURL: baseURL,
});