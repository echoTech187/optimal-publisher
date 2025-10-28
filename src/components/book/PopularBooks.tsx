
'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import { getRecommendedBooks } from '@/features/book/data';
import BookRecomend, { BookRecomendLoading } from './BookRecomend';
import { useSearchParams } from 'next/navigation';

export default function PopularBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('limit', '10');
      params.append('program_category', searchParams.get('feature') || '');
      const recommendedBooks = await getRecommendedBooks(params); // Fetch 10 popular books
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
