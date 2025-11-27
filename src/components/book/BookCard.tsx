
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types/book';
import { getImageUrl } from '@/lib/utils/image';

const BookCard = ({ book }: { book: Book }) => {
  const { slug, cover, title, author, price, book_authors } = book;
  const imageUrl = getImageUrl(cover);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg backdrop-blur-md bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/book/${slug}`} className="block">

        <div className="max-md:h-60 h-80 bg-white p-2">
          <Image
            src={imageUrl}
            alt={title}
            width={1024}
            height={512}
            priority={true}
            className="h-full w-full object-cover object-center rounded-lg"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col space-y-2 gap-1 px-2 py-2 justify-between">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          <Link href={`/book/${slug}`} className='overflow-hidden line-clamp-2'>
            {title}
          </Link>
        </h3>
        <div className="mb-1">
          {Array.isArray(book_authors) && book_authors.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 overflow-hidden w-full">
              <b>Oleh</b> {book_authors.map((author: any) => author.book_writer?.name).filter(Boolean).join(', ')}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{author}</p>
        <div className="flex items-center justify-start">
          <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)}
          </p>
        </div>
      </div>
      <div className="p-2">
        <Link
          href={`/book/${slug}`}
          className="flex items-center justify-center rounded-md border border-transparent bg-fuchsia-800 px-8 py-2 text-sm font-medium text-white hover:bg-fuchsia-950"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
