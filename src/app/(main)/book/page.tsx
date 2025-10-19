'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Book } from '@/types/book';
import { getBooks } from '@/features/book/data';
import BookList from '@/components/book/BookList';
import PopularBooks from '@/components/book/PopularBooks';
import { useDebounce } from '@/lib/hooks/useDebounce';
import BookListLoading from '@/components/book/BookListLoading';

// Mock categories as seen in the screenshot
const categories = [
  { id: 0, category: 'Semua Kategori' },
  { id: 1, category: 'Buku Ajar' },
  { id: 2, category: 'Buku Monograf' },
  { id: 3, category: 'Buku Referensi' },
];

const BOOKS_PER_PAGE = 20;

export default function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const loader = useRef<HTMLDivElement>(null);

  const loadBooks = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', BOOKS_PER_PAGE.toString());
    if (debouncedSearchTerm) {
      params.append('search', debouncedSearchTerm);
    }
    if (selectedCategory !== 'Semua Kategori') {
      params.append('category', selectedCategory);
    }
    const newBooks = await getBooks(params);
    console.log(newBooks);
    setBooks((prevBooks) => (page === 1 ? newBooks : [...prevBooks, ...newBooks]));
    setHasMore(newBooks.length === BOOKS_PER_PAGE);
    setLoading(false);
  }, [page, debouncedSearchTerm, selectedCategory, loading, hasMore]);

  useEffect(() => {
    setPage(1);
    setBooks([]);
    setHasMore(true);
  }, [debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

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
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-[150px]">
        <div className="text-center pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Daftar Buku</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Temukan buku-buku terbaik dari berbagai kategori.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Cari berdasarkan judul atau penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input w-full"
            />
          </div>
          <div className="w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select w-full"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.category}>{cat.category}</option>
              ))}
            </select>
          </div>
        </div>

        <BookList data={books} loading={loading} />


        {/* Loading indicators */}
        {loading && page === 1 && <BookListLoading />}
        {loading && page > 1 && <p className="text-center text-gray-500 py-8">Memuat lebih banyak buku...</p>}
        {/* {!hasMore && books.length > 0 && <p className="text-center text-gray-500 py-8">Semua buku telah ditampilkan.</p>} */}

        <div ref={loader} className="text-center py-8" />

        {/* <hr className="my-12" /> */}

        <PopularBooks />
      </main>
    </div>
  );
}