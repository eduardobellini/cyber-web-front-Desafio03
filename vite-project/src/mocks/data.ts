export interface BrandData {
  brand: string;
  total: number;
}

export const mockBrandsByCategory: { [key: string]: BrandData[] } = {
  'phones': [
    { brand: 'Apple', total: 110 },
    { brand: 'Samsung', total: 125 },
    { brand: 'Xiaomi', total: 68 },
    { brand: 'Google', total: 40 },
    { brand: 'Honor', total: 10 },
  ],
  'computers': [
    { brand: 'Apple', total: 50 },
    { brand: 'Dell', total: 90 },
    { brand: 'HP', total: 75 },
    { brand: 'Lenovo', total: 80 },
  ],
  'gaming': [
    { brand: 'Razer', total: 45 },
    { brand: 'Logitech', total: 60 },
    { brand: 'Corsair', total: 30 },
  ],
  'all': [
    { brand: 'Apple', total: 160 },
    { brand: 'Samsung', total: 125 },
    { brand: 'Xiaomi', total: 68 },
    { brand: 'Google', total: 40 },
    { brand: 'Honor', total: 10 },
    { brand: 'Dell', total: 90 },
    { brand: 'HP', total: 75 },
    { brand: 'Lenovo', total: 80 },
    { brand: 'Razer', total: 45 },
    { brand: 'Logitech', total: 60 },
    { brand: 'Corsair', total: 30 },
  ]
};