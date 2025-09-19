/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BookRecomend } from "../index";
import { Icon } from '@iconify/react';

 const DetailBook = () => {
    const router = useParams();
    const slug = router.slug;
    const [data, setData] = useState<any>({});
    const [recommendedBooks, setRecommendedBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function getRecommendedBooks() {
            const response = await fetch("http://127.0.0.1:8000/api/v1/book?length=5");
            const book = await response.json();
            setRecommendedBooks(book.data);
        }
        async function getData() {
            const response = await fetch("http://127.0.0.1:8000/api/v1/book/" + slug);

            const book = await response.json();

            setData(book);
            setIsLoading(false);

        }

        getData();
        getRecommendedBooks();
    }, [slug]);

    if (isLoading) {
        return <section>Loading...</section>;
    }
    if (!isLoading) {
        document.title = data?.book_title || "Buku | Optimal Untuk Negeri";
    }

    return (
        <>
            <section>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-start">
                        <div className="md:w-1/2 md:mr-8">
                            <Image priority={true} sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' src={`http://127.0.0.1:8000/${data.book_image ? data.book_image : "no-image.png"}`} title={data?.book_title} alt={data.book_title} className="w-full h-full object-cover rounded-lg" width={100} height={100} />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">{data.book_title}</h2>

                            <p className="text-gray-600">Penulis :</p>
                            {Array.isArray(data.author) ? (
                                <ul className="mb-4">{data.author.map((author: any, index: number) => <li key={index}>{`${author.author_name}, ${author.author_title}`}</li>)}</ul>
                            ) : (
                                <div className="mb-4">{`${data.author.author_name}, ${data.author.author_title}`}</div>
                            )}
                            <p className="text-gray-600 mb-4">Kategori : {data.categories.book_category_title}</p>


                            <p className="text-gray-600 mb-4">Harga : {parseInt(data.book_price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2 font-bold"><Icon icon="tabler:brand-whatsapp" className="size-6" /> <span>Beli Sekarang</span></button>
                        </div>

                    </div>

                </div>
                <div className="mb-4" dangerouslySetInnerHTML={{ __html: data.book_description }}></div>

            </section>
            {/* <BookRecomend bookList={recommendedBooks} isLoading={isLoading} /> */}
        </>
    );
}

export default DetailBook