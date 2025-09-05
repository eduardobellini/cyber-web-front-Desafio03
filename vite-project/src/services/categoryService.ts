import { api } from './api';
import { type Category } from '../types';

export interface CategoriesResponse {
  data: Category[];
  metadata: {
    total_items: number;
    total_pages: number;
    current_page: number;
  };
}

export const fetchCategories = async (page = 1): Promise<CategoriesResponse> => {
  try {
    const response = await api.get('/categories', {
      params: {
        page: page,
        limit: 6,
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};