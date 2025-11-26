'use client';

import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";

// --- Helper Components ---
const StatusBadge = ({ status, className = "" }: { status: string | undefined, className?: string }) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full inline-block transition-colors";
    let statusClasses = "bg-gray-100 text-gray-800"; // Default

    switch (status?.toLowerCase()) {
        case 'paid':
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

export default function HkiTransactionTable({ hkiTransactions, isLoading, totalItems, currentPage, itemsPerPage, onPageChange }: { hkiTransactions: any[], isLoading: boolean, totalItems: number, currentPage: number, itemsPerPage: number, onPageChange: (page: number) => void }) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-40 py-12">
                <Icon icon="eos-icons:loading" className="animate-spin" />
            </div>
        );
    }

    if(hkiTransactions.length === 0) {
        return (
            <div className="flex items-center justify-center h-40 py-12">
                <p className="text-gray-600 dark:text-gray-400">Belum ada transaksi, silahkan lakukan pembelian.</p>
            </div>
        );
    }

    return (
        <>
        <div className='max-w-full'>

            {/* Mobile & Tablet (Accordion collapse) */}
            <div className="overflow-hidden mb-4 space-y-4">
                {hkiTransactions.map((trx, i) => (
                    <details key={trx.id} className="group" >
                        <summary className="flex border border-gray-200/50 dark:border-gray-700 items-center justify-between gap-2 cursor-pointer focus:outline-none backdrop-blur-3xl rounded-lg bg-white dark:bg-gray-800 px-4 py-3 list-none hover:bg-fuchsia-700 dark:hover:bg-fuchsia-700 hover:text-white group-open:bg-fuchsia-700 dark:group-open:bg-fuchsia-700 group-open:text-white transition-colors shadow-sm group-open:shadow-lg">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-white group-open:text-white">{trx.code_transaction}</span>
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
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Kode Transaksi</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{trx.code_transaction}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Tanggal</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{new Date(trx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Paket</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{trx.payment?.package?.name || '-'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Metode Pembayaran</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{trx.payment?.payment_method?.name || '-'}</span>
                                </div>
                                <div className="sm:col-span-2 flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Penulis
                                    </span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200">
                                        {trx.creators?.map((c: any) => c.full_name).join(', ') || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Jumlah</span>
                                    <span className="font-mono text-gray-800 dark:text-gray-100">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trx.payment?.amount || 0)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</span>
                                    {trx.status?.status}
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    onClick={() => navigator.clipboard.writeText(trx.code_transaction)} 
                                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                    title="Salin kode transaksi"
                                >
                                    <Icon icon="ic:round-content-copy" className="w-4 h-4" />
                                    <span>Salin Kode</span>
                                </button>
                                {trx.code_transaction && (
                                    <a 
                                        href={`/transactions/hki/${trx.code_transaction}`} 
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
            <div className="flex items-center justify-between pb-12">
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
