
import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getBooks, getRecommendedBooks } from '@/features/book/data';

import BookSection from '@/components/book/BookSection';
import BookRecomend, { BookRecomendLoading } from '@/components/book/BookRecomend';
import BookSectionLoading from '@/components/book/BookSectionLoading';

export const metadata: Metadata = {
  title: 'Buku | Optimal Untuk Negeri',
  description: 'PT Optimal Untuk Negeri adalah perusahaan terdepan yang bergerak di bidang konsultan kekayaan intelektual, penerbitan buku, penerbitan jurnal, dan lembaga pelatihan kesehatan.',
  // You can add more metadata here, like openGraph, etc.
};

// This is an async Server Component
export default async function BookPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  // Convert searchParams to URLSearchParams for our data fetching function
  const params = new URLSearchParams();
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        params.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      }
    });
  }

  // We can fetch data for different components in parallel
  const booksPromise = getBooks(params);
  const recommendedBooksPromise = getRecommendedBooks(5);

  return (
    <>
      {/* The main book list section */}
      <Suspense fallback={<BookSectionLoading />}>
        
        <BookListFetcher promise={booksPromise} />
      </Suspense>

      {/* The recommended books carousel at the bottom */}
      <Suspense fallback={<BookRecomendLoading />}>
        
        <RecommendedBooksFetcher promise={recommendedBooksPromise} />
      </Suspense>
    </>
  );
}

// Helper component to await the promise for the main book list
async function BookListFetcher({ promise }: { promise: Promise<any[]> }) {
  const books = await promise;
  return <BookSection books={books} />;
}

// Helper component to await the promise for the recommended books
async function RecommendedBooksFetcher({ promise }: { promise: Promise<any[]> }) {
  const recommendedBooks = await promise;
  return <BookRecomend bookList={recommendedBooks} />;
}
