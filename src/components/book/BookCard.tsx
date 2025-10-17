
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types/book';
import { getImageUrl } from '@/lib/utils/image';

const BookCard = ({ book }: { book: Book }) => {
  const { slug, cover, title, author, price } = book;
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
      <div className="flex flex-1 flex-col space-y-2 gap-1 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/book/${slug}`} className='overflow-hidden line-clamp-2'>
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{author}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-gray-900">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)}
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
