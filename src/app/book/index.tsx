/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { lazy, Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FilterBook } from './filter';
import { Icon } from '@iconify/react';

const BookRecomend = async ({ bookList, isLoading }: { bookList: any[], isLoading: boolean }) => {
    useEffect(() => {
        if (!isLoading) {
            const slider = document.getElementById("multi-slide");
            if (slider) {
                const HSCarouselComponent: any = (window as any).HSCarousel;
                new HSCarouselComponent(slider, { currentIndex: 0, loadingClasses: "opacity-0", slidesQty: { xs: 2, sm: 2, md: 3, lg: 4 } });
            }
        }
    }, [isLoading]);
    if (isLoading) return (<section className="container">
        <div className="flex flex-col items-center justify-center">
            <h2>Buku Pilihan</h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mt-4 w-full text-center">Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
        </div>
        <div
            id="multi-slide"
            data-carousel='{ "loadingClasses": "opacity-0", "slidesQty": { "xs": 2, "sm": 2, "md": 3, "lg": 4 } }'
            className="relative w-full my-0 md:mt-8 lg:mt-16"
        >
            <div className="carousel h-80 rounded-none">
                <div className="carousel-body h-full opacity-0 gap-4">
                    {

                        [...Array(5)].map((item, index) => {
                            return (
                                <div className='carousel-slide flex flex-col items-start justify-start gap-4 text-center h-full' key={index}>
                                    <div className="animate-pulse bg-gray-300 rounded-t-lg object-cover w-full min-h-[200px] h-[200px]"></div>
                                    <div className="animate-pulse bg-gray-300 rounded-lg w-1/3 min-h-[30px] h-[30px]"></div>
                                    <div className="animate-pulse bg-gray-300 rounded-lg w-full min-h-[50px] h-[50px]"></div>
                                    <div className=" w-full min-h-[50px] h-[50px] flex items-center justify-between gap-4">
                                        <div className="animate-pulse bg-gray-300 rounded-lg w-1/2 min-h-[30px] h-[30px]"></div>
                                        <div className="animate-pulse bg-gray-300 rounded-lg w-1/2 min-h-[30px] h-[30px]"></div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>

            <button type="button" className="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                <span className="icon-[tabler--chevron-left] size-5 cursor-pointer"></span>
                <span className="sr-only">Previous</span>
            </button>
            <button type="button" className="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                <span className="icon-[tabler--chevron-right] size-5"></span>
                <span className="sr-only">Next</span>
            </button>
        </div>

    </section>)
    return (
        <section className="container">
            <div className="flex flex-col items-center justify-center">
                <h2>Buku Pilihan</h2>
                <p className="text-sm font-bold text-gray-800 mt-4 w-full text-center">Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
            </div>
            {
                (!isLoading) &&
                <div
                    id="multi-slide"
                    data-carousel='{ "loadingClasses": "opacity-0", "slidesQty": { "xs": 2, "sm": 2, "md": 3, "lg": 4 } }'
                    className="relative w-full my-0 md:mt-8 lg:mt-16"
                >
                    <div className="carousel h-[400px] rounded-none">
                        <div className="carousel-body h-full opacity-0">
                            {
                                (!isLoading) && bookList.map((item, index) => {
                                    return (
                                        <div className="carousel-slide" key={index}>
                                            <div className='h-[250px] w-auto flex justify-center '>
                                                <Image priority={true}priority={true} src={`http://127.0.0.1:8000/${item.book_image}`} alt={item.book_title} className="object-contain w-[250px] h-full" width={0} height={0} />
                                            </div>
                                            <div className="card-body justify-between ">
                                                <span className="text-xs text-[var(--primary)] font-normal bg-purple-50 w-fit px-4 py-1 rounded-full">{item.categories.book_category_title}</span>
                                                <h5 className={`uppercase max-sm:text-xs font-semibold text-gray-600 w-full truncate overflow-hidden text-ellipsis text-left line-clamp-2 whitespace-normal flex-1`}>{item.book_title}</h5>
                                                <div className={`flex items-center justify-between gap-2 w-full`}>
                                                    <span className=""></span>
                                                    <button className="flex items-center justify-center px-4 py-2 bg-green-700 gap-2 text-white text-xs font-normal rounded-md  hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 cursor-pointer" onClick={() => { window.location.href = `/book/${item.slug}` }}><Icon icon="tabler:brand-whatsapp" className='size-5' />
                                                        <span>Pesan</span></button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>

                    <button type="button" className="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-50 size-9.5  flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                        <Icon icon="tabler:chevron-left" width={24} height={24} />
                        <span className="sr-only">Previous</span>
                    </button>
                    <button type="button" className="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                        <Icon icon="tabler:chevron-right" width={24} height={24} />
                        <span className="sr-only">Next</span>
                    </button>
                </div>
            }
        </section>
    );
};



const BookSection = () => {
    const [params, setParams] = useState(new URLSearchParams());
    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            if (params) {
                const response = await fetch("http://127.0.0.1:8000/api/v1/book?" + params.toString());
                const book = await response.json();
                if (book.data.length === 0) {
                    setBookData(book.data)
                    setIsLoading(false);
                } else {
                    setBookData([])
                    setIsLoading(false);
                }

            } else {
                const response = await fetch("http://127.0.0.1:8000/api/v1/book");
                const book = await response.json();
                if (book.data.length === 0) {
                    setBookData(book.data)
                    setIsLoading(false);
                } else {
                    setBookData([])
                    setIsLoading(false);
                }
            }

        }
        fetchData();
    }, [params]);

    if (isLoading) return (<BookSectionLoading />)
    return (
        <section className="max-w-[1300px] mx-auto px-4 text-center py-[150px]">
            <header className={`max-w-[1300px] mx-auto px-4 text-center`}>
                <h1 className="text-4xl anton z-10 text-gray-700 dark:text-gray-50 leading-tight text-center">Daftar Buku Optimal</h1>
                <p>Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
            </header>
            <div className='flex items-start justify-start mb-8'>
                {/* <Suspense>
                <FilterBook onUpdateParams={setParams} />
            </Suspense> */}
                <BookList data={bookData} />
            </div>
        </section>
    )
}

const BookList = ({ data }: { data: any[] }) => {

    return (<>
        <div className='flex-1' >

            <div className='flex flex-col items-start justify-start mb-8'>
                <h2 className='text-xl font-bold text-[var(--primary)] '>Hasil Pencarian</h2>
                <p className='text-sm text-slate-500'>Hasil pencarian {data.length} buku</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-auto rounded-xl">
                {
                    data.map((item, index) => {
                        return (
                            <BookListItems key={index} data={item} />
                        )
                    })
                }

            </div>
        </div>


    </>
    );
}

const BookListItems = ({ data }: { data: any }) => {
    const { slug, book_image, book_title, categories, book_price } = data;
    return (
        <div className="flex flex-col items-start justify-start gap-4 text-center h-full border border-gray-200 rounded-lg">
            <Image priority={true}priority={true} src={`http://127.0.0.1:8000/${book_image}`} alt={book_title} className="object-contain w-full" width={124} height={124} title={book_title} sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
            <div className='p-4 flex flex-col items-start justify-start gap-2'>
                <h6 className="text-xs text-[var(--primary)] font-normal bg-purple-50 w-fit px-4 py-1 rounded-full">{categories.book_category_title}</h6>
                <Link href={`/book/${slug}`} className="max-sm:text-xs text-gray-600 w-full truncate overflow-hidden text-ellipsis text-left line-clamp-3 whitespace-normal flex-1 capitalize lowercase " title={book_title}>{book_title}</Link>
            </div>
        </div>
    );
}
const BookSectionLoading = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [params, setParams] = useState(new URLSearchParams());
    return (
        <>
            <section className="max-w-[1300px] mx-auto px-4 text-center py-[150px]">
                <header className={`max-w-[1300px] mx-auto px-4 text-center mb-12`}>
                    <h1 className="text-4xl anton z-10 text-gray-700 dark:text-gray-50 leading-tight text-center">Daftar Buku Optimal</h1>
                    <p>Dapatkan buku terbaru dari Optimal Untuk Negeri</p>
                </header>
                {/* <Suspense>
                    <FilterBook onUpdateParams={setParams} />
                </Suspense> */}
                <div className='flex-1' >
                    <div className='flex flex-col items-start justify-start mb-8'>
                        <h2 className='text-2xl font-bold text-[var(--primary)] '>Hasil Pencarian</h2>
                        {/* <p className='text-sm text-slate-500'>Hasil pencarian 0 buku</p> */}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-auto rounded-xl">
                        {
                            [...Array(12)].map((item, index) => {
                                return (
                                    <div className='flex flex-col items-start justify-start gap-4 text-center h-full border border-gray-200 rounded-lg p-4' key={index}>
                                        <div className="animate-pulse bg-gray-300 rounded-t-lg object-cover w-full min-h-[200px] h-[200px]"></div>
                                        <div className="animate-pulse bg-gray-300 rounded-lg w-1/3 min-h-[30px] h-[30px]"></div>
                                        <div className="animate-pulse bg-gray-300 rounded-lg w-full min-h-[50px] h-[50px]"></div>
                                    </div>
                                );
                            })

                        }
                    </div>
                </div>
            </section>
        </>
    );
}
export { BookRecomend, BookSection, BookSectionLoading };