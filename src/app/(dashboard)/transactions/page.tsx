"use client";
import { fetchTransactions } from '@/features/payment/data';
import { getSession } from '@/features/auth/session';
import { redirect } from 'next/navigation';
import TransactionTable from './TransactionTable';
import { useEffect, useState } from 'react';
import { Transaction } from '@/types/transaction';
import FullPageLoader from '@/components/ui/FullPageLoader';

// This is the main Server Component for the page
export default function UserTransactionPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const sessionResponse = await fetch('/api/session');
            const session = await sessionResponse.json();

            if (!session || !session.id) {
                redirect('/signin');
            } else {
                const transactionsResponse = await fetch('/api/transactions');
                const transactions = await transactionsResponse.json();
                setTransactions(transactions);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <FullPageLoader />;
    }


    return (
        <>
            <header className="px-8 pt-8">
                <h2 className="text-xl font-bold">Riwayat Transaksi</h2>
                <p>Daftar riwayat transaksi Anda di sini.</p>
            </header>
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <TransactionTable transactions={transactions} />
            </div>
        </>
    );
}
