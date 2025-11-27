// src/features/book/hooks/useBooks.ts
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Book, BookAuthors, BookCategories } from '@/types/book';
import { fetchBookAuthors, fetchBookCategories, getBooks } from '@/features/book/data';
import { useDebounce } from '@/lib/hooks/useDebounce';

const BOOKS_PER_PAGE = 20;

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [authorSelected, setAuthorSelected] = useState('Semua Penulis');

    // Filter options
    const [bookCategories, setBookCategories] = useState<BookCategories[]>([]);
    const [bookAuthors, setBookAuthors] = useState<BookAuthors[]>([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const searchParams = useSearchParams();
    const loader = useRef<HTMLDivElement>(null);

    // Function to load books
    const loadBooks = useCallback(async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;
        setLoading(true);

        const currentPage = reset ? 1 : page;
        
        const params = new URLSearchParams();
        params.append('page', currentPage.toString());
        params.append('limit', BOOKS_PER_PAGE.toString());
        if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
        if (selectedCategory !== 'Semua Kategori') params.append('category', selectedCategory);
        if (authorSelected !== 'Semua Penulis') params.append('author', authorSelected);
        if (searchParams.get('feature')) params.append('program_category', searchParams.get('feature')!);

        const newBooks = await getBooks(params);
        
        setBooks(prevBooks => (currentPage === 1 ? newBooks : [...prevBooks, ...newBooks]));
        setHasMore(newBooks.length === BOOKS_PER_PAGE);
        setLoading(false);
    }, [page, debouncedSearchTerm, selectedCategory, authorSelected, loading, hasMore, searchParams]);

    // Effect for initial filter options loading
    useEffect(() => {
        const loadFilterOptions = async () => {
            const params = new URLSearchParams();
            if (searchParams.get('feature')) {
                params.append('program_category', searchParams.get('feature')!);
            }
            const [authors, categories] = await Promise.all([
                fetchBookAuthors(params),
                fetchBookCategories(params)
            ]);
            setBookAuthors(authors);
            setBookCategories(categories);
        };
        loadFilterOptions();
    }, [searchParams]);

    // Effect to reset and load books when filters change
    useEffect(() => {
        setPage(1);
        setBooks([]);
        setHasMore(true);
        loadBooks(true); // Pass true to reset
    }, [debouncedSearchTerm, selectedCategory, authorSelected]); // `loadBooks` is not needed here

    // Effect for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        const currentLoader = loader.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [loader, hasMore, loading]);

    // Effect to load more books when page changes
    useEffect(() => {
        if (page > 1) {
            loadBooks();
        }
    }, [page]); // `loadBooks` is not needed here

    return {
        books,
        loading,
        loader,
        hasMore,
        page,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        authorSelected,
        setAuthorSelected,
        bookCategories,
        bookAuthors,
    };
}
