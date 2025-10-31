const TestimonialCardSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 mb-4"></div>
            <div className="space-y-2 flex-grow w-full">
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            </div>
            <div className="mt-4 w-full">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-1"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
            </div>
        </div>
    );
};

export default TestimonialCardSkeleton;
