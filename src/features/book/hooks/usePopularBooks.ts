// src/features/book/hooks/usePopularBooks.ts
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Book } from '@/types/book';
import { getBooks } from '@/features/book/data';

export function usePopularBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchPopularBooks = async () => {
            setLoading(true);
            const params = new URLSearchParams();
            params.append('limit', '10');
            // Assuming the API might have a sort parameter for popular books
            params.append('sort', 'popular'); 
            if (searchParams.get('feature')) {
                params.append('program_category', searchParams.get('feature')!);
            }
            
            // Correctly call getBooks instead of getRecommendedBooks
            const popularBooks = await getBooks(params); 
            
            setBooks(popularBooks);
            setLoading(false);
        };

        fetchPopularBooks();
    }, [searchParams]); // Depend on searchParams in case 'feature' changes

    return { books, loading };
}
