
'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import { getRecommendedBooks } from '@/features/book/data';
import BookRecomend, { BookRecomendLoading } from './BookRecomend';

export default function PopularBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const recommendedBooks = await getRecommendedBooks(10); // Fetch 10 popular books
      setBooks(recommendedBooks);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <BookRecomendLoading />;
  }

  return <BookRecomend bookList={books} />;
}
