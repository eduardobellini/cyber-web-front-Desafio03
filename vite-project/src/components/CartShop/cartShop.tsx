import React, { useState } from 'react';

// Dados mockados dos produtos para simular o estado de um e-commerce
const products = [
  {
    id: '25139526913984',
    name: 'Apple iPhone 14 Pro Max',
    variant: '128gb Deep Purple',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1676648037166-7357732a3195?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '53459358345',
    name: 'AirPods Max Silver',
    variant: '',
    price: 549,
    image: 'https://images.unsplash.com/photo-1601952219803-2ee96068d80f?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '63832324',
    name: 'Apple Watch Series 9',
    variant: 'GPS 41mm Starlight Aluminium',
    price: 399,
    image: 'https://images.unsplash.com/photo-1628045607066-ac2a1f0a28f4?q=80&w=2670&auto=format&fit=crop',
  },
];

type Quantities = { [key: string]: number };

const ShoppingCart: React.FC = () => {
  const [quantities, setQuantities] = useState<Quantities>({
    '25139526913984': 1,
    '53459358345': 1,
    '63832324': 1,
  });

  // Função para calcular o subtotal, impostos e total
  const calculateTotal = () => {
    const subtotal = products.reduce((acc, product) => {
      return acc + product.price * (quantities[product.id] || 0);
    }, 0);

    const estimatedTax = 50;
    const shipping = 29;
    const total = subtotal + estimatedTax + shipping;

    return { subtotal, estimatedTax, shipping, total };
  };

  const { subtotal, estimatedTax, shipping, total } = calculateTotal();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantities({ ...quantities, [id]: newQuantity });
    }
  };

  const removeItem = (id: string) => {
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  return (
    <div className="bg-white p-8 font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shopping Cart Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-start justify-between border-b pb-6"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.variant}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    #{product.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      handleQuantityChange(product.id, (quantities[product.id] || 0) - 1)
                    }
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">
                    {quantities[product.id] || 0}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(product.id, (quantities[product.id] || 0) + 1)
                    }
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-medium text-gray-900">
                  ${product.price}
                </div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          {/* Discount/Promo Code */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">
              Discount code / Promo code
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              placeholder="Code"
            />
          </div>

          {/* Bonus Card Number */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">
              Your bonus card number
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-black focus:border-black"
                placeholder="Enter Card Number"
              />
              <button className="bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-r-lg hover:bg-gray-300 transition">
                Apply
              </button>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-medium">${estimatedTax}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated shipping & Handling</span>
              <span className="font-medium">${shipping}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>${total}</span>
          </div>

          {/* Checkout Button */}
          <button className="mt-8 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;