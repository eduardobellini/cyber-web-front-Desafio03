import axios from 'axios';

// TEMPORÁRIO: Forçando URL da AWS para garantir que funcione
const baseURL = 'http://3.22.168.72:7777/api';
console.log('🔍 FORCED AWS baseURL:', baseURL);

// Debug das variáveis de ambiente
console.log('🔍 Environment Variable VITE_URL_API:', import.meta.env.VITE_URL_API);
console.log('🔍 All Environment Variables:', import.meta.env);

export const api = axios.create({
  baseURL: baseURL,
});