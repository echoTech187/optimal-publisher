"use client";
import { useState } from "react";
import { BookRecomend, BookSection } from "./index";

export default function Book() {
    const [isLoading, setIsLoading] = useState(false);
    const [bookList, setBookList] = useState([]);
    return (<>
        <BookSection />
    </>)
}
