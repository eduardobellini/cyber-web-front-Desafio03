import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartService } from "../../services/cartService";
import { getCurrentUserId } from "../../utils/userConfig";
import { useUser } from "@clerk/clerk-react";

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
  const { user } = useUser();
  const [tab, setTab] = useState<PaymentTab>("card");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [cardInfo, setCardInfo] = useState({
    holder: "",
    number: "",
    exp: "",
    cvv: "",
    sameAsBilling: true,
  });

  const [errors, setErrors] = useState({
    holder: "",
    number: "",
    exp: "",
    cvv: "",
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

  const validateCardInfo = () => {
    const newErrors = {
      holder: "",
      number: "",
      exp: "",
      cvv: "",
    };

    
    if (!cardInfo.holder.trim()) {
      newErrors.holder = "Cardholder name is required";
    }

    
    const cardNumber = cardInfo.number.replace(/\s/g, "");
    if (!cardNumber) {
      newErrors.number = "Card number is required";
    } else if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      newErrors.number = "Card number must be exactly 16 digits";
    }

    if (!cardInfo.exp.trim()) {
      newErrors.exp = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.exp)) {
      newErrors.exp = "Format: MM/YY (e.g., 12/25)";
    }

    if (!cardInfo.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (cardInfo.cvv.length !== 3 || !/^\d+$/.test(cardInfo.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits";
    }

    setErrors(newErrors);
    
    
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handlePayment = async () => {
    
    if (!validateCardInfo()) {
      return; 
    }

    setProcessing(true);
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      
      const orderNumber = `#CYB${Date.now().toString().slice(-6)}`;
      
      const orderDetails = {
        orderNumber,
        customerName: user?.firstName || 'Customer',
        email: user?.primaryEmailAddress?.emailAddress || '',
        totalAmount: `$${totals.total}`,
        expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      
      sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
      
      
      const userId = getCurrentUserId();
      if (userId) {
        try {
          await cartService.clearCart(userId);
          console.log('Cart cleared successfully');
        } catch (clearError) {
          console.warn('Failed to clear cart, trying to remove items individually:', clearError);
          
          try {
            for (const item of cartItems) {
              await cartService.removeItem(item.id);
            }
            console.log('Cart items removed individually');
          } catch (removeError) {
            console.warn('Failed to remove individual items, but payment was successful:', removeError);
          }
        }
      }
      
     
      navigate('/payment-success');
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

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
              <form className="flex flex-col gap-3 w-full max-w-[355px] mx-auto" autoComplete="off" noValidate data-form-type="other">
                
                <input type="text" style={{display: 'none'}} autoComplete="new-password" />
                <input type="password" style={{display: 'none'}} autoComplete="new-password" />
                
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="fullname"
                    className={`border rounded px-4 py-2 ${errors.holder ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Cardholder Name"
                    value={cardInfo.holder}
                    autoComplete="nope"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readonly')}
                    onChange={(e) => {
                      setCardInfo({ ...cardInfo, holder: e.target.value });
                      if (errors.holder) setErrors({ ...errors, holder: "" });
                    }}
                  />
                  {errors.holder && <span className="text-red-500 text-sm mt-1">{errors.holder}</span>}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="account-number"
                    className={`border rounded px-4 py-2 ${errors.number ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Card Number (16 digits)"
                    value={cardInfo.number}
                    maxLength={19} 
                    autoComplete="nope"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    inputMode="numeric"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readonly')}
                    onChange={(e) => {
                      
                      const value = e.target.value.replace(/\D/g, ""); 
                      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 "); 
                      setCardInfo({ ...cardInfo, number: formattedValue });
                      if (errors.number) setErrors({ ...errors, number: "" });
                    }}
                  />
                  {errors.number && <span className="text-red-500 text-sm mt-1">{errors.number}</span>}
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col w-1/2">
                    <input
                      type="text"
                      name="expire-date"
                      className={`border rounded px-4 py-2 ${errors.exp ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="MM/YY"
                      value={cardInfo.exp}
                      maxLength={5}
                      autoComplete="nope"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      inputMode="numeric"
                      readOnly
                      onFocus={(e) => e.target.removeAttribute('readonly')}
                      onChange={(e) => {
                        
                        let value = e.target.value.replace(/\D/g, ""); 
                        if (value.length >= 2) {
                          value = value.substring(0, 2) + "/" + value.substring(2, 4);
                        }
                        setCardInfo({ ...cardInfo, exp: value });
                        if (errors.exp) setErrors({ ...errors, exp: "" });
                      }}
                    />
                    {errors.exp && <span className="text-red-500 text-xs mt-1">{errors.exp}</span>}
                  </div>
                  <div className="flex flex-col w-1/2">
                    <input
                      type="text"
                      name="security-code"
                      className={`border rounded px-4 py-2 ${errors.cvv ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="CVV (3 digits)"
                      value={cardInfo.cvv}
                      maxLength={3}
                      autoComplete="nope"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      inputMode="numeric"
                      readOnly
                      onFocus={(e) => e.target.removeAttribute('readonly')}
                      onChange={(e) => {
                        
                        const value = e.target.value.replace(/\D/g, "");
                        setCardInfo({ ...cardInfo, cvv: value });
                        if (errors.cvv) setErrors({ ...errors, cvv: "" });
                      }}
                    />
                    {errors.cvv && <span className="text-red-500 text-xs mt-1">{errors.cvv}</span>}
                  </div>
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
              onClick={handlePayment}
              disabled={processing}
              className={`rounded px-6 py-2 font-semibold w-1/2 transition-colors ${
                processing 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-gray-900'
              }`}
            >
              {processing ? 'Processing...' : 'Pay'}
            </button>
          </div>
        </section>
      </div>
      <style>{`
        /* Hide browser autofill warnings and suggestions */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: none !important;
          box-shadow: none !important;
        }
        
        input::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
        
        /* Hide password manager notifications */
        input[type="text"]::-webkit-contacts-auto-fill-button,
        input[type="text"]::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
        
        /* Disable browser form validation tooltips */
        input:invalid {
          box-shadow: none !important;
        }
        
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
