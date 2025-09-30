import { useState, useEffect } from "react";
import { cartService } from "../services/cartService";
import { getCurrentUserId } from "../utils/userConfig";

export function useCartCount() {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateCartCount = async () => {
    setLoading(true);
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        setCartCount(0);
        return;
      }
      
      const response = await cartService.getCart(userId);
      const totalItems = response.items?.reduce((total, item) => total + item.quantity, 0) || 0;
      setCartCount(totalItems);
    } catch (error) {
      console.error('Failed to load cart count:', error);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return { cartCount, updateCartCount, loading };
}