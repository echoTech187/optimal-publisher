
const BookSectionLoading = () => {
    return (
        <section className="container mx-auto px-4 text-center py-[150px]">
            <header className="container mx-auto px-4 text-center mb-12">
                <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto mt-4 animate-pulse"></div>
            </header>
            <div className='flex-1'>
                <div className='flex flex-col items-start justify-start mb-8'>
                    <div className="h-8 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-auto rounded-xl">
                    {
                        [...Array(12)].map((_, index) => (
                            <div className='flex flex-col items-start justify-start gap-4 text-center h-full border border-gray-200 rounded-lg p-4' key={index}>
                                <div className="animate-pulse bg-gray-300 rounded-t-lg object-cover w-full min-h-[200px] h-[200px]"></div>
                                <div className="animate-pulse bg-gray-300 rounded-lg w-1/3 min-h-[30px] h-[30px] mt-2"></div>
                                <div className="animate-pulse bg-gray-300 rounded-lg w-full min-h-[50px] h-[50px]"></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default BookSectionLoading;
