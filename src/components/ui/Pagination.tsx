'use client';

import { Icon } from '@iconify/react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
            
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-md ${currentPage === i ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-between p-4">
            <button
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <Icon icon="ion:chevron-back-outline" className="mr-2" />
                Previous
            </button>
            <div className="hidden md:flex items-center space-x-2">
                {renderPageNumbers()}
            </div>
            <button
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
                <Icon icon="ion:chevron-forward-outline" className="ml-2" />
            </button>
        </div>
    );
}
