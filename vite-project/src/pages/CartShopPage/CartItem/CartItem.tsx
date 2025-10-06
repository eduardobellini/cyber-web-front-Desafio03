import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { API_CONFIG } from "../../../utils/userConfig";

type CartItemType = {
  id: string;
  quantity: number;
  product: {
    name: string;
  };
};

const CartItem = ({ item, userId }: { item: CartItemType; userId: string }) => {
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    const res = await fetch(`${API_CONFIG.BASE_URL}/cart/item/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    if (!res.ok) {
      alert("Error updating quantity");
      return;
    }
    setQuantity(newQuantity);
    queryClient.invalidateQueries({ queryKey: ["cart", userId] });
  };

  const removeItem = async () => {
    const res = await fetch(`${API_CONFIG.BASE_URL}/cart/item/${item.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Error removing item");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["cart", userId] });
  };

  return (
    <div>
      <h3>{item.product.name}</h3>
      <p>Quantity: {quantity}</p>
      <button onClick={() => updateQuantity(quantity - 1)}>-</button>
      <button onClick={() => updateQuantity(quantity + 1)}>+</button>
      <button onClick={removeItem}>Remove</button>
    </div>
  );
};

export default CartItem;