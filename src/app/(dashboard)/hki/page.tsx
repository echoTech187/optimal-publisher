"use client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import EventPage from "../events/page";
import HkiOverviews from "./overviews/page";
import { getSession } from "@/features/auth/session";
import { getToken } from "@/lib/utils/token";
import { redirect } from "next/navigation";
import FullPageLoader from "@/components/ui/FullPageLoader";

interface CategoryAccordionProps {
    category: {
        icon: string;
        name: string;
        color: string;
        items: string[];
    };
}

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

const CategoryAccordion = ({ category }: CategoryAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const count = category.items.length;

    return (
        <div className="bg-white rounded-lg  border border-gray-100">
            <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                        <Icon icon={category.icon} className="text-xl" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{category.name}</p>
                        <p className="text-sm text-gray-500">{count} jenis karya</p>
                    </div>
                </div>
                <div className="flex items-center text-gray-500">
                    <span className="mr-2">{count}</span>
                    <Icon icon={isOpen ? "ion:chevron-up-outline" : "ion:chevron-down-outline"} />
                </div>
            </div>
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        {category.items.map((item, index) => (
                            <li key={index} className="p-2 font-semibold rounded-md">{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


function HKIRegisterAction() {
    window.location.href = "/hki/register";
}
function openWhatsappChat() {
    window.location.href = "https://wa.link/gkfaqz";
}

export default function HKIPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isEmptyHki, setIsEmptyHki] = useState(true);
    const [userEvents, setUserEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [userEventsTotal, setUserEventsTotal] = useState(0);
    const [userEventsCurrentPage, setUserEventsCurrentPage] = useState(1);
    const userEventsItemsPerPage = 10;

    useEffect(() => {

        const fetchUserEvents = async () => {
            setIsTableLoading(true);
            try {
                const session = await getSession();
                const token = await getToken();
                if (!session || !session.id) {
                    return redirect('/login');
                }
                const response = await fetch(`http://127.0.0.1:8000/api/v1/hki-transactions?session=${session.id}&page=${userEventsCurrentPage}&limit=${userEventsItemsPerPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (setIsEmptyHki) {
                    if (data.total > 0) {
                        setIsEmptyHki(false);
                    } else {
                        setIsEmptyHki(true);
                    }
                }
                setUserEvents(data.data);
                setUserEventsTotal(data.total);
                setIsTableLoading(false);
            } catch (error) {
                console.error('Error fetching user events:', error);
                setIsTableLoading(false);
            }
        };

        Promise.all([fetchUserEvents()]).then(() => {
            setIsLoading(false);
        });
    }, [userEventsCurrentPage]);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategories = categories.filter((category) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const matchesCategoryName = category.name.toLowerCase().includes(lowerCaseSearchTerm);
        const matchesSubCategoryItem = category.items.some((item) =>
            item.toLowerCase().includes(lowerCaseSearchTerm)
        );
        return matchesCategoryName || matchesSubCategoryItem;
    });
    if (isLoading) {
        return <FullPageLoader />;
    }
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className=" mx-auto p-8">
                {
                    !isEmptyHki && <HkiOverviews setIsEmptyHki={setIsEmptyHki} isLoading={isLoading} userEvents={userEvents} userEventsTotal={userEventsTotal} userEventsCurrentPage={userEventsCurrentPage} setUserEventsCurrentPage={setUserEventsCurrentPage} userEventsItemsPerPage={userEventsItemsPerPage} isTableLoading={isTableLoading} />
                }
                {
                    (isEmptyHki && isLoading === false) && (
                        <div className="text-center">
                            <div className="flex justify-center mb-8">
                                <img src="/images/HKI.png" alt="Lindungi Karya Anda" className="max-w-sm" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">
                                LINDUNGI KARYA ANDA SEKARANG
                            </h2>
                            <p className="text-gray-600 mt-2 mb-8">
                                Daftarkan karya anda dan dapatkan perlindungan hukum yang kuat
                                untuk hak kekayaan intelektual anda
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-4xl mx-auto">
                                <div className="flex flex-col items-center">
                                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                                        <Icon icon="ion:shield-checkmark-outline" className="text-blue-600 text-3xl" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800">Terjamin aman</h3>
                                    <p className="text-gray-600 text-sm">
                                        Perlindungan hukum resmi untuk karya anda
                                    </p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                                        <Icon icon="ion:flash-outline" className="text-blue-600 text-3xl" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800">Proses Cepat</h3>
                                    <p className="text-gray-600 text-sm">Pendaftaran mudah</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                                        <Icon icon="ion:people-outline" className="text-blue-600 text-3xl" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800">Terpercaya</h3>
                                    <p className="text-gray-600 text-sm">
                                        Ribuan karya telah mendaftar
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mb-8">
                                <button onClick={HKIRegisterAction} className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                                    Mulai Pendaftaran Sekarang
                                    <Icon icon="ion:arrow-forward-outline" className="ml-2" />
                                </button>
                                <button onClick={openWhatsappChat} className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                                    <Icon icon="ion:chatbubbles-outline" className="mr-2" />
                                    Jadwalkan Konsultasi
                                </button>
                            </div>

                            <div className="flex justify-center items-center gap-8 text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Icon icon="ion:checkmark-circle-outline" className="text-green-500" />
                                    <span>100% Legal dan Resmi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon="ion:lock-closed-outline" className="text-green-500" />
                                    <span>Data Aman & Terenkripsi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon="ion:headset-outline" className="text-green-500" />
                                    <span>Support 24/7</span>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className={`text-center md:text-left mb-8  ${isEmptyHki ? 'mt-8' : 'mt-12'}`}>
                    <div className="flex justify-center md:justify-start items-center mb-4 gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Icon icon="ion:book-outline" className="text-blue-600 text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Apa Saja yang bisa Didaftarkan HKI?
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Jelajahi berbagai kategori karya yang dapat di daftarkan untuk
                                perlindungan Hak Kekayaan Intelektual
                            </p>
                        </div>
                    </div>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Kategori</p>
                            <p className="text-2xl font-bold text-gray-800">8</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Icon icon="ion:trending-up-outline" className="text-blue-600 text-2xl" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Jenis Karya</p>
                            <p className="text-2xl font-bold text-gray-800">132</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Icon icon="ion:checkmark-circle-outline" className="text-green-600 text-2xl" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-200 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Perlindungan Terjamin</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Icon icon="ion:shield-checkmark-outline" className="text-purple-600 text-2xl" />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="relative">
                        <Icon
                            icon="ion:search-outline"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Cari kategori atau jenis karya"
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredCategories.map((category, index) => (
                        <CategoryAccordion key={index} category={category} />
                    ))}
                </div>


            </div>
        </div>
    );
}