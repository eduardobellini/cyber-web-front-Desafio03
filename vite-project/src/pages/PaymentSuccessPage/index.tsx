import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentCompleted from "../../components/PaymeantAproved/PaymeantAproved";

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  totalAmount: string;
  expectedDeliveryDate: string;
}

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const storedDetails = sessionStorage.getItem('orderDetails');
    if (storedDetails) {
      setOrderDetails(JSON.parse(storedDetails));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleGoHome = () => {
    sessionStorage.removeItem('orderDetails');
    navigate('/');
  };

  const handleViewOrder = () => {
    sessionStorage.removeItem('orderDetails');
    navigate('/profile');
  };

  if (!orderDetails) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <PaymentCompleted
      orderNumber={orderDetails.orderNumber}
      customerName={orderDetails.customerName}
      email={orderDetails.email}
      totalAmount={orderDetails.totalAmount}
      expectedDeliveryDate={orderDetails.expectedDeliveryDate}
      onGoHome={handleGoHome}
      onViewOrder={handleViewOrder}
    />
  );
}