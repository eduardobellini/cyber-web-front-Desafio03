import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartService } from "../../services/cartService";
import { getCurrentUserId } from "../../utils/userConfig";

type PaymentTab = "card" | "paypal" | "paypal-credit";

interface CartItem {
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
}

interface SummaryItem {
  id: number;
  name: string;
  price: string;
  imgUrl?: string;
}

export default function PaymentStep() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<PaymentTab>("card");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [cardInfo, setCardInfo] = useState({
    holder: "",
    number: "",
    exp: "",
    cvv: "",
    sameAsBilling: true,
  });

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const userId = getCurrentUserId();
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await cartService.getCart(userId);
        setCartItems(response.items || response);
      } catch {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = 0;
    const total = subtotal + tax + shipping;
    
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const totals = calculateTotals();

  const summaryItems: SummaryItem[] = cartItems.map((item) => ({
    id: item.id,
    name: item.product.name,
    price: `$${(item.product.price * item.quantity).toFixed(2)}`,
    imgUrl: item.product.url_image,
  }));

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2 opacity-40">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-xs text-black font-bold">1</span>
            </span>
            <span className="font-semibold text-black">Address</span>
          </div>
          <div className="flex items-center space-x-2 opacity-40">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-xs text-black font-bold">2</span>
            </span>
            <span className="font-semibold text-black">Shipping</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
            <span className="font-semibold text-black">Payment</span>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-x-10 items-start px-2">
        <aside className="w-full lg:w-[420px] mb-8 lg:mb-0">
          <div className="bg-white rounded-xl border border-gray-200 px-8 py-8 shadow-sm">
            <h2 className="font-semibold text-lg mb-6">Summary</h2>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4 text-gray-500">Loading items...</div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-4 text-gray-500">Empty cart</div>
              ) : (
                summaryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg px-4 py-3 bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      {item.imgUrl && (
                        <img
                          src={item.imgUrl}
                          alt={item.name}
                          className="w-8 h-8 object-contain rounded"
                        />
                      )}
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.price}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 text-sm text-gray-900">
              <div className="mb-2 text-xs text-gray-600">Address</div>
              <div className="mb-4">1131 Dusty Townline, Jacksonville, TX, 40322</div>
              <div className="mb-2 text-xs text-gray-600">Shipment method</div>
              <div className="mb-4">Free Delivery</div>
              <div className="flex justify-between mb-1 text-base font-semibold">
                <span>Subtotal</span>
                <span>${totals.subtotal}</span>
              </div>
              <div className="flex justify-between mb-1 text-sm text-gray-600">
                <span>Estimated Tax</span>
                <span>${totals.tax}</span>
              </div>
              <div className="flex justify-between mb-1 text-sm text-gray-600">
                <span>Estimated shipping & Handling</span>
                <span>${totals.shipping}</span>
              </div>
              <div className="flex justify-between mt-3 text-lg font-bold">
                <span>Total</span>
                <span>${totals.total}</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 w-full">
          <h2 className="text-lg font-semibold mb-3">Payment</h2>

          {/* Tabs */}
          <div className="flex gap-x-10 border-b mb-6 text-base">
            <button
              className={`pb-2 border-b-2 ${
                tab === "card" ? "border-black font-semibold" : "border-transparent text-gray-600"
              }`}
              onClick={() => setTab("card")}
            >
              Credit Card
            </button>
            <button
              className={`pb-2 border-b-2 ${
                tab === "paypal" ? "border-black font-semibold" : "border-transparent text-gray-600"
              }`}
              onClick={() => setTab("paypal")}
            >
              PayPal
            </button>
            <button
              className={`pb-2 border-b-2 ${
                tab === "paypal-credit" ? "border-black font-semibold" : "border-transparent text-gray-600"
              }`}
              onClick={() => setTab("paypal-credit")}
            >
              PayPal Credit
            </button>
          </div>

          {tab === "card" && (
            <div>
              <div className="w-[345px] h-[180px] mb-6 mx-auto bg-gradient-to-br from-gray-900 to-black rounded-lg flex flex-col justify-between p-5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm"></div>
                    <div className="relative">
                      <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 border border-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-white text-xl font-mono tracking-widest text-center">
                  4085 &nbsp;&nbsp; 9536 &nbsp;&nbsp; 8475 &nbsp;&nbsp; 9530
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-white text-xs uppercase tracking-wide">Cardholder</span>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full -mr-2 z-10"></div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-8 w-20 h-1 bg-gradient-to-r from-gray-600 to-transparent rounded transform rotate-12"></div>
                <div className="absolute top-8 right-6 w-28 h-1 bg-gradient-to-r from-gray-500 to-transparent rounded transform rotate-12"></div>
              </div>
              <form className="flex flex-col gap-3 w-full max-w-[355px] mx-auto">
                <input
                  type="text"
                  className="border border-gray-200 rounded px-4 py-2"
                  placeholder="Cardholder Name"
                  value={cardInfo.holder}
                  onChange={(e) => setCardInfo({ ...cardInfo, holder: e.target.value })}
                />
                <input
                  type="text"
                  className="border border-gray-200 rounded px-4 py-2"
                  placeholder="Card Number"
                  value={cardInfo.number}
                  onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    className="border border-gray-200 rounded px-4 py-2 w-1/2"
                    placeholder="Exp.Date"
                    value={cardInfo.exp}
                    onChange={(e) => setCardInfo({ ...cardInfo, exp: e.target.value })}
                  />
                  <input
                    type="text"
                    className="border border-gray-200 rounded px-4 py-2 w-1/2"
                    placeholder="CVV"
                    value={cardInfo.cvv}
                    onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                  />
                </div>
                <label className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-black"
                    checked={cardInfo.sameAsBilling}
                    onChange={(e) => setCardInfo({ ...cardInfo, sameAsBilling: e.target.checked })}
                  />
                  <span className="text-sm text-gray-900">Same as billing address</span>
                </label>
              </form>
            </div>
          )}
          {/* Other tabs */}
          {(tab === "paypal" || tab === "paypal-credit") && (
            <div className="w-full max-w-[355px] mx-auto text-center py-24 text-gray-400">
              {tab === "paypal"
                ? "Pay with your PayPal account."
                : "PayPal Credit payment coming soon."}
            </div>
          )}
          <div className="flex justify-between max-w-[355px] mx-auto mt-6 gap-4">
            <button 
              onClick={() => navigate('/shipping')}
              className="border border-black rounded px-6 py-2 hover:bg-gray-100 font-semibold w-1/2"
            >
              Back
            </button>
            <button 
              onClick={() => {
                alert('Payment processed successfully!');
                navigate('/');
              }}
              className="bg-black text-white rounded px-6 py-2 hover:bg-gray-900 font-semibold w-1/2"
            >
              Pay
            </button>
          </div>
        </section>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .lg\\:w\\[420px\\] {
            width: 100% !important;
          }
          .flex-col {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
