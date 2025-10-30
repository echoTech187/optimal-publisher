const EventCardSkeleton = () => (
    <div className="w-full h-full animate-pulse">
        <div className="bg-gray-300 rounded-xl w-full h-[250px]"></div>
    </div>
);

const NewsEventsLoading = () => {
    return (
        <section className="w-full h-auto py-12 px-4 container mx-auto 2xl:px-0">
            <header className="relative text-2xl font-extrabold text-center mb-12">
                <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto animate-pulse"></div>
            </header>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, index) => (
                    <EventCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
};

export default NewsEventsLoading;