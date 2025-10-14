
import Image from 'next/image';
import Link from 'next/link';

// Consistent type definition for a single book
interface Book {
    id: number;
    book_title: string;
    slug: string;
    book_image: string;
    categories: {
        book_category_title: string;
    };
    // Add other properties if they exist, e.g., book_price
}

import { getImageUrl } from '@/lib/utils/image';

const BookListItems = ({ data }: { data: Book }) => {
    const { slug, book_image, book_title, categories } = data;
    const imageUrl = getImageUrl(book_image);

    return (
        <div className="flex flex-col items-start justify-start gap-4 text-center h-full border border-gray-200 rounded-lg">
            <Link href={`/book/${slug}`} className="w-full">
                <Image
                    priority={true}
                    src={imageUrl}
                    alt={book_title}
                    className="object-contain w-full"
                    width={250}
                    height={250}
                    title={book_title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>
            <div className='p-4 flex flex-col items-start justify-start gap-2 w-full'>
                <span className="text-xs text-[var(--primary)] font-normal bg-purple-50 w-fit px-4 py-1 rounded-full">
                    {categories.book_category_title}
                </span>
                <Link href={`/book/${slug}`} className="max-sm:text-xs text-gray-600 w-full truncate overflow-hidden text-ellipsis text-left line-clamp-3 whitespace-normal flex-1 capitalize" title={book_title}>
                    {book_title}
                </Link>
            </div>
        </div>
    );
};

const BookList = ({ data }: { data: Book[] }) => {
    return (
        <div className='flex-1'>
            <div className='flex flex-col items-start justify-start mb-8'>
                <h2 className='text-xl font-bold text-[var(--primary)]'>Hasil Pencarian</h2>
                <p className='text-sm text-slate-500'>Ditemukan {data.length} buku</p>
            </div>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-auto rounded-xl">
                    {data.map((item) => (
                        <BookListItems key={item.id} data={item} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 w-full">Tidak ada buku yang ditemukan.</p>
            )}
        </div>
    );
};

export default BookList;
