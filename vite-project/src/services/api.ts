import axios from 'axios';


console.log('🔍 Environment Variable VITE_URL_API:', import.meta.env.VITE_URL_API);
console.log('🔍 All Environment Variables:', import.meta.env);


const baseURL = import.meta.env.VITE_URL_API || 'http://3.22.168.72:7777/api';
console.log('🔍 Using baseURL:', baseURL);

export const api = axios.create({
  baseURL: baseURL,
});