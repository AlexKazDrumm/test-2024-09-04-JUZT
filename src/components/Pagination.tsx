import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`p-2 border ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;