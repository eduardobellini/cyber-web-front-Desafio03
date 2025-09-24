import { api } from './api';
import { type BrandData } from '../types';

export const fetchBrandsByCategory = async (category: string): Promise<BrandData[]> => {
  try {
    const response = await api.get('/brands', {
      params: {
        category_name: category !== 'all' ? category : undefined,
      }
    });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch brands for category "${category}":`, error);
    throw error;
  }
};