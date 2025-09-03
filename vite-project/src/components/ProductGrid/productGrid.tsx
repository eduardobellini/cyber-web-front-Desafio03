import React, { useState } from 'react';
import ProductCard from '../ProductsCard/productCard';
import type { Product } from '../ProductsCard/productCard';

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard 
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                />
            ))}
        </div>
    );
};

export default ProductGrid;