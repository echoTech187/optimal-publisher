"use client";
import { redirect } from 'next/navigation';
import TransactionTable from './TransactionTable';
import { useEffect, useState } from 'react';
import { Transaction } from '@/types/transaction';
import FullPageLoader from '@/components/ui/FullPageLoader';
import { getToken } from '@/lib/utils/token';
import { Icon } from '@iconify/react';

// This is the main Server Component for the page
export default function UserTransactionPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true);
            setIsTableLoading(true);
            const sessionResponse = await fetch('/api/session');
            const session = await sessionResponse.json();
            const token = await getToken();

            if (!session || !session.id) {
                redirect('/signin');
            } else {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/transactions?session=${session.id}&page=${currentPage}&limit=${itemsPerPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const transactionsData = await response.json();
                const parsedData = transactionsData?.data ?? transactionsData?.items ?? transactionsData?.results ?? transactionsData?.records ?? [];
                const parsedTotal = transactionsData?.total ?? transactionsData?.totalItems ?? transactionsData?.meta?.total ?? transactionsData?.pagination?.total ?? transactionsData?.data?.total ?? 0;
                setTransactions(parsedData);
                setTotalItems(parsedTotal);
                setIsLoading(false);
                setIsTableLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setIsTableLoading(true);
    };
    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <>
            <IsbnHeroSection />
            <div className="px-8 pt-8">
                <h2 className="text-xl font-bold">Riwayat Transaksi</h2>
                <p>Daftar riwayat transaksi Anda di sini.</p>
            </div>
            {
                transactions.length > 0 && (

                    <TransactionTable
                        transactions={transactions}
                        isLoading={isTableLoading}
                        totalItems={totalItems}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />

                )
            }

        </>
    );
}
function openWhatsappChat() {
    window.location.href = "https://wa.link/gkfaqz";
}
export function IsbnHeroSection() {

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 text-center 2xl:flex 2xl:items-center 2xl:justify-start 2xl:gap-8 2xl:flex-row-reverse">
            <div className="flex justify-center mb-6 md:mb-8">
                <img src="/images/ISBN.png" alt="Lindungi Karya Anda" className="w-40 sm:w-56 md:w-64 lg:w-72 2xl:w-99 h-auto mx-auto" />
            </div>
            <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 uppercase">
                    Wujudkan Impian Menerbitkan Buku
                </h2>
                <p className="text-gray-600 mx-auto mt-3 mb-8 md:mb-8 text-sm sm:text-base leading-relaxed max-w-2xl px-2">
                    Menerbitkan buku tidak harus rumit. Kami sederhanakan setiap langkah dan mendampingi Anda di setiap prosesnya. Dari konsultasi awal hingga penerbitan resmi, tim expert kami siap membantu. Fokus pada karya Anda, percayakan sisanya kepada kami.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 md:mb-8 w-full max-w-xl mx-auto">
                    <a href="/program" className="w-full sm:w-auto bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                        Mulai Pendaftaran Sekarang
                        <Icon icon="ion:arrow-forward-outline" className="ml-2" />
                    </a>
                    <button onClick={openWhatsappChat} className="w-full sm:w-auto bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                        <Icon icon="ion:chatbubbles-outline" className="mr-2" />
                        Jadwalkan Konsultasi
                    </button>
                </div>
            </div>
        </div>
    );
}