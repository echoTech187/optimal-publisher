// src/features/hki/hooks/useHki.ts
"use client";

import { useState, useEffect, useMemo } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from "@/features/auth/session";
import { getToken } from "@/lib/utils/token";

// This could also be moved to a separate constants file
const categories = [
    {
        icon: "ion:musical-notes-outline",
        name: "Komposisi Musik",
        color: "bg-purple-200 text-purple-600",
        items: ["Aransemen", "Lagu (Musik Dengan Teks)", "Musik", "Musik Blues", "Musik Country", "Musik Dangdut", "Musik Elektronik", "Musik Funk", "Musik Gospel", "Musik HipHop, Rap, Rapcore", "Musik Jazz", "Musik Karawitan", "Musik Klasik", "Musik Latin", "Musik Metal", "Musik Pop", "Musik Rhythm And Blues", "Musik Rock", "Musik Ska, Reggae, Dub", "Musik Tanpa Teks"],
    },
    {
        icon: "ion:document-text-outline",
        name: "Karya Tulis",
        color: "bg-blue-200 text-blue-600",
        items: ["Atlas", "Biografi", "Booklet", "Buku", "Buku Mewarnai", "Buku Panduan / Petunjuk", "Buku Pelajaran", "Buku Saku", "Buku Rampai", "Cerita Bergambar", "Diktat", "Dongeng", "E-Book", "Ensiklopedia", "Jurnal", "Kamus", "Karya Ilmiah", "Karya Tulis", "Karya Tulis (Artikel)", "Karya Tulis (Disertasi)", "Karya Tulis (Skripsi)", "Karya Tulis (Tesis)", "Karya Tulis Lainnya", "Komik", "Laporan Penelitian", "Majalah", "Makalah", "Modul", "Naskah Drama / Pertunjukan", "Naskah Film", "Naskah Karya Siaran", "Naskah Karya Sinematografi", "Novel", "Perwajahan Karya Tulis", "Proposal Penelitian", "Puisi", "Referensi", "Resume / Ringkasan", "Saduran", "Sinopsis", "Tafsir", "Terjemah"],
    },
    {
        icon: "ion:color-palette-outline",
        name: "Karya Seni",
        color: "bg-pink-200 text-pink-600",
        items: ["Alat Peraga", "Arsitektur", "Baliho", "Banner", "Brosur", "Diorama", "Flyer", "Kaligrafi", "Karya Seni Rupa", "Karya Seni Batik", "Kolase", "Leaflet", "Motif Sasaringan", "Motif Tapis", "Motif Tenun Ikat", "Motif Ulos", "Pamflet", "Peta", "Poster", "Seni Gambar", "Seni Ilustrasi", "Seni Lukis", "Seni Motif", "Seni Motif Lainnya", "Seni Pahat", "Seni Patung", "Seni Rupa", "Seni Songket", "Seni Terapan", "Seni Umum", "Sketsa", "Spanduk", "Ukiran"],
    },
    {
        icon: "ion:videocam-outline",
        name: "Karya Audio Visual",
        color: "bg-red-200 text-red-600",
        items: ["Film", "Film Cerita", "Film Dokumenter", "Film Iklan", "Film Kartun", "Film Rekaman Video", "Karya Siaran", "Karya Siaran Media Radio", "Karya Siaran Media Televisi dan Film", "Karya Siaran Video", "Karya Sinematografi", "Kuliah", "Reportase"],
    },
    {
        icon: "ion:camera-outline",
        name: "Karya Fotografi",
        color: "bg-yellow-200 text-yellow-600",
        items: ["Karya Fotografi", "Potret"],
    },
    {
        icon: "ion:body-outline",
        name: "Karya Drama dan Koreografi",
        color: "bg-green-200 text-green-600",
        items: ["Drama / Pertunjukan", "Drama Musikal", "Ketoprak", "Komedi / Lawak", "Koreografi", "Lenong", "Ludruk", "Opera", "Pantomim", "Pentas Musik", "Pewayangan", "Seni Akrobat", "Seni Pertunjukan", "Sirkus", "Sulap", "Tari (Sendra Tari)"],
    },
    {
        icon: "ion:recording-outline",
        name: "Karya Rekaman",
        color: "bg-blue-200 text-blue-600",
        items: ["Ceramah", "Karya Rekaman Suara atau Bunyi", "Khutbah", "Pidato"],
    },
    {
        icon: "ion:add-outline",
        name: "Karya Lainnya",
        color: "bg-gray-200 text-gray-600",
        items: ["Basis Data", "Kompilasi Ciptaan / Data", "Permainan Video", "Program Komputer"],
    },
];

const ITEMS_PER_PAGE = 10;

export function useHki() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isEmptyHki, setIsEmptyHki] = useState(true);
    const [userHkiTransactions, setUserHkiTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUserHkiData = async () => {
            setIsTableLoading(true);
            try {
                const session = await getSession();
                const token = await getToken();
                if (!session?.id) {
                    redirect('/login');
                    return;
                }
                const response = await fetch(`http://127.0.0.1:8000/api/v1/hki-transactions?session=${session.id}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                
                setIsEmptyHki(data.total === 0);
                setUserHkiTransactions(data.data || []);
                setTotal(data.total || 0);
            } catch (error) {
                console.error('Error fetching user HKI transactions:', error);
                setIsEmptyHki(true);
            } finally {
                setIsTableLoading(false);
                setIsLoading(false);
            }
        };

        fetchUserHkiData();
    }, [currentPage]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const matchesCategoryName = category.name.toLowerCase().includes(lowerCaseSearchTerm);
            const matchesSubCategoryItem = category.items.some((item) =>
                item.toLowerCase().includes(lowerCaseSearchTerm)
            );
            return matchesCategoryName || matchesSubCategoryItem;
        });
    }, [searchTerm]);

    return {
        isLoading,
        isEmptyHki,
        userHkiTransactions,
        isTableLoading,
        total,
        currentPage,
        setCurrentPage,
        itemsPerPage: ITEMS_PER_PAGE,
        searchTerm,
        handleSearchChange,
        filteredCategories,
    };
}
