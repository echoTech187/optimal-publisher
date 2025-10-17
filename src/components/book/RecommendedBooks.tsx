"use client";

import dynamic from 'next/dynamic';
import { BookRecomendLoading } from './BookRecomend';
import { Book } from '@/types/book';

const BookRecomend = dynamic(() => import('./BookRecomend'), {
    loading: () => <BookRecomendLoading />,
    ssr: false
});

export default function RecommendedBooks({ bookList }: { bookList: Book[] }) {
    return <BookRecomend bookList={bookList} />;
}
