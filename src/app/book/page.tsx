/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { BookRecomend, BookSection, BookSectionLoading } from "./index";

import { useEffect, useState } from "react";
import WebLayout from "../layout/web";

const Book = () => {
    const [bookData, setBookData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        async function BookRecomended() {
            const response = await fetch("http://127.0.0.1:8000/api/v1/book?length=5");
            const book = await response.json();
            if (book.data.length === 0) {
                setBookData(book.data)
                setIsLoading(false);
            } else {
                setBookData([])
                setIsLoading(false);
            }
        }
        BookRecomended();
    }, []);

    if (isLoading) return (
        <>
            <BookSectionLoading />
            {/* <BookRecomend bookList={bookData} isLoading={isLoading} /> */}
        </>
    )
    document.title = "Buku | Optimal Untuk Negeri";
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'PT Optimal Untuk Negeri adalah perusahaan terdepan yang bergerak di bidang konsultan kekayaan intelektual, penerbitan buku, penerbitan jurnal, dan lembaga pelatihan kesehatan.';
    document.head.appendChild(metaDescription);
    return (
        <>
            <BookSection />
            {/* <BookRecomend bookList={bookData} isLoading={isLoading} /> */}
        </>
    );
}

export default Book;