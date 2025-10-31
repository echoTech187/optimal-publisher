const EventCardSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Desktop Skeleton */}
            <div className="hidden md:block rounded-xl shadow-md bg-white dark:bg-gray-800 overflow-hidden">
                <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-1/2 mt-2"></div>
                </div>
            </div>
            {/* Mobile Skeleton */}
            <div className="md:hidden flex items-center rounded-xl h-36 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 gap-2">
                <div className="w-1/3 h-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="w-2/3 h-full flex flex-col justify-between py-1">
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    </div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-full mt-1"></div>
                </div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
