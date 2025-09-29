import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const userId = '1'; 

type CartItem = {
  id: number;
  product: {
    url_image: string;
    name: string;
    price: number;
  };
  quantity: number;
  color?: string;
  memory?: string;
};

type CartResponse = {
  items: CartItem[];
};

const fetchCart = async (): Promise<CartResponse> => {
  const res = await fetch(`http://localhost:7777/api/cart/${userId}`);
  if (!res.ok) throw new Error('Error when fetching the cart');
  return res.json();
};

const CartPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cart', userId],
    queryFn: fetchCart,
  });

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const res = await fetch(`http://localhost:7777/api/cart/item/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    if (!res.ok) {
      alert('Error when updating quantity');
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['cart', userId] });
  };

  const removeItem = async (itemId: number) => {
    const res = await fetch(`http://localhost:7777/api/cart/item/${itemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      alert('Error when removing item');
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['cart', userId] });
  };

  if (isLoading) return <p>Loading cart...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  const cartItems = data?.items || [];

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-6">Your Cart</h1>
      {cartItems.map((item: CartItem) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center space-x-4">
            <img src={item.product.url_image} alt={item.product.name} className="w-20 h-20 object-cover" />
            <div>
              <p className="font-semibold">{item.product.name}</p>
              {item.color && <p>Color: {item.color}</p>}
              {item.memory && <p>Memory: {item.memory}</p>}
              <p>Unit Price: ${item.product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
            <button
              onClick={() => removeItem(item.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
