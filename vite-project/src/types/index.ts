export interface Category {
  id: number;
  name: string;
  slug?: string;
  description: string | null;
  url_image: string;
}

export interface BrandData {
  brand: string;
  total: number;
}

export interface SmartphoneSpecs {
    screen_size: string | null;
    cpu: string | null;
    total_cores: string | null;
    main_camera: string | null;
    front_camera: string | null;
    battery: string | null;
}

export interface StorageOption {
    id: number;
    size: string;
}

export interface ProductColor {
    id: number;
    name: string;
    hex_code: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discounted_price: number | null;
  image: string;
  brand: string;
  category: Category;
  smartphoneSpecs: SmartphoneSpecs | null;
  storageOptions: StorageOption[];
  colors: ProductColor[];
}

export interface ProductsResponse {
  data: Product[];
  metadata: {
    total_items: number;
    total_pages: number;
    current_page: number;
  };
}