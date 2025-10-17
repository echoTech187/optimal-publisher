/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from '@iconify/react';
import { Book } from "@/types/book";
interface BookWritter {
    name: string;
    // other properties
}
const DetailBook = () => {
    const router = useParams();
    const slug = router.slug;
    const [bookDetail, setData] = useState<Book>([]);
    const [recommendedBooks, setRecommendedBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function getRecommendedBooks() {
            const response = await fetch("http://127.0.0.1:8000/api/v1/book?length=5");
            const book = await response.json();
            if (book.data.length === 0) {
                setRecommendedBooks(book.data);
            } else {
                setRecommendedBooks([]);
            }

        }
        async function getData() {
            const response = await fetch("http://127.0.0.1:8000/api/v1/book/" + slug);

            const book: { data: Book[] } = await response.json();

            setData(book.data);
            setIsLoading(false);


        }

        getData();
        // getRecommendedBooks();
    }, [slug]);

    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>;
    }
    // document.title = bookDetail.length > 0 ? bookDetail.title : "Buku | Optimal Untuk Negeri";

    console.log('data', bookDetail);
    return (
        <>
            <section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-[150px]">
                    <div className="flex flex-col md:flex-row items-start">
                        <div className="md:w-1/3 md:mr-8">
                            <Image priority={true} src={`http://127.0.0.1:8000/storage/${bookDetail.cover ? bookDetail.cover : "no-image.png"}`} title={bookDetail.title} alt={bookDetail.title.toString()} className="w-full h-full object-cover rounded-lg" width={100} height={100} />
                        </div>
                        <div className="md:w-full">
                            <h2 className="text-3xl font-bold mb-4">{bookDetail.title}</h2>
<div className="mb-4" dangerouslySetInnerHTML={{ __html: bookDetail.description }}></div>
                            <p className="text-gray-600">Penulis :</p>
                            {Array.isArray(bookDetail.book_authors) ? (
                                <ul className="mb-4">{
                                    bookDetail.book_authors.map((author: any, index: number)=>{
                                        return <li key={index}>{author.book_writter.name}</li>
                                    })
                                }
                                </ul>
                            ) : (
                                <p className="text-gray-600 mb-4">tidak ada penulis</p>
                            )
                            }
                            <p className="text-gray-600">Kategori :</p> <p className="mb-4">{bookDetail.category.category}</p>


                            <p className="text-gray-600 mb-4">Harga : {(bookDetail.price ? bookDetail.price : 0).toLocaleString()}</p>
                            
                            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2 font-bold"><Icon icon="tabler:brand-whatsapp" className="size-6" /> <span>Beli Sekarang</span></button>
                        </div>

                    </div>


                </div>
                
            </section>
            {/* <BookRecomend bookList={recommendedBooks} isLoading={isLoading} /> */}

        </>
    );
}

export default DetailBook