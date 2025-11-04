
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from '@iconify/react';
import { Book } from "@/types/book";
import NotFound from "@/components/ui/NotFound";
import FullPageLoader from '@/components/ui/FullPageLoader';
interface BookWritter {
    name: string;
    // other properties
}
const DetailBook = () => {
    const router = useParams();
    const slug = router.slug;
    const [bookDetail, setData] = useState<Book>({
        book_authors: [],
        id: 0,
        isbn: "",
        title: "",
        slug: "",
        book_writters: [],
        author: "",
        cover: "",
        cover_size: "",
        edition: "",
        series: "",
        page_length: 0,
        description: "",
        price: 0,
        type: {
            name: "",
        },
        categories: {
            id: 0,
            category: "",
        },
        reading: {
            name: ""
        },
        media: {
            name: "",
        },
        library: {
            name: "",
        },
        publisher: {
            name: ""
        }
    });
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
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

            const book = await response.json();

            setData(book.data);
            setIsLoading(false);


        }

        getData();
        // getRecommendedBooks();
    }, [slug]);

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (!bookDetail) {
        return (
            <NotFound />
        );
    }

    document.title = bookDetail ? bookDetail.title : "Buku | Optimal Untuk Negeri";
    return (
        <>
            <section className="my-24 md:py-32 bg-gray-50">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Book Cover */}
                        <div className="w-full lg:w-1/3">
                            <div className="sticky top-28">
                                <Image
                                    priority
                                    src={`http://127.0.0.1:8000/storage/${bookDetail.cover || "no-image.png"}`}
                                    title={bookDetail.title}
                                    alt={bookDetail.title}
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                    width={500}
                                    height={750}
                                />
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="w-full lg:w-2/3">
                            <h1 className="max-sm:text-xl text-2xl md:text-4xl font-bold text-gray-900 mb-2">{bookDetail.title}</h1>
                            <div className="mb-6">
                                <p className="mb-2 text-sm text-gray-600">
                                    {bookDetail.created_at && new Date(bookDetail.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })} {bookDetail.isbn ? ' | ISBN: ' + bookDetail.isbn : ""}
                                </p>

                                {Array.isArray(bookDetail.categories) && bookDetail.categories.length > 0 && (
                                    <div className="flex gap-2 mb-2">
                                        {
                                            bookDetail.categories.map((category: any) => (
                                                <span key={category.id} className="badge badge-outline badge-primary max-sm:text-sm text-fuchsia-800">{category.category}</span>
                                            ))
                                        }
                                    </div>
                                )}
                                {Array.isArray(bookDetail.book_authors) && bookDetail.book_authors.length > 0 && (
                                    <p className="max-sm:text-sm text-md text-gray-600 mb-3">
                                        ditulis oleh <span className="font-semibold text-gray-800">{bookDetail.book_authors.map((author: any) => author.book_writter.name).join(', ')}</span>
                                    </p>
                                )}
                            </div>

                            <div className="mb-8">
                                <span className="max-sm:text-xl max-xl:text-3xl text-4xl font-bold text-fuchsia-800">
                                    {(bookDetail.price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(bookDetail.price) : '0')}
                                </span>
                            </div>

                            <a
                                href={`https://wa.me/6285156172215?text=Halo, saya tertarik dengan buku "${bookDetail.title}"`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 w-full md:w-auto rounded-md bg-fuchsia-800 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:ring-offset-2 transition-colors duration-300"
                            >
                                <Icon icon="tabler:brand-whatsapp" className="size-6" />
                                <span className="max-sm:text-sm">Pesan via WhatsApp</span>
                            </a>

                            <hr className="my-8 border-gray-200" />

                            {/* Book Specs */}
                            <h2 className="max-sm:text-lgtext-2xl font-bold text-gray-800 mb-6">Detail Buku</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <DetailItem label="ISBN" value={bookDetail.isbn} />
                                {/* <DetailItem label="Jenis Pustaka" value={bookDetail.library.name} /> */}
                                <DetailItem label="Kategori" value={bookDetail.categories.category} />
                                {/* <DetailItem label="Penerbit" value={bookDetail.publisher.name} /> */}
                                {/* <DetailItem label="Media" value={bookDetail.media.name} /> */}
                                {/* <DetailItem label="Jenis ISBN" value={bookDetail.type.name} /> */}
                                {/* <DetailItem label="Kelompok Pembaca" value={bookDetail.reading.name} /> */}
                                {/* <DetailItem label="Jumlah Halaman" value={bookDetail.page_length} /> */}
                                {/* <DetailItem label="Ukuran" value={bookDetail.cover_size} /> */}
                                {/* <DetailItem label="Edisi" value={bookDetail.edition} /> */}
                                {/* <DetailItem label="Seri" value={bookDetail.series} /> */}
                            </div>

                            {bookDetail.description && (
                                <>
                                    <hr className="my-8 border-gray-200" />
                                    <h2 className="max-sm:text-lg text-2xl font-bold text-gray-800 mb-4">Deskripsi</h2>
                                    <div className="prose prose-lg max-w-none text-gray-600 text-editor" dangerouslySetInnerHTML={{ __html: bookDetail.description }}></div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* <BookRecomend bookList={recommendedBooks} isLoading={isLoading} /> */}
        </>
    );
}

const DetailItem = ({ label, value }: { label: string, value: string | number | null | undefined }) => {
    if (!value) return null;
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-base font-semibold text-gray-800">{value}</p>
        </div>
    );
};


export default DetailBook