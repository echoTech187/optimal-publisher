'use client';

import { useEffect, useState } from 'react';
import type { Transaction } from '@/types/transaction';
import { Icon } from "@iconify/react";

// --- Helper Components ---
const StatusBadge = ({ status, className = "" }: { status: string | undefined, className?: string }) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full inline-block transition-colors";
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

    return <span className={`${baseClasses} ${statusClasses} ${className}`}>{status || 'N/A'}</span>;
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
            <td className="p-4 text-gray-800 dark:text-gray-200">
                <p className='font-semibold'>
                    {
                        trx.pack_name ? `${trx.pack_name}` : '-'
                    }
                </p>


            </td>
            <td className="p-4 text-gray-600 dark:text-gray-400">
                <div className='text-capitalize text-sm text-gray-600' dangerouslySetInnerHTML={{
                    __html: (trx.isbn_program_id === 1) ? (trx.transactionable as any)?.book_title :
                        (trx.isbn_program_id === 5) ? (trx.transactionable as any)?.title :
                            (trx.transactionable as any)?.book_title?.title ? (trx.transactionable as any)?.book_title?.title + '<br/> ' + (trx.transactionable as any)?.topic?.topic_name : 'N/A'
                }} />
            </td>
            <td className="p-4 text-gray-600 dark:text-gray-400">{(trx.transactionable as any)?.address}</td>
            <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(trx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
            <td className="p-4 text-gray-800 dark:text-gray-200 text-right font-mono">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trx.amount)}</td>
            <td className="p-4 text-center"><span className="px-2 py-1 text-xs font-medium rounded-full inline-block bg-gray-100 text-gray-800">{trx.payment_method?.name}</span></td>
            <td className="p-4 text-center"><StatusBadge status={trx.status?.status} /></td>
            <td className="p-4 text-center">
                <div className="relative inline-block text-left">
                    {trx.transaction_code && <a href={`/transactions/${trx.transaction_code}`} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"><Icon icon="ion:arrow-forward-outline" className="size-6" /></a>}
                </div>
            </td>
        </tr>
    );
};

export default function TransactionTable({ transactions, isLoading, totalItems, currentPage, itemsPerPage, onPageChange }: { transactions: Transaction[], isLoading: boolean, totalItems: number, currentPage: number, itemsPerPage: number, onPageChange: (page: number) => void }) {


    return (
        <>
        <div className='max-w-full p-4 md:p-8'>

            {/* Mobile & Tablet (Accordion collapse) */}
            <div className="overflow-hidden mb-4 space-y-4">
                {transactions.map((trx, i) => (
                    console.log(trx),
                    <details key={trx.id} className="group" >
                        <summary className="flex border border-gray-200/50 dark:border-gray-700 items-center justify-between gap-2 cursor-pointer focus:outline-none backdrop-blur-3xl rounded-lg bg-white dark:bg-gray-800 px-4 py-3 list-none hover:bg-fuchsia-700 dark:hover:bg-fuchsia-700 hover:text-white group-open:bg-fuchsia-700 dark:group-open:bg-fuchsia-700 group-open:text-white transition-colors shadow-sm group-open:shadow-lg">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-white group-open:text-white">{trx.transaction_code}</span>
                                <span className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-white/80 group-open:text-white/80">{new Date(trx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusBadge status={trx.status?.status} className="max-sm:hidden group-hover:ring-2 group-hover:ring-white/60 group-hover:bg-white/20 group-hover:text-white group-open:ring-2 group-open:ring-white/60 group-open:bg-white/20 group-open:text-white" />
                                <Icon icon="mdi:chevron-down" className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform group-hover:text-white group-open:text-white" />
                            </div>
                        </summary>
                        <div className="px-4 py-6 -mt-2 max-md:text-xs text-sm bg-white rounded-b-lg dark:bg-gray-900 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Kode</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{trx.transaction_code}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Tanggal</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{new Date(trx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Paket</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{trx.transactionable?.package_name || '-'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Metode</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{trx.payment_method?.name || '-'}</span>
                                </div>
                                <div className="sm:col-span-2 flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        {(trx.isbn_program_id === 1) ? 'Judul Buku' : (trx.isbn_program_id === 5) ? 'Judul Karya' : 'Judul Buku & Topik'}
                                    </span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">
                                        {(trx.isbn_program_id === 1) ?
                                            (trx.transactionable as any)?.book_title : (trx.isbn_program_id === 5)
                                                ? (trx.transactionable as any)?.title : (trx.transactionable as any)?.book_title?.title ?
                                                    (trx.transactionable as any)?.book_title?.title : 'N/A'}
                                    </span>
                                    {(trx.isbn_program_id !== 1 && trx.isbn_program_id !== 5 && (trx.transactionable as any)?.topic?.topic_name) && (
                                        <span className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                                            {(trx.transactionable as any)?.topic?.topic_name}
                                        </span>
                                    )}
                                </div>
                                {(trx.transactionable as any)?.address && (
                                    <div className="sm:col-span-2 flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Alamat</span>
                                        <span className="font-medium text-gray-700 dark:text-gray-200">{(trx.transactionable as any)?.address}</span>
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Jumlah</span>
                                    <span className="font-mono text-gray-800 dark:text-gray-100">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trx.amount)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</span>
                                    {trx.status?.status}
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    onClick={() => navigator.clipboard.writeText(trx.transaction_code)} 
                                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                    title="Salin kode transaksi"
                                >
                                    <Icon icon="ic:round-content-copy" className="w-4 h-4" />
                                    <span>Salin</span>
                                </button>
                                {trx.transaction_code && (
                                    <a 
                                        href={`/transactions/${trx.transaction_code}`} 
                                        className="inline-flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-fuchsia-700 rounded-full hover:bg-fuchsia-800 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                                    >
                                        <Icon icon="ion:arrow-forward-outline" className="w-4 h-4" />
                                        <span>Detail</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </div>
        
        {totalItems > 0 && (
            <div className="flex items-center justify-between px-8 pb-12">
                <span className="text-xs text-gray-500">Halaman {currentPage} dari {Math.ceil(totalItems / itemsPerPage)}</span>
                <div className="inline-flex gap-1">
                    <button disabled={currentPage === 1} onClick={() => onPageChange(1)} className="px-2 py-1 text-xs border rounded disabled:opacity-40">«</button>
                    <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="px-2 py-1 text-xs border rounded disabled:opacity-40">Sebelumnya</button>
                    <button disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)} onClick={() => onPageChange(currentPage + 1)} className="px-2 py-1 text-xs border rounded disabled:opacity-40">Berikutnya</button>
                    <button disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)} onClick={() => onPageChange(Math.ceil(totalItems / itemsPerPage))} className="px-2 py-1 text-xs border rounded disabled:opacity-40">»</button>
                </div>
            </div>
        )}
</>
    );
}
