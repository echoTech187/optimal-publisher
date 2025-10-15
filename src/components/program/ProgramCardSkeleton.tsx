'use client';

const ProgramCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 flex flex-col sm:flex-row items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-4 sm:mb-0">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4 sm:mb-0"></div>
                <div className="sm:ml-6 flex-1">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                </div>
            </div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mt-4 sm:mt-0"></div>
        </div>
    );
}

export default ProgramCardSkeleton;