import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ShippingOption {
  id: string;
  title: string;
  description: string;
  price: string;
  date?: string;
  disabled?: boolean;
}

const shippingOptions: ShippingOption[] = [
  {
    id: "regular",
    title: " Free Delivery",
    description: "Standard delivery within 7 business days",
    price: "Free",
    date: "17 Oct, 2023"
  },
  {
    id: "express",
    title: " Express Delivery",
    description: "Get it as fast as possible",
    price: "$8.50",
    date: "1 Oct, 2023"
  },
  {
    id: "schedule",
    title: " Scheduled Delivery ",
    description: "Choose a date to receive your delivery",
    price: "$5.00"
  }
];

export default function ShippingStep() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("regular");

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2 opacity-40">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-xs text-black font-bold">1</span>
            </span>
            <span className="font-semibold text-black">Address</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
              <span className="text-xs text-white font-bold">2</span>
            </span>
            <span className="font-semibold text-black">Shipping</span>
          </div>
          <div className="flex items-center space-x-2 opacity-40">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-xs text-black font-bold">3</span>
            </span>
            <span className="font-semibold text-black">Payment</span>
          </div>
        </div>

        
        <h2 className="text-lg font-semibold mb-4">Shipment Method</h2>

      
        <div className="flex flex-col md:space-y-2 space-y-4">
          {shippingOptions.map(opt => (
            <div
              key={opt.id}
              id={`shipping-${opt.id}`}
              className={`flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg px-4 py-3 transition-all duration-200
                ${selected === opt.id ? "border-black bg-gray-50 shadow-md" : "border-gray-200 hover:border-gray-400 hover:shadow-sm"}
                ${opt.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => {
                if (!opt.disabled) {
                  console.log(' Teste ', opt.id, opt.title);
                  setSelected(opt.id);
                 
                  const element = document.getElementById(`shipping-${opt.id}`);
                  if (element) {
                    element.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                      element.style.transform = 'scale(1)';
                    }, 100);
                  }
                }
              }}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio mr-3 w-4 h-4 text-black focus:ring-2 focus:ring-black"
                  checked={selected === opt.id}
                  disabled={opt.disabled}
                  onChange={() => {
                    if (!opt.disabled) {
                      console.log(' Radio button clicked:', opt.id);
                      setSelected(opt.id);
                    }
                  }}
                  name="shipping-method"
                />
                <div>
                  <span className={`font-semibold ${opt.disabled ? "text-gray-500" : "text-black"}`}>{opt.title}</span>
                  <span className={`ml-2 text-gray-500`}>{opt.description}</span>
                </div>
              </div>
              <div className="md:text-right flex md:block flex-row justify-between w-full md:w-auto mt-2 md:mt-0">
                <span className={`font-bold text-lg ${selected === opt.id ? "text-black" : "text-gray-600"}`}>
                  {opt.price}
                </span>
                {opt.date && (
                  <span className="text-gray-700 block text-sm mt-1">{opt.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button 
            onClick={() => navigate('/address')}
            className="px-6 py-2 border border-black rounded hover:bg-gray-100"
          >
            Back to Addresses
          </button>
          <button 
            onClick={() => navigate('/payment')}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Finalize Order 
          </button>
        </div>
      </div>
    </div>
  );
}
