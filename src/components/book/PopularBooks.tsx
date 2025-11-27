'use client';

import { usePopularBooks } from '@/features/book/hooks/usePopularBooks';
import BookRecomend, { BookRecomendLoading } from './BookRecomend';

export default function PopularBooks() {
  const { books, loading } = usePopularBooks();

  if (loading) {
    return <BookRecomendLoading />;
  }

  return <BookRecomend bookList={books} />;
}
