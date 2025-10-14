
import ProgramCardSkeleton from "./ProgramCardSkeleton";

const ProgramListLoading = () => {
    return (
        <section className="w-full h-auto py-[150px] px-4 max-w-[1300px] mx-auto">
            <header className="relative mb-24 text-center">
                <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto mt-4 animate-pulse"></div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {[...Array(3)].map((_, index) => (
                    <ProgramCardSkeleton key={index} />
                ))}
            </main>
        </section>
    );
}

export default ProgramListLoading;
