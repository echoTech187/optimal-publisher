'use client';

import { useEffect, useState } from 'react';
import type { Transaction } from '@/types/transaction';
import { Icon } from "@iconify/react";

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

export default function TransactionTable({ transactions, isLoading }: { transactions: Transaction[], isLoading: boolean }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.$ && window.$.fn.DataTable) {
            // Destroy existing DataTable instance if it exists
            if ((window.$.fn.DataTable as any).isDataTable(window.$('#transactionTable'))) {
                window.$('#transactionTable').DataTable().destroy();
            }

            try {
                var dt = window.$('#transactionTable').DataTable({
                    paging: true,
                    searching: true,
                    ordering: true,
                    info: true,
                    responsive:true,
                    data: transactions, // Pass data directly
                    columns: [
                        { data: 'transaction_code', title: 'Kode Transaksi' },
                        { data: 'pack_name', title: 'Paket Pembelian' },
                        {
                            data: null,
                            title: 'Judul',
                            render: function (data, type, row) {
                                return (row.isbn_program_id === 1) ? (row.transactionable as any)?.book_title :
                                    (row.isbn_program_id === 5) ? (row.transactionable as any)?.title :
                                        (row.transactionable as any)?.book_title?.title ? (row.transactionable as any)?.book_title?.title + '<br/> ' + (row.transactionable as any)?.topic?.topic_name : 'N/A';
                            }
                        },
                        { data: 'transactionable.address', title: 'Alamat Pengiriman' },
                        {
                            data: 'created_at',
                            title: 'Tanggal',
                            render: function (data) {
                                return new Date(data).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                            }
                        },
                        {
                            data: 'amount',
                            title: 'Jumlah',
                            className: 'text-right',
                            render: function (data) {
                                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(data);
                            }
                        },
                        { data: 'payment_method.name', title: 'Pembayaran Melalui', className: 'text-center' },
                        {
                            data: 'status.status',
                            title: 'Status',
                            className: 'text-center',
                            render: function (data) {
                                const baseClasses = "px-2 py-1 text-xs font-medium rounded-full inline-block";
                                let statusClasses = "bg-gray-100 text-gray-800"; // Default

                                switch (data?.toLowerCase()) {
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
                                return `<span class="${baseClasses} ${statusClasses}">${data || 'N/A'}</span>`;
                            }
                        },
                        {
                            data: 'transaction_code',
                            title: '#',
                            className: 'text-center',
                            render: function (data: any) {
                                return `<a href="/transactions/${data}" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem"><span class="iconify" data-icon="ion:arrow-forward-outline" data-width="24" data-height="24"></span></a>`;
                            }
                        }
                    ],
                    // Add any other DataTables options here
                });// Initialize Responsive extension
                window.$(function () {
                    dt.responsive.recalc();
                });

                window.$('#transactionTable').DataTable().responsive.recalc();
                // Add responsive re-draw event listener to update DataTables on window resize
                window.$(window).on('resize', function () {
                    dt.responsive.recalc();
                });
            } catch (error) {
                console.error("Error initializing DataTables:", error);
            }
        }
    }, [transactions]); // Re-initialize when transactions data changes

    return (
        <div className="bg-white/60 dark:bg-gray-800 rounded-xl">
            {/* Desktop Table */}
            <div>
                <div className='max-w-full  dt-responsive '>
                    <table id="transactionTable" className="table" style={{ width: '100%' }}>
                        {/* DataTables will populate thead and tbody */}
                    </table>
                </div>
            </div>

            {/* Mobile Card List - Keep existing for now, DataTables doesn't handle this directly */}
            {/* <div className="md:hidden space-y-4 p-4">
                {isLoading ? (
                    <div className="text-center p-8">
                        <Icon icon="line-md:loading-twotone-loop" className="mx-auto text-4xl" />
                    </div>
                ) : (
                    transactions.map((trx) => (
                        <div key={trx.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
                                    {
                                        (trx.isbn_program_id === 1) ? (trx.transactionable as any)?.book_title?.title :
                                            (trx.isbn_program_id === 5) ? (trx.transactionable as any)?.title :
                                                (trx.transactionable as any)?.book_title?.title ?? (trx.transactionable as any)?.title ?? 'N/A'
                                    }
                                </span>
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
                    ))
                )}
            </div> */}
            {/* DataTables handles pagination, so custom Pagination component is removed */}
        </div>
    );
}
