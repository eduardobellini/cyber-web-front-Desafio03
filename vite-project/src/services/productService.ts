import { api } from './api';
import { type Product, type ProductsResponse } from '../types'; 

export const fetchProducts = async (
    category: string, 
    brands: string[], 
    sort: string, 
    page: number, 
    pageSize: number
): Promise<ProductsResponse> => {
  try {
    const order = sort === 'high-to-low' ? 'desc' : 'asc';
    
    const response = await api.get('/products', {
        params: {
            page: page,
            limit: pageSize,
            sort: 'price',
            order: order,
            brands: brands.length > 0 ? brands.join(',') : undefined,
            category_name: category !== 'all' ? category : undefined,
        }
    });

    const formattedProducts = response.data.data.map((product: any) => ({
      ...product,
      image: product.url_image,
    }));
    
    return {
        data: formattedProducts,
        metadata: response.data.metadata,
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

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    const productFromApi = response.data;
    
    return {
      ...productFromApi,
      image: productFromApi.url_image,
    };
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    throw error;
  }
};