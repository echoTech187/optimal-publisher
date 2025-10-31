const ArticleCardSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Desktop Skeleton (md and up) */}
            <div className="hidden md:block">
                <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="mt-4 space-y-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
            </div>
            {/* Mobile Skeleton (below md) */}
            <div className="md:hidden flex gap-4">
                <div className="w-1/3">
                    <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                </div>
                <div className="w-2/3 space-y-2 py-1">
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCardSkeleton;
