import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type CartItemType = {
  id: string;
  quantity: number;
  product: {
    name: string;
    // Add other product fields as needed
  };
};

const CartItem = ({ item, userId }: { item: CartItemType; userId: string }) => {
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    const res = await fetch(`http://localhost:7777/api/cart/item/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    if (!res.ok) {
      alert("Erro ao atualizar quantidade");
      return;
    }
    setQuantity(newQuantity);
    queryClient.invalidateQueries({ queryKey: ["cart", userId] });
  };

  const removeItem = async () => {
    const res = await fetch(`http://localhost:7777/api/cart/item/${item.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Erro ao remover item");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["cart", userId] });
  };

  return (
    <div>
      <h3>{item.product.name}</h3>
      <p>Quantidade: {quantity}</p>
      <button onClick={() => updateQuantity(quantity - 1)}>-</button>
      <button onClick={() => updateQuantity(quantity + 1)}>+</button>
      <button onClick={removeItem}>Remover</button>
    </div>
  );
};

export default CartItem;