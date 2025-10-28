
const ArticleCardSkeleton = () => (
    <div className="bg-white shadow-xs rounded-lg">
        <div className="p-4 flex flex-col gap-4">
            <div className="w-full h-48 bg-gray-300 rounded-lg animate-pulse"></div>
            <div>
                <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
        </div>
    </div>
);

const ArticleListLoading = () => {
    return (
        <div className="container mx-auto px-4 py-[40px] rounded-lg mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(9)].map((_, index) => (
                    <ArticleCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default ArticleListLoading;
