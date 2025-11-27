"use client";

import { useEventsPage } from '@/features/event/hooks/useEventsPage';
import EventCard from '@/components/event/EventCard';
import FullPageLoader from '@/components/ui/FullPageLoader';
import EventTransactionTable from './EventTransactionTable';

export default function EventPage() {
    const {
        isLoading,
        isTableLoading,
        sortedEvents,
        userEvents,
        totalUserEvents,
        currentPage,
        setCurrentPage,
        itemsPerPage,
    } = useEventsPage();

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <div className="p-8">
            {userEvents.length > 0 && (
                <>
                    <header className=" mb-12">
                        <h2 className="text-2xl font-bold">Riwayat Pendaftaran Lomba</h2>
                        <p>Daftar riwayat pendaftaran lomba dan acara Anda di sini.</p>
                    </header>
                    <EventTransactionTable
                        events={userEvents}
                        totalItems={totalUserEvents}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        isLoading={isTableLoading}
                    />
                </>
            )}
            <div className={`${userEvents.length > 0 ? 'mt-12' : ''} mb-6 flex justify-between`}>
                <div>
                    <h2 className="text-2xl font-bold">Daftar Lomba dan Acara</h2>
                    <p>Pilih acara yang ingin kamu ikuti.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {sortedEvents.filter(Boolean).map((event: any) => (
                    <EventCard key={event.id} index={event.id} item={event} />
                ))}
            </div>
        </div>
    );
}
