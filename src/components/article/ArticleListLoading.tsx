
const ArticleCardSkeleton = () => (
  <div className="w-full">
    <div className="w-full h-48 bg-gray-300 rounded-lg animate-pulse mb-4"></div>
    <div className="flex items-center text-sm text-gray-500 mb-2">
      <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
      <div className="mx-2">•</div>
      <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
    </div>
    <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse mt-1"></div>
  </div>
);

const ArticleListLoading = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold h-9 bg-gray-300 rounded w-1/4 animate-pulse"></h2>
        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(4)].map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ArticleListLoading;
