
import BookList from "@/components/book/BookList";

// Consistent type definition for a single book
interface Book {
    id: number;
    book_title: string;
    slug: string;
    book_image: string;
    categories: {
        book_category_title: string;
    };
}

const BookSection = ({ books }: { books: Book[] }) => {
    return (
        <section className="max-w-[1300px] mx-auto px-4 text-center py-[150px]">
            <header className="max-w-[1300px] mx-auto px-4 text-center mb-12">
                <h1 className="text-4xl anton z-10 text-gray-700 dark:text-gray-50 leading-tight text-center">Daftar Buku Optimal</h1>
                <p>Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
            </header>
            <div className='flex items-start justify-start mb-8'>
                {/* The FilterBook component can be added back here later if needed */}
                <BookList data={books} />
            </div>
        </section>
    );
}

export default BookSection;
