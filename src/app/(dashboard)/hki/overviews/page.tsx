"use client";

import { useEffect, useState } from 'react';
import EventCard from '@/components/event/EventCard';
import FullPageLoader from '@/components/ui/FullPageLoader';
import EventRegistrationTable from '@/components/event/EventRegistrationTable';
import { redirect } from 'next/navigation';
import { getSession } from '@/features/auth/session';
import { getToken } from '@/lib/utils/token';
import HkiRegistrationTable from './HkiRegistrationTable';

export default function EventPage() {
    const [events, setEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [userEventsTotal, setUserEventsTotal] = useState(0);
    const [userEventsCurrentPage, setUserEventsCurrentPage] = useState(1);
    const userEventsItemsPerPage = 1;

    useEffect(() => {

        const fetchUserEvents = async () => {
            setIsTableLoading(true);
            try {
                const session = await getSession();
                const token = await getToken();
                if (!session || !session.id) {
                    return redirect('/login');
                }
                const response = await fetch(`http://127.0.0.1:8000/api/v1/hki-transactions?session=${session.id}&page=${userEventsCurrentPage}&limit=${userEventsItemsPerPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setUserEvents(data.data);
                setUserEventsTotal(data.total);
                setIsTableLoading(false);
            } catch (error) {
                console.error('Error fetching user events:', error);
                setIsTableLoading(false);
            }
        };

        Promise.all([ fetchUserEvents()]).then(() => {
            setIsLoading(false);
        });
    }, [userEventsCurrentPage]);


    if (isLoading) {
        return <FullPageLoader />;
    }
    return (
        <div className="p-8">
            <header className=" mb-12">
                <h2 className="text-2xl font-bold">Riwayat Hak Kekayaan Intelektual</h2>
                <p>Riwayat transaksi hak kekayaan intelektual Anda di sini.</p>
            </header>
            <HkiRegistrationTable events={userEvents} totalItems={userEventsTotal} itemsPerPage={userEventsItemsPerPage} currentPage={userEventsCurrentPage} onPageChange={setUserEventsCurrentPage} isLoading={isTableLoading} />
        </div>
    );
}
