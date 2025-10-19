
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types/book';
import { getImageUrl } from '@/lib/utils/image';

const BookCard = ({ book }: { book: Book }) => {
  const { slug, cover, title, author, price, book_authors } = book;
  const imageUrl = getImageUrl(cover);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg backdrop-blur-md bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/book/${slug}`} className="block">

        <div className="h-80 bg-white p-2">
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={400}
            className="h-full w-full object-cover object-center rounded-lg"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col space-y-2 gap-1 px-2 py-4">
        <h3 className="max-sm:text-xs text-gray-900 mb-0">
          <Link href={`/book/${slug}`} className='overflow-hidden line-clamp-2 font-semibold'>
            {title}
          </Link>
        </h3>
        <div className="mb-1">
          {Array.isArray(book_authors) && book_authors.length > 0 && (
            <p className="text-sm text-gray-600">
              oleh <span className="text-xs font-bold text-gray-800">{book_authors.map((author: any) => author.book_writter.name).join(', ')}</span>
            </p>
          )}
        </div>
        <p className="text-sm text-gray-500">{author}</p>
        <div className="flex items-center justify-start">
          <p className=" max-sm:text-md text-gray-900">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)}
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 right-2 left-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
