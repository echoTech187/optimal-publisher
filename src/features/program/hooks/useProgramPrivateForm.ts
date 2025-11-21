
"use client";
import { useState, useEffect, useCallback } from 'react';
import { fetchMajors } from '@/features/form/data';
import type { Major } from '@/types/form';

export const useProgramPrivateForm = () => {
    const [majors, setMajors] = useState<Major[]>([]);
    const [bookTitles, setBookTitles] = useState<string>("");

    const [selectedMajor, setSelectedMajor] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const majorData = await fetchMajors();
                setMajors(majorData);
            } catch (err) {
                setError("Gagal memuat data jurusan. Silakan coba lagi.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleMajorChange = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const majorId = e.target.value;
        setSelectedMajor(majorId);
    }, []);
    const handleBookTitleChange = useCallback((e: any) => {
        const bookTitle = e.target.value;
        setBookTitles(bookTitle);
    }, []);

    return {
        majors,
        bookTitles,
        selectedMajor,
        loading,
        error,
        handleMajorChange,
        handleBookTitleChange,
    };
};
