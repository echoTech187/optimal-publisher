"use client";

import { useEffect, useState } from 'react';
import EventCard from '@/components/event/EventCard';
import FullPageLoader from '@/components/ui/FullPageLoader';
import EventRegistrationTable from '@/components/event/EventRegistrationTable';
import { redirect } from 'next/navigation';
import { getSession } from '@/features/auth/session';
import { getToken } from '@/lib/utils/token';

export default function EventPage() {
    const [events, setEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [userEventsTotal, setUserEventsTotal] = useState(0);
    const [userEventsCurrentPage, setUserEventsCurrentPage] = useState(1);
    const userEventsItemsPerPage = 1;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/events');
                const data = await response.json();
                setEvents(data.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        const fetchUserEvents = async () => {
            setIsTableLoading(true);
            try {
                const session = await getSession();
                const token = await getToken();
                if (!session || !session.id) {
                    return redirect('/login');
                }
                const response = await fetch(`http://127.0.0.1:8000/api/v1/events/member/${session.slug}?page=${userEventsCurrentPage}&limit=${userEventsItemsPerPage}`, {
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

        Promise.all([fetchEvents(), fetchUserEvents()]).then(() => {
            setIsLoading(false);
        });
    }, [userEventsCurrentPage]);


    const sortedEvents = events.sort((a: any, b: any) => {
        const dateA = new Date(a.start_date).getTime();
        const dateB = new Date(b.start_date).getTime();
        return dateA - dateB;
    }).slice(0, 5);
    if (isLoading) {
        return <FullPageLoader />;
    }
    return (
        <div className="p-8">
            <header className=" mb-12">
                <h2 className="text-2xl font-bold">Riwayat Pendaftaran Lomba</h2>
                <p>Daftar riwayat pendaftaran lomba dan acara Anda di sini.</p>
            </header>
            <EventRegistrationTable events={userEvents} totalItems={userEventsTotal} itemsPerPage={userEventsItemsPerPage} currentPage={userEventsCurrentPage} onPageChange={setUserEventsCurrentPage} isLoading={isTableLoading} />
            <div className="my-12 flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Daftar Lomba dan Acara</h2>
                    <p>Pilih acara yang ingin kamu ikuti.</p>
                </div>
                <a href="/event" className="btn btn-primary">Lihat Semua</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {sortedEvents.map((event: any) => (
                    <EventCard key={event.id} index={event.id} item={event} />
                ))}
            </div>
        </div>
    );
}
