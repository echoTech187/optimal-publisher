
const ProgramCardSkeleton = () => (
    <div className="card w-full bg-base-100 shadow-xl">
        <div className="h-96 bg-gray-300 animate-pulse"></div>
        <div className="card-body">
            <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse mt-2"></div>
            <div className="card-actions justify-center mt-4">
                <div className="h-12 bg-gray-300 rounded w-full animate-pulse"></div>
            </div>
        </div>
    </div>
);

export default ProgramCardSkeleton;
