import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2 mt-12">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md disabled:opacity-50"
      >
        &lt;
      </button>

      {pages.map((page, index) => 
        typeof page === 'number' ? (
          <button 
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-4 py-2">...</span>
        )
      )}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md disabled:opacity-50"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;