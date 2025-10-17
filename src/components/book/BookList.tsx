
import { Book } from '@/types/book';
import BookCard from './BookCard';

const BookList = ({ data,loading }: { data: Book[], loading?: boolean }) => {
    return (
        <div className='flex-1 w-full'>
            {(data.length > 0 || loading) ? (
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  xl:gap-x-4">
                    {data.map((item) => (
                        <BookCard key={item.id} book={item} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 w-full">Tidak ada buku yang ditemukan.</p>
            )}
        </div>
    );
};

export default BookList;
