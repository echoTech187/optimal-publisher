// src/features/book/data.ts
import { Book, BookAuthors, BookCategories } from "@/types/book";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL+'/api/v1' || 'http://127.0.0.1:8000/api/v1';

/**
 * Fetches a paginated and filtered list of books.
 * @param params URLSearchParams for filtering, pagination, and searching.
 * @returns A promise that resolves to an array of books.
 */
export async function getBooks(params: URLSearchParams): Promise<Book[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/books?${params.toString()}`);
        if (!response.ok) return [];
        const result = await response.json();
        return (result.data as Book[]) || [];
    } catch (error) {
        console.error("Failed to fetch books:", error);
        return [];
    }
}

/**
 * Fetches a list of all book categories.
 * @returns A promise that resolves to an array of book categories.
 */
export async function fetchBookCategories(params: URLSearchParams): Promise<BookCategories[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/book?${params.toString()}`);
        if (!response.ok) return [];
        const result = await response.json();
        return (result.data as BookCategories[]) || [];
    } catch (error) {
        console.error("Failed to fetch book categories:", error);
        return [];
    }
}

/**
 * Fetches a list of all book authors.
 * @returns A promise that resolves to an array of book authors.
 */
export async function fetchBookAuthors(params: URLSearchParams): Promise<BookAuthors[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/author/book?${params.toString()}`);
        if (!response.ok) return [];
        const result = await response.json();
        return (result.data as BookAuthors[]) || [];
    } catch (error) {
        console.error("Failed to fetch book authors:", error);
        return [];
    }
}

/**
 * Fetches the details for a single book by its slug.
 * @param slug The slug of the book to fetch.
 * @returns A promise that resolves to the book data.
 */
export async function getBookBySlug(slug: string): Promise<Book | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/book/${slug}`);
        if (!response.ok) return null;
        const result = await response.json();
        return result.data as Book;
    } catch (error) {
        console.error(`Failed to fetch book with slug ${slug}:`, error);
        return null;
    }
}

/**
 * Fetches a list of recommended books.
 * @param length The number of recommended books to fetch.
 * @returns A promise that resolves to an array of books.
 */
export async function getRecommendedBooks(length: number = 5): Promise<Book[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/book?length=${length}`);
        if (!response.ok) return [];
        const result = await response.json();
        return (result.data as Book[]) || [];
    } catch (error) {
        console.error("Failed to fetch recommended books:", error);
        return [];
    }
}
