
const ArticleDetailLoading = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-700 min-h-screen">
            <div className="container mx-auto px-4 py-[100px] rounded-lg mt-12 animate-pulse">
                <div className="mb-12">
                    <div className="h-14 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </div>
                <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
                <div className="py-12 space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mt-8"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetailLoading;
