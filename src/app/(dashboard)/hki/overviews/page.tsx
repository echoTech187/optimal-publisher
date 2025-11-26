"use client";

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FullPageLoader from '@/components/ui/FullPageLoader';
import HkiTransactionTable from '../HkiTransactionTable';
import { Icon } from '@iconify/react';

export default function HkiOverviews({ setIsEmptyHki, isLoading, userEvents, userEventsTotal, userEventsCurrentPage, setUserEventsCurrentPage, userEventsItemsPerPage, isTableLoading }: { setIsEmptyHki: Dispatch<SetStateAction<boolean>>; isLoading: boolean; userEvents: any[]; userEventsTotal: number; userEventsCurrentPage: number; setUserEventsCurrentPage: Dispatch<SetStateAction<number>>; userEventsItemsPerPage: number; isTableLoading: boolean; }) {
    
    function HKIRegisterAction() {
        window.location.href = "/hki/register";
    }
    function openWhatsappChat() {
        window.location.href = "https://wa.link/gkfaqz";
    }

    if (isLoading) {
        return <FullPageLoader />;
    }
    if (userEvents.length === 0) return ;
    return (
        <div className="">
            <div className='flex items-center justify-between'>
                <header className="mb-12">
                    <h2 className="text-2xl font-bold">Pendaftaran Hak Kekayaan Intelektual</h2>
                    <p>Riwayat transaksi hak kekayaan intelektual Anda di sini.</p>
                </header>
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
            </div>
            <HkiTransactionTable hkiTransactions={userEvents} totalItems={userEventsTotal} itemsPerPage={userEventsItemsPerPage} currentPage={userEventsCurrentPage} onPageChange={setUserEventsCurrentPage} isLoading={isTableLoading} />
        </div>
    );
}
