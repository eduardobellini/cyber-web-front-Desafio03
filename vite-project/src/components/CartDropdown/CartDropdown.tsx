import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartService } from "../../services/cartService";
import type { CartItem } from "../../services/cartService";
import { getCurrentUserId } from "../../utils/userConfig";

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onCartUpdate?: () => Promise<void>;
}

export default function CartDropdown({ isOpen, onClose, onCartUpdate }: CartDropdownProps) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCartItems();
    }
  }, [isOpen]);

  const loadCartItems = async () => {
    setLoading(true);
    try {
      const userId = getCurrentUserId();
      
      if (!userId) {
        setCartItems([]);
        return;
      }
      
      const response = await cartService.getCart(userId);
      setCartItems(response.items || []);
    } catch (error) {
      console.error('Failed to load cart items:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await cartService.removeItem(itemId);
      await loadCartItems(); 
      if (onCartUpdate) {
        await onCartUpdate(); 
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0);
  };

  const handleGoToCart = () => {
    onClose();
    navigate('/cart');
  };

  const handleCheckout = () => {
    onClose();
    navigate('/address');
  };

  if (!isOpen) return null;

  return (
    <>
      
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
     
      <div className="absolute top-16 right-4 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
        </div>
        
        <div className="max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center space-x-3">
                  <img 
                    src={item.product.url_image} 
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ${Number(item.product.price).toFixed(2)}
                    </p>
                    {(item.color || item.memory) && (
                      <p className="text-xs text-gray-400">
                        {item.color && `Color: ${item.color}`}
                        {item.color && item.memory && ' • '}
                        {item.memory && `Memory: ${item.memory}`}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-900">
                      ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-900">Total:</span>
              <span className="font-bold text-lg text-gray-900">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <div className="space-y-2">
              <button
                onClick={handleGoToCart}
                className="w-full py-2 px-4 border border-black text-black rounded-md hover:bg-gray-100 transition-colors"
              >
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}