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
  BASE_URL: 'http://3.22.168.72:7777/api', // FORÇADO para AWS
  ENDPOINTS: {
    CART: '/cart',
    CART_ITEM: '/cart/item',
  }
} as const;

console.log('🔍 FORCED API_CONFIG.BASE_URL:', API_CONFIG.BASE_URL);