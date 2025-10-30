const FaqItemSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </div>
);

const FaqsLoading = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-700" id="faqs">
            <div className="container mx-auto px-4 py-[100px] rounded-lg mt-6">
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto animate-pulse"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mt-4 mb-12 animate-pulse"></div>
                <div className="space-y-6">
                    <FaqItemSkeleton />
                    <FaqItemSkeleton />
                    <FaqItemSkeleton />
                </div>
                <div className="mt-12 px-12 py-8 bg-gray-300 dark:bg-gray-600 rounded-lg max-md:w-full w-1/2 mx-auto animate-pulse h-32"></div>
            </div>
        </div>
    );
};

export default FaqsLoading;