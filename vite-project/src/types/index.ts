export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  brand: string;
  category: string;
}

export interface BrandData {
  brand: string;
  total: number;
}

export interface Category {
  id: number;
  name: string;
  slug?: string;
  description: string | null;
  url_image: string;
}

export interface CategoriesResponse {
  data: Category[];
  metadata: {
    total_items: number;
    total_pages: number;
    current_page: number;
  };
}