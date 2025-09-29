import React from 'react';

interface OrderItem {
  product: {
    price: number;
    
  };
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const estimatedTax = 0.1 * subtotal; 
  const shipping = subtotal > 0 ? 30 : 0;
  const total = subtotal + estimatedTax + shipping;

  return (
    <div className="border p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>R$ {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Estimated Tax (10%)</span>
        <span>R$ {estimatedTax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Delivery</span>
        <span>R$ {shipping.toFixed(2)}</span>
      </div>
      <div className="border-t pt-3 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
