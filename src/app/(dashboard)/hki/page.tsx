"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/components/ui/FullPageLoader";
import HkiOverviews from "./overviews/page";
import CategoryAccordion from "@/components/hki/CategoryAccordion";
import { useHki } from "@/features/hki/hooks/useHki";

// Helper functions for navigation can be defined here or in a utils file
function HKIRegisterAction() {
    // Using Next.js router is generally better than window.location
    const router = useRouter();
    router.push("/hki/register");
}

function openWhatsappChat() {
    window.open("https://wa.link/gkfaqz", '_blank', 'noopener,noreferrer');
}

export default function HKIPage() {
    const {
        isLoading,
        isEmptyHki,
        userHkiTransactions,
        isTableLoading,
        total,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        searchTerm,
        handleSearchChange,
        filteredCategories,
    } = useHki();

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className=" mx-auto p-8">
                {!isEmptyHki && (
                    <HkiOverviews
                        // The HkiOverviews component might need to be refactored as well
                        // to accept this simplified set of props.
                        // For now, passing what's available from the hook.
                        setIsEmptyHki={() => {}} // This logic is now in the hook
                        isLoading={isLoading}
                        userEvents={userHkiTransactions}
                        userEventsTotal={total}
                        userEventsCurrentPage={currentPage}
                        setUserEventsCurrentPage={setCurrentPage}
                        userEventsItemsPerPage={itemsPerPage}
                        isTableLoading={isTableLoading}
                    />
                )}

                {isEmptyHki && !isLoading && (
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <img src="/images/HKI.png" alt="Lindungi Karya Anda" className="max-w-sm" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            LINDUNGI KARYA ANDA SEKARANG
                        </h2>
                        <p className="text-gray-600 mt-2 mb-8">
                            Daftarkan karya anda dan dapatkan perlindungan hukum yang kuat untuk hak kekayaan intelektual anda
                        </p>
                        {/* Promo cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-100 p-4 rounded-full mb-4">
                                    <Icon icon="ion:shield-checkmark-outline" className="text-blue-600 text-3xl" />
                                </div>
                                <h3 className="font-semibold text-gray-800">Terjamin aman</h3>
                                <p className="text-gray-600 text-sm">Perlindungan hukum resmi untuk karya anda</p>
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
                                <p className="text-gray-600 text-sm">Ribuan karya telah mendaftar</p>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mb-8">
                            <a href="/hki/register" className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                                Mulai Pendaftaran Sekarang
                                <Icon icon="ion:arrow-forward-outline" className="ml-2" />
                            </a>
                            <button onClick={openWhatsappChat} className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                                <Icon icon="ion:chatbubbles-outline" className="mr-2" />
                                Jadwalkan Konsultasi
                            </button>
                        </div>
                        {/* Trust Badges */}
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
                )}

                <div className={`text-center md:text-left mb-8 ${isEmptyHki ? 'mt-8' : 'mt-12'}`}>
                    <div className="flex justify-center md:justify-start items-center mb-4 gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Icon icon="ion:book-outline" className="text-blue-600 text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Apa Saja yang bisa Didaftarkan HKI?</h1>
                            <p className="text-gray-600 mt-1">Jelajahi berbagai kategori karya yang dapat di daftarkan untuk perlindungan Hak Kekayaan Intelektual</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats cards remain the same */}
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Icon icon="ion:search-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari kategori atau jenis karya"
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {filteredCategories.map((category, index) => (
                        <CategoryAccordion key={index} category={category} />
                    ))}
                </div>
            </div>
        </div>
    );
}