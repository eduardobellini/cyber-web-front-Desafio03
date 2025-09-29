import React, { useState, useEffect } from 'react';

type Quantities = { [key: string]: number };

const userId = 'user123'; // Use o ID do usuário real

const ShoppingCart: React.FC = () => {
  type CartItem = {
    id: number;
    product: {
      id: string;
      name: string;
      price: number;
      url_image: string;
    };
    quantity: number;
    color?: string;
    memory?: string;
  };
  
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Quantities>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Busca os dados do carrinho do usuário
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:7777/api/cart/${userId}`);
      if (!res.ok) throw new Error('Falha ao buscar carrinho');
      const data = await res.json();

      setCartItems(data.items);

      const initialQuantities: Quantities = {};
      data.items.forEach((item: CartItem) => {
        initialQuantities[item.product.id] = item.quantity;
      });
      setQuantities(initialQuantities);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro ao buscar o carrinho');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Atualiza a quantidade de um item (chama back-end PUT)
  const handleQuantityChange = async (cartItemId: number, productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const res = await fetch(`http://localhost:7777/api/cart/item/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar quantidade");
      
      setQuantities(prev => ({
        ...prev,
        [productId]: newQuantity,
      }));

      await fetchCart(); // Atualiza lista do carrinho
    } catch (error) {
      alert("Erro ao atualizar quantidade");
      console.error(error);
    }
  };

  // Remove um item do carrinho (chama back-end DELETE)
  const handleRemoveItem = async (cartItemId: number) => {
    try {
      const res = await fetch(`http://localhost:7777/api/cart/item/${cartItemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao remover item");
      
      await fetchCart(); // Atualiza lista do carrinho
    } catch (error) {
      alert("Erro ao remover item");
      console.error(error);
    }
  };

  // Calcula subtotais e totais baseados nos itens e quantidades
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((acc, item) => {
      const quantity = quantities[item.product.id] || 0;
      return acc + item.product.price * quantity;
    }, 0);

    const estimatedTax = 50;
    const shipping = 29;
    const total = subtotal + estimatedTax + shipping;

    return { subtotal, estimatedTax, shipping, total };
  };

  const { subtotal, estimatedTax, shipping, total } = calculateTotals();

  if (loading) return <div className="text-center p-12">Carregando carrinho...</div>;
  if (error) return <div className="text-center p-12 text-red-500">Erro: {error}</div>;
  if (cartItems.length === 0) return <div className="text-center p-12">Seu carrinho está vazio</div>;

  return (
    <div className="bg-white p-8 font-sans max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shopping Cart Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-start justify-between border-b pb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.url_image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.product.name}</h3>
                  {/* Exibir opções selecionadas, se tiver */}
                  {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                  {item.memory && <p className="text-sm text-gray-500">Storage: {item.memory}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.product.id, (quantities[item.product.id] || 1) - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    aria-label={`Diminuir quantidade de ${item.product.name}`}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantities[item.product.id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.product.id, (quantities[item.product.id] || 1) + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    aria-label={`Aumentar quantidade de ${item.product.name}`}
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-medium text-gray-900">${item.product.price}</div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label={`Remover ${item.product.name} do carrinho`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
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
            <label className="text-sm font-medium text-gray-700">Discount code / Promo code</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              placeholder="Code"
            />
          </div>

          {/* Bonus Card Number */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">Your bonus card number</label>
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
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-medium">${estimatedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated shipping & Handling</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
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
