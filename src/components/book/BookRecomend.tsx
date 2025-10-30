/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

import { Book } from '@/types/book';
import { getImageUrl } from '@/lib/utils/image';
import SkeletonCard from '@/components/ui/SkeletonCard';

const BookRecomend = ({ bookList }: { bookList: Book[] }) => {

    useEffect(() => {
        requestAnimationFrame(() => {
            if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
                window.HSStaticMethods.autoInit();
            }
        });
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <section className="mx-auto container my-[150px]">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold z-10 text-gray-700 dark:text-gray-50">Buku Pilihan</h2>
                <p className=" font-bold text-gray-800 mt-4 w-full text-center">Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
            </div>
            <div
                id="multi-slide-recomend" // Use a unique ID
                data-carousel='{ "loadingClasses": "opacity-0", "slidesQty": { "xs": 2, "sm": 3, "md": 3, "lg": 4 ,"xl": 5 } }'
                className="relative w-full mt-16"
            >
                <div className="carousel rounded-none">
                    <div className="carousel-body h-full opacity-0 gap-4">
                        {bookList.map((item, index) => {
                            const imageUrl = getImageUrl(item.cover);
                            return (
                                <div className={`carousel-slide ${index === 0 ? "sm:[&]:ml-4 " : ""}`} key={item.id}>
                                    <div className='w-full mb-3'>
                                        <Image src={imageUrl} alt={item.title} className="object-cover w-full h-[320px]" width={250} height={320} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 15vw" />
                                    </div>
                                    <div className="flex flex-col items-start justify-between gap-3 ">
                                        <span className="text-xs text-[var(--primary)] font-normal bg-purple-50 w-fit px-4 py-1 rounded-full">{item.categories?.category}</span>
                                        <a href={`/book/${item.slug}`} className={`max-sm:text-xs cursor-pointer font-semibold text-gray-600 w-full truncate overflow-hidden text-ellipsis text-left line-clamp-2 whitespace-normal flex-1 min-h-12`}>{item.title}</a>
                                        <div className={`flex items-center justify-between w-full`}>
                                            <span className=""></span>
                                            {/* Using a Link is better for navigation than window.location.href */}
                                            <a href={`/book/${item.slug}`} className="flex items-center justify-center w-full px-4 py-2 bg-fuchsia-700 gap-2 text-white text-sm font-normal rounded-md  hover:bg-fuchsia-900 hover:font-semibold transition-colors duration-300 cursor-pointer">
                                                <Icon icon="tabler:brand-whatsapp" className='size-5' />
                                                <span>Pesan via WhatsApp</span>
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
    <section className="container mx-auto px-4 text-center pb-[150px]">
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold z-10 text-gray-700 dark:text-gray-50">Buku Pilihan</h2>
            <p className="font-bold text-gray-800 mt-4 w-full text-center">Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
        </div>
        <div className="relative w-full mt-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(5)].map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    </section>
);

export default BookRecomend;