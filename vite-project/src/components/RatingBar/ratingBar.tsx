import React from 'react';

interface RatingBarProps {
  label: string;
  count: number;
  total: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ label, count, total }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="w-28 text-gray-600">{label}</span>
      <div className="flex-grow bg-gray-200 rounded-full h-2">
        <div 
          className="bg-yellow-400 h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right text-gray-600 font-medium">{count}</span>
    </div>
  );
};

export default RatingBar;