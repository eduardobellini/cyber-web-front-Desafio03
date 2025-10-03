
interface PaymentCompletedProps {
  orderNumber: string;
  customerName: string;
  email: string;
  totalAmount: string;
  expectedDeliveryDate?: string;
  onGoHome: () => void;
  onViewOrder: () => void;
}

export default function PaymentCompleted({
  orderNumber,
  customerName,
  email,
  totalAmount,
  expectedDeliveryDate,
  onGoHome,
  onViewOrder,
}: PaymentCompletedProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16">
      <div className="max-w-3xl w-full flex flex-col items-center space-y-8">
        {/* Icon Success */}
        <div className="bg-green-100 rounded-full p-6">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900">Payment Completed</h1>

        {/* Confirmation Message */}
        <p className="text-center text-gray-700 max-w-md">
          Thank you, <span className="font-semibold">{customerName}</span>! Your payment has
          been successfully processed.
        </p>

        {/* Order Details Box */}
        <div className="w-full max-w-xl bg-gray-50 border border-gray-200 rounded-lg p-8">
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Order Number: </span>
            <span className="text-gray-900">{orderNumber}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Email: </span>
            <span className="text-gray-900">{email}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Total Paid: </span>
            <span className="text-gray-900">{totalAmount}</span>
          </div>
          {expectedDeliveryDate && (
            <div>
              <span className="font-semibold text-gray-700">Estimated Delivery: </span>
              <span className="text-gray-900">{expectedDeliveryDate}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-xl">
          <button
            onClick={onViewOrder}
            className="flex-1 py-3 px-6 bg-black text-white rounded-md text-center hover:bg-gray-900 transition"
          >
            View Order
          </button>
          <button
            onClick={onGoHome}
            className="flex-1 py-3 px-6 border border-black rounded-md text-black text-center hover:bg-gray-100 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
