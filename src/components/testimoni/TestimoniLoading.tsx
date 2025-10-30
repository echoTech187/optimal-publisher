const TestimonialCardSkeleton = () => (
    <div className="w-full p-6 my-6 rounded-lg flex flex-col items-center text-center animate-pulse">
        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
        <div className="space-y-2 w-full max-w-sm">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mt-4 mx-auto"></div>
    </div>
);

const TestimoniLoading = () => {
    return (
        <section className="w-full h-auto py-[100px] bg-gray-200">
            <div className="px-4 container mx-auto 2xl:px-0 text-center">
                <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-12 animate-pulse"></div>
            </div>
            <div className="relative w-full px-4 container mx-auto 2xl:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCardSkeleton />
                <TestimonialCardSkeleton />
                <TestimonialCardSkeleton />
            </div>
        </section>
    );
};

export default TestimoniLoading;