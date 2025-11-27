// src/features/event/hooks/useEventsPage.ts
"use client";

import { useState, useEffect, useMemo } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/features/auth/session';
import { getToken } from '@/lib/utils/token';

const ITEMS_PER_PAGE = 10;

// A more specific type for the event could be beneficial
type EventItem = any; 

async function fetchAllEvents(): Promise<EventItem[]> {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/events');
        if (!response.ok) return [];
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching all events:', error);
        return [];
    }
}

async function fetchUserEvents(page: number, token: string, sessionId: string | number) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/events/member/${sessionId}?page=${page}&limit=${ITEMS_PER_PAGE}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) return { data: [], total: 0 };
        const data = await response.json();
        return {
            data: data.data || [],
            total: data.total || 0,
        };
    } catch (error) {
        console.error('Error fetching user events:', error);
        return { data: [], total: 0 };
    }
}

export function useEventsPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [userEvents, setUserEvents] = useState<EventItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [totalUserEvents, setTotalUserEvents] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setIsTableLoading(true);
            try {
                const session = await getSession();
                const token = await getToken();

                if (!session?.id || !token) {
                    redirect('/login');
                    return;
                }

                // Fetch general events and user-specific events
                const [allEventsData, userEventsData] = await Promise.all([
                    // Only fetch all events on the first page load
                    currentPage === 1 ? fetchAllEvents() : Promise.resolve(events),
                    fetchUserEvents(currentPage, token, session.id)
                ]);

                if (currentPage === 1) {
                    setEvents(allEventsData);
                }
                setUserEvents(userEventsData.data);
                setTotalUserEvents(userEventsData.total);

            } catch (error) {
                console.error("Failed to fetch events data:", error);
            } finally {
                setIsLoading(false);
                setIsTableLoading(false);
            }
        };

        fetchData();
    }, [currentPage, events]); // Re-run when currentPage changes

    const sortedEvents = useMemo(() => {
        return events
            .sort((a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
            .slice(0, 5);
    }, [events]);

    return {
        isLoading,
        isTableLoading,
        sortedEvents,
        userEvents,
        totalUserEvents,
        currentPage,
        setCurrentPage,
        itemsPerPage: ITEMS_PER_PAGE,
    };
}
