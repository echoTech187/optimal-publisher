/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

// Consistent type definition for a single book
interface Book {
    id: number;
    book_title: string;
    slug: string;
    book_image: string;
    categories: {
        book_category_title: string;
    };
}

import { getImageUrl } from '@/lib/utils/image';

const BookRecomend = ({ bookList }: { bookList: Book[] }) => {

    useEffect(() => {
        // Initialize the carousel after the component has mounted
        const slider = document.getElementById("multi-slide-recomend");
        if (slider) {
            const HSCarouselComponent: any = (window as any).HSCarousel;
            if (HSCarouselComponent) {
                new HSCarouselComponent(slider, { currentIndex: 0, loadingClasses: "opacity-0", slidesQty: { xs: 2, sm: 2, md: 3, lg: 4 } });
            }
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <section className="container">
            <div className="flex flex-col items-center justify-center">
                <h2>Buku Pilihan</h2>
                <p className="text-sm font-bold text-gray-800 mt-4 w-full text-center">Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
            </div>
            <div
                id="multi-slide-recomend" // Use a unique ID
                data-carousel='{ "loadingClasses": "opacity-0", "slidesQty": { "xs": 2, "sm": 2, "md": 3, "lg": 4 } }'
                className="relative w-full my-0 md:mt-8 lg:mt-16"
            >
                <div className="carousel h-[400px] rounded-none">
                    <div className="carousel-body h-full opacity-0 gap-4">
                        {bookList.map((item) => {
                            const imageUrl = getImageUrl(item.book_image);
                            return (
                                <div className="carousel-slide" key={item.id}>
                                    <div className='h-[250px] w-auto flex justify-center '>
                                        <Image priority={true} src={imageUrl} alt={item.book_title} className="object-contain w-[250px] h-full" width={250} height={250} />
                                    </div>
                                    <div className="card-body justify-between ">
                                        <span className="text-xs text-[var(--primary)] font-normal bg-purple-50 w-fit px-4 py-1 rounded-full">{item.categories.book_category_title}</span>
                                        <h5 className={`uppercase max-sm:text-xs font-semibold text-gray-600 w-full truncate overflow-hidden text-ellipsis text-left line-clamp-2 whitespace-normal flex-1`}>{item.book_title}</h5>
                                        <div className={`flex items-center justify-between gap-2 w-full`}>
                                            <span className=""></span>
                                            {/* Using a Link is better for navigation than window.location.href */}
                                            <a href={`/book/${item.slug}`} className="flex items-center justify-center px-4 py-2 bg-green-700 gap-2 text-white text-xs font-normal rounded-md  hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                                                <Icon icon="tabler:brand-whatsapp" className='size-5' />
                                                <span>Pesan</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button type="button" className="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-50 size-9.5 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                    <Icon icon="tabler:chevron-left" width={24} height={24} />
                    <span className="sr-only">Previous</span>
                </button>
                <button type="button" className="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                    <Icon icon="tabler:chevron-right" width={24} height={24} />
                    <span className="sr-only">Next</span>
                </button>
            </div>
        </section>
    );
};

export const BookRecomendLoading = () => (
    <section className="container">
        <div className="flex flex-col items-center justify-center">
            <h2>Buku Pilihan</h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mt-4 w-full text-center">Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
        </div>
        <div className="relative w-full my-0 md:mt-8 lg:mt-16">
            <div className="carousel h-80 rounded-none">
                <div className="carousel-body h-full opacity-100 gap-4">
                    {[...Array(5)].map((_, index) => (
                        <div className='carousel-slide flex flex-col items-start justify-start gap-4 text-center h-full' key={index}>
                            <div className="animate-pulse bg-gray-300 rounded-t-lg object-cover w-full min-h-[200px] h-[200px]"></div>
                            <div className="animate-pulse bg-gray-300 rounded-lg w-1/3 min-h-[30px] h-[30px]"></div>
                            <div className="animate-pulse bg-gray-300 rounded-lg w-full min-h-[50px] h-[50px]"></div>
                            <div className="w-full min-h-[50px] h-[50px] flex items-center justify-between gap-4">
                                <div className="animate-pulse bg-gray-300 rounded-lg w-1/2 min-h-[30px] h-[30px]"></div>
                                <div className="animate-pulse bg-gray-300 rounded-lg w-1/2 min-h-[30px] h-[30px]"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default BookRecomend;
