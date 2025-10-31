const ContactSkeleton = () => {
    return (
        <div className="py-20 lg:py-24 animate-pulse">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-12 bg-gray-200 dark:bg-gray-700 rounded-lg text-center">
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-8"></div>
                    <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-md w-48 mx-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default ContactSkeleton;
