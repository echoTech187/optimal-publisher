
import SkeletonCard from "../ui/SkeletonCard";

const BookListLoading = () => {
    return (
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
            {[...Array(20)].map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};

export default BookListLoading;
