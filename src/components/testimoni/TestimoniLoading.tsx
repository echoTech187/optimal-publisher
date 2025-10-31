import TestimonialCardSkeleton from './TestimonialCardSkeleton';
import React from 'react';

const TestimoniLoading = () => {
    const getSkeletonCount = () => {
        if (typeof window === 'undefined') return 3;
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    };

    const [skeletonCount, setSkeletonCount] = React.useState(3);

    React.useEffect(() => {
        const handleResize = () => {
            setSkeletonCount(getSkeletonCount());
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="w-full h-auto py-[100px] bg-gray-100 dark:bg-gray-900" id="reviews">
            <div className="px-4 container mx-auto 2xl:px-0 text-center">
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto mb-12 animate-pulse"></div>
            </div>
            <div className='relative w-full px-4 container mx-auto 2xl:px-0'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <TestimonialCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimoniLoading;