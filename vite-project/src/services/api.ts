import axios from 'axios';

const baseURL = import.meta.env.VITE_URL_API || 'http://3.22.168.72:7777/api';

console.log('🔍 API baseURL:', baseURL);

export const api = axios.create({
  baseURL: baseURL,
});