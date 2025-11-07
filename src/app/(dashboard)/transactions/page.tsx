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
    const itemsPerPage = 1;

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
                setTransactions(transactionsData.data);
                setTotalItems(transactionsData.total);
                setIsLoading(false);
                setIsTableLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);
    function openWhatsappChat() {
        window.location.href = "https://wa.link/gkfaqz";
    }
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setIsTableLoading(true);
    };
    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <>
            <div className="mt-16 text-center">
                <div className="flex justify-center mb-8">
                    <img src="/images/ISBN.png" alt="Lindungi Karya Anda" className="max-w-sm" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                    PENULISAN ISBN
                </h2>
                <p className="text-gray-600 w-8/12 mx-auto mt-2 mb-8">
                    Mulai petualangan menulis bersama Optimal, di mana kata-kata menjadi jembatan yang menghubungkan ide-ide cemerlang. Optimal membantu Anda mengungkap potensi terbaik dalam menulis dengan alat dan layanan canggih. Bersama Optimal, mulai menulis bersama dan jelajahi batas-batas tulisan yang tak terbatas.
                </p>


                <div className="flex justify-center gap-4 mb-8">
                    <a href="/program" className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                        Mulai Pendaftaran Sekarang
                        <Icon icon="ion:arrow-forward-outline" className="ml-2" />
                    </a>
                    <a onClick={openWhatsappChat} className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                        <Icon icon="ion:chatbubbles-outline" className="mr-2" />
                        Jadwalkan Konsultasi
                    </a>
                </div>
            </div>
            {
                transactions.length > 0 && (
                    <>
                        <div className='py-12'>
                            <div className="px-8 pt-8">
                                <h2 className="text-xl font-bold">Riwayat Transaksi</h2>
                                <p>Daftar riwayat transaksi Anda di sini.</p>
                            </div>
                            <div className="p-4 sm:p-6 lg:p-8  relative">
                                <TransactionTable transactions={transactions} totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} isLoading={isTableLoading} />
                            </div>
                        </div>
                    </>
                )
            }

        </>
    );
}
