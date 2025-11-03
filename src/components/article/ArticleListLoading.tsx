
import React from "react";
import ArticleCardSkeleton from "./ArticleCardSkeleton";

const ArticleListLoading = () => {
  // A simple responsive skeleton loader
  const getSkeletonCount = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 5;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  };

  const [skeletonCount, setSkeletonCount] = React.useState(4);

  React.useEffect(() => {
    const handleResize = () => {
      setSkeletonCount(getSkeletonCount());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [skeletonCount]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ArticleListLoading;

