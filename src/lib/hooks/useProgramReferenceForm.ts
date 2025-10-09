import { useState, useEffect, useCallback } from 'react';
import { fetchMajor, fetchBookTitle, fetchBookTopic } from '@/lib/data/program';
import type { Major, BookTitle, BookTopic } from '@/types/program';

export const useProgramReferenceForm = () => {
    const [majors, setMajors] = useState<Major[]>([]);
    const [bookTitles, setBookTitles] = useState<BookTitle[]>([]);
    const [bookTopics, setBookTopics] = useState<BookTopic[]>([]);

    const [selectedMajor, setSelectedMajor] = useState<string>("");
    const [selectedBookTitle, setSelectedBookTitle] = useState<string>("");
    const [selectedBookTopic, setSelectedBookTopic] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const majorData = await fetchMajor();
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
        setBookTitles([]);
        setBookTopics([]);
        setSelectedBookTitle("");
        setSelectedBookTopic("");

        if (majorId) {
            try {
                setLoading(true);
                const bookTitleData = await fetchBookTitle({ selectedMajor: majorId });
                setBookTitles(bookTitleData);
            } catch (err) {
                setError("Gagal memuat data judul buku. Silakan coba lagi.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    }, []);

    const handleBookTitleChange = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const bookTitleId = e.target.value;
        setSelectedBookTitle(bookTitleId);
        setBookTopics([]);
        setSelectedBookTopic("");

        if (bookTitleId) {
            try {
                setLoading(true);
                const bookTopicData = await fetchBookTopic({ selectedBookTitle: bookTitleId });
                setBookTopics(bookTopicData);
            } catch (err) {
                setError("Gagal memuat data topik buku. Silakan coba lagi.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    }, []);

    const handleBookTopicChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBookTopic(e.target.value);
    }, []);

    return {
        majors,
        bookTitles,
        bookTopics,
        selectedMajor,
        selectedBookTitle,
        selectedBookTopic,
        loading,
        error,
        handleMajorChange,
        handleBookTitleChange,
        handleBookTopicChange,
    };
};