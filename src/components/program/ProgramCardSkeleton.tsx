const ProgramCardSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Desktop Skeleton */}
            <div className="hidden md:flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="w-36 h-36 rounded-full bg-gray-300 dark:bg-gray-700 mb-4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-1"></div>
            </div>

            {/* Mobile Skeleton */}
            <div className="md:hidden flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md gap-4">
                <div className="w-1/3">
                    <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="w-2/3 space-y-2">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
};

export default ProgramCardSkeleton;
