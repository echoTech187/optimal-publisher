
import { Book } from '@/types/book';
import BookCard from './BookCard';
import NotFound from '../ui/NotFound';

const BookList = ({ data, loading }: { data: Book[], loading?: boolean }) => {
    return (
        <div className='flex-1 w-full'>
            {(data.length > 0 || loading) ? (
                <div className="grid grid-cols-1 gap-y-10 gap-x-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  xl:gap-x-4">
                    {data.map((item) => (
                        <BookCard key={item.id} book={item} />
                    ))}
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default BookList;
