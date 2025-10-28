"use server";
import { cookies } from "next/headers";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

import { Book, BookAuthors, BookCategories } from '@/types/book';

interface ApiResponse {
  data: Book[];
  // ... other API response properties
}

/**
 * Fetches a list of books from the API.
 * @param params - Optional URL search parameters to filter the results.
 * @returns A promise that resolves to an array of books.
 */
export async function getBooks(params?: URLSearchParams | Record<string, string> | string): Promise<Book[]> {
  try {
    // const $token = (await cookies()).get('token')?.value || '';
    // Ensure params are correctly stringified into a query string.
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/books${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      // Using no-cache to ensure fresh data on every request,
      // or revalidate for periodic refetching.
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const result: ApiResponse = await response.json();
    // The API returns an empty `data` array when there are no results,
    // which is fine. No need to return an empty array explicitly.
    return result.data;

  } catch (error) {
    // In case of an error, return an empty array to prevent the UI from crashing.
    return [];
  }
}

/**
 * Fetches a limited number of recommended books.
 * @param limit - The number of books to fetch.
 * @returns A promise that resolves to an array of recommended books.
 */
export async function getRecommendedBooks(params?: URLSearchParams | Record<string, string> | string): Promise<Book[]> {
  return getBooks(params);
}

/**
 * Fetches a book by its ID.
 * @param bookId - The ID of the book to fetch.
 * @returns A promise that resolves to the book with the given ID.
 * @throws If the book with the given ID does not exist, an empty array is returned.
 */
export async function fetchBookCategories(params?: URLSearchParams | Record<string, string> | string): Promise<BookCategories[]> {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/categories/book${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
      // Using no-cache to ensure fresh data on every request,
      // or revalidate for periodic refetching.
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },

    });

    if (!response.ok) {
      console.error("Failed to fetch books");
    }

    const result = await response.json();
    // The API returns an empty `data` array when there are no results,
    // which is fine. No need to return an empty array explicitly.
    return result.data;
  } catch (error) {
    console.error("Error fetching books categories:", error);
    // In case of an error, return an empty array to prevent the UI from crashing.
    return [];
  }
}

export async function fetchBookAuthors(params?: URLSearchParams | Record<string, string> | string): Promise<BookAuthors[]> {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/author/book${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
      // Using no-cache to ensure fresh data on every request,
      // or revalidate for periodic refetching.
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },

    });

    if (!response.ok) {
      console.error("Failed to fetch books");
    }

    const result = await response.json();
    // The API returns an empty `data` array when there are no results,
    // which is fine. No need to return an empty array explicitly.
    return result.data;
  } catch (error) {
    console.error("Error fetching books categories:", error);
    // In case of an error, return an empty array to prevent the UI from crashing.
    return [];
  }
}