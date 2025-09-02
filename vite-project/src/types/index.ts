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