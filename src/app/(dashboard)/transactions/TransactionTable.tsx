'use client';

import { useState } from 'react';
import type { Transaction } from '@/types/transaction';
import { Icon } from "@iconify/react"; // Added Icon import

// --- Helper Components ---
const StatusBadge = ({ status }: { status: string | undefined }) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full inline-block";
    let statusClasses = "bg-gray-100 text-gray-800"; // Default

    switch (status?.toLowerCase()) {
        case 'success':
            statusClasses = "bg-green-100 text-green-800";
            break;
        case 'pending':
            statusClasses = "bg-yellow-100 text-yellow-800";
            break;
        case 'failed':
            statusClasses = "bg-red-100 text-red-800";
            break;
    }

    return <span className={`${baseClasses} ${statusClasses}`}>{status || 'N/A'}</span>;
};

const TransactionRow = ({ trx }: { trx: Transaction }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <tr key={trx.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                <div className="flex items-center gap-2">
                    <span>{trx.transaction_code}</span>
                    <button
                        onClick={() => handleCopy(trx.transaction_code)}
                        className="text-gray-400 hover:text-gray-600 transition-colors relative group"
                        title="Copy to clipboard"
                    >
                        <Icon icon="ic:round-content-copy" className="w-4 h-4" />
                        {copied && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap">Copied!</span>
                        )}
                    </button>
                </div>
            </td>
            <td className="p-4 text-gray-800 dark:text-gray-200">{trx.pack_name}<br />{String(trx.transactionable?.title || trx.transactionable?.book_title)}</td>
            <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(trx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
            <td className="p-4 text-gray-800 dark:text-gray-200 text-right font-mono">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trx.amount)}</td>
            <td className="p-4 text-center"><span className="px-2 py-1 text-xs font-medium rounded-full inline-block bg-gray-100 text-gray-800">{trx.payment_method?.name}</span></td>
            <td className="p-4 text-center text-nowrap"><StatusBadge status={trx.status?.status} /></td>
            <td className="p-4 text-center">
                <div className="relative inline-block text-left">
                    {trx.transaction_code && <a href={`/transactions/${trx.transaction_code}`} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"><Icon icon="ion:arrow-forward-outline" className="size-6" /></a>}
                </div>
            </td>
        </tr>
    );
};

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
    return (
        <div className="bg-white/60 dark:bg-gray-800 rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Kode Transaksi</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 max-w-1/6">Paket Pembelian</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Tanggal</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Jumlah</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">Metode Pembayaran</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">Status</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((trx) => (
                            <TransactionRow key={trx.id} trx={trx} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden space-y-4 p-4">
                {transactions.map((trx) => (
                    <div key={trx.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-lg text-gray-800 dark:text-gray-200">{trx.pack_name}</span>
                            <StatusBadge status={trx.status?.status} />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <span>{trx.transaction_code}</span> &bull; <span>{new Date(trx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="text-right text-lg font-bold text-gray-900 dark:text-gray-100">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trx.amount)}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-right">
                             {trx.transaction_code && <a href={`/transactions/${trx.transaction_code}`} className="text-blue-600 hover:underline">Lihat Detail</a>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

