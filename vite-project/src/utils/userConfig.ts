import { useUser } from '@clerk/clerk-react';

export const DEFAULT_USER_ID = 'user123';


export const useUserId = (): string => {
  const { user } = useUser();
  
 
  return user?.id || DEFAULT_USER_ID;
};


export const getCurrentUserId = (): string => {
 
  return DEFAULT_USER_ID;
};

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_URL_API || 'http://localhost:7777/api',
  ENDPOINTS: {
    CART: '/cart',
    CART_ITEM: '/cart/item',
  }
} as const;