import axios from 'axios';

// FORÇA a URL da AWS se estivermos em produção
const baseURL = 'http://3.22.168.72:7777/api';

console.log('🔍 FORCED AWS baseURL:', baseURL);
console.log('🔍 VITE_URL_API env:', import.meta.env.VITE_URL_API);

export const api = axios.create({
  baseURL: baseURL,
});