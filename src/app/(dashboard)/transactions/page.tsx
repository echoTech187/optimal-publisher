"use client";

import TransactionTable from './TransactionTable';
import FullPageLoader from '@/components/ui/FullPageLoader';
import IsbnHeroSection from '@/components/transactions/IsbnHeroSection';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';

export default function UserTransactionPage() {
    const {
        transactions,
        isLoading,
        isTableLoading,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
    } = useTransactions();

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <>
            <IsbnHeroSection />

            {transactions.length > 0 ? (
                <>
                    <div className="px-8 pt-8">
                        <h2 className="text-xl font-bold">Riwayat Transaksi</h2>
                        <p>Daftar riwayat transaksi Anda di sini.</p>
                    </div>
                    <TransactionTable
                        transactions={transactions}
                        isLoading={isTableLoading}
                        totalItems={totalItems}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className="px-8 py-16 text-center">
                    <h2 className="text-xl font-bold text-gray-700">Belum Ada Transaksi</h2>
                    <p className="text-gray-500 mt-2">Anda belum memiliki riwayat transaksi apapun.</p>
                </div>
            )}
        </>
    );
}