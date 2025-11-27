'use client';

import { useBooks } from '@/features/book/hooks/useBooks';
import BookList from '@/components/book/BookList';
import PopularBooks from '@/components/book/PopularBooks';
import FullPageLoader from '@/components/ui/FullPageLoader';

export default function BookPage() {
  const {
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
  } = useBooks();

  return (
    <div className="bg-white">
      <main className="mx-auto container px-4 sm:px-6 lg:px-8 my-[150px]">
        <div className="text-center pb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Daftar Buku</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-500">
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
              className="input w-full rounded-md"
            />
          </div>
          <div className="w-full sm:w-auto flex items-center gap-4 justify-end">
            <select
              value={authorSelected}
              onChange={(e) => setAuthorSelected(e.target.value)}
              className="select w-full"
            >
              <option value="Semua Penulis">Semua Penulis</option>
              {bookAuthors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select w-full"
            >
              <option value="Semua Kategori">Semua Kategori</option>
              {bookCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <BookList data={books} loading={loading && page === 1} />

        {/* Loading indicators */}
        {loading && page > 1 && <p className="text-center text-gray-500 py-8">Memuat lebih banyak buku...</p>}
        {!hasMore && books.length > 0 && <p className="text-center text-gray-500 py-8">Semua buku telah ditampilkan.</p>}

        <div ref={loader} className="h-10" />

        <PopularBooks />
      </main>
    </div>
  );
}