import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  type: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div 
      className={`
        fixed bottom-5 right-5 p-4 rounded-lg text-white shadow-lg
        transform transition-transform duration-300
        animate-slide-in
        ${bgColor}
      `}
    >
      {message}
    </div>
  );
};

export default Toast;