
const SkeletonCard = () => (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="h-60 w-full animate-pulse bg-gray-200"></div>
        <div className="flex flex-1 flex-col space-y-3 p-4">
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
            <div className="space-y-2">
                <div className="h-4 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="h-8 w-full animate-pulse rounded-lg bg-gray-200"></div>
        </div>
    </div>
);

export default SkeletonCard;
