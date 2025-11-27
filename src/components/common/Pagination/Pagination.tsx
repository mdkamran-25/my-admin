// Reusable Pagination Component

import { memo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  showInfo?: boolean;
}

export const Pagination = memo<PaginationProps>(
  ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    showInfo = true,
  }) => {
    const startItem =
      totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem =
      totalItems && itemsPerPage
        ? Math.min(currentPage * itemsPerPage, totalItems)
        : 0;

    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);

        if (currentPage > 3) {
          pages.push("...");
        }

        for (
          let i = Math.max(2, currentPage - 1);
          i <= Math.min(totalPages - 1, currentPage + 1);
          i++
        ) {
          if (i !== 1 && i !== totalPages) {
            pages.push(i);
          }
        }

        if (currentPage < totalPages - 2) {
          pages.push("...");
        }

        pages.push(totalPages);
      }

      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        {/* Info */}
        {showInfo && totalItems && itemsPerPage && (
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </div>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..." || page === currentPage}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : page === "..."
                    ? "cursor-default"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";
