import { api } from './api';
import { type Product } from '../types';

export const fetchProducts = async (
    category: string, 
    brands: string[], 
    sort: string, 
    page: number, 
    pageSize: number
): Promise<{ data: Product[], total: number }> => {
  try {
    const order = sort === 'high-to-low' ? 'desc' : 'asc';
    const response = await api.get(`/products/category/${category}`, {
        params: {
            page,
            sort: 'price',
            order,
            limit: pageSize,
            brands: brands.join(','),
        }
    });
    return { 
        data: response.data.data, 
        total: response.data.metadata.total_items 
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const fetchProductsByTag = async (tag: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/products/tag/${tag}`);
    const productsFromApi = response.data.data;
    const formattedProducts = productsFromApi.map((product: any) => ({
      ...product,
      image: product.url_image,
    }));
    return formattedProducts;
  } catch (error) {
    console.error(`Failed to fetch products for tag "${tag}":`, error);
    throw error;
  }
};

export const fetchDiscountedProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get('/products/discounted');
        const productsFromApi = response.data.data;
        const formattedProducts = productsFromApi.map((product: any) => ({
          ...product,
          image: product.url_image,
        }));
        return formattedProducts;
    } catch (error) {
        console.error("Failed to fetch discounted products:", error);
        throw error;
    }
};