import { fetchTransactions } from '@/features/payment/data';
import { getSession } from '@/features/auth/session';
import { redirect } from 'next/navigation';
import TransactionTable from './TransactionTable';

// This is the main Server Component for the page
export default async function UserTransactionPage() {
    const session = await getSession();
    if (!session || !session.id) {
        redirect('/signin');
    }

    const transactions = await fetchTransactions(session.id);

    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Riwayat Transaksi</h1>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">Lihat semua riwayat transaksi Anda di sini.</p>
            </header>
            <TransactionTable transactions={transactions} />
        </div>
    );
}
