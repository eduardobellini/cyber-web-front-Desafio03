// src/components/DiscountProducts/DiscountProducts.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByTag } from '../../services/productService';
import ProductGrid from '../ProductGrid/productGrid';

const DiscountProduct: React.FC = () => {
  // A tag que queremos buscar para esta seção
  const tag = 'discount_up_to_50';

  // Usamos o useQuery para buscar os produtos com a tag específica
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products', tag],
    queryFn: () => fetchProductsByTag(tag),
  });

  return (
    <div className="w-full mt-12 md:mt-24 mb-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Discounts up to -50%</h2>

        {isLoading && <div className="text-center p-8">Loading discounted products...</div>}
        {isError && <div className="text-center p-8 text-red-500">Could not fetch products.</div>}

        {products && products.length > 0 && <ProductGrid products={products} />}
      </div>
    </div>
  );
};

export default DiscountProduct;