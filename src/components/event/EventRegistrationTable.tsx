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

export default function EventRegistrationTable({ events, totalItems, itemsPerPage, currentPage, onPageChange, isLoading }: { events: any[], totalItems: number, itemsPerPage: number, currentPage: number, onPageChange: (page: number) => void, isLoading: boolean }) {
    return (
        <div className="bg-white/60 dark:bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Nama Acara</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Tanggal</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Waktu</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Lokasi</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Total Bayar</th>
                        <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">Status</th>
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
                        {events.map((event) => (
                            <tr key={event.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="p-4 font-medium text-gray-800 dark:text-gray-200"><a href={`/events/${event.event.slug}`}>{event.event_name}</a></td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{event.event_time}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{event.event_location}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{parseInt(event.event_price) > 0 ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(parseInt(event.event_price)) : 'Gratis'}</td>
                                <td className="p-4 text-center text-nowrap"><StatusBadge status={event.event_status?.name} /></td>
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
