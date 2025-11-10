'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Pagination from '@/components/ui/Pagination';

const StatusBadge = ({ status }: { status: string | undefined }) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full inline-block";
    let statusClasses = "bg-gray-100 text-gray-800"; // Default

    switch (status?.toLowerCase()) {
        case 'paid':
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

export default function HkiRegistrationTable({ hkiTransactions, totalItems, itemsPerPage, currentPage, onPageChange, isLoading }: { hkiTransactions: any[], totalItems: number, itemsPerPage: number, currentPage: number, onPageChange: (page: number) => void, isLoading: boolean }) {
    return (
        <div className="bg-white/60 dark:bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Nama Paket</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">No Transaksi</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Tanggal Transaksi</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Penulis</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Pembayaran</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">Status</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">#</th>
                    </tr>
                </thead>
                {isLoading ? (
                    <tbody>
                        <tr>
                            <td colSpan={6} className="text-center p-4 ">
                                <p className='flex items-center justify-center gap-2 w-full text-center'>
                                    <Icon icon="line-md:loading-twotone-loop" className="mx-auto text-4xl" />
                                </p>
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        {hkiTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{transaction.payment? transaction.payment.package.name : 'N/A'}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{transaction.code_transaction}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(transaction.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{transaction.creators.map((creator: any) => creator.full_name).join(', ')}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{transaction.payment ? transaction.payment.payment_method.name : 'N/A'}</td>
                                <td className="p-4 text-center text-nowrap"><StatusBadge status={transaction.status ? transaction.status.status : 'N/A'} /></td>
                                <td className="p-4 text-right">
                                    <a href={`/transactions/hki/${transaction.code_transaction}`} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"><Icon icon="ion:arrow-forward-outline" className="size-6" /></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
}
