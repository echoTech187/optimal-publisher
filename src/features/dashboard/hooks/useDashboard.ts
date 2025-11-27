// src/features/dashboard/hooks/useDashboard.ts
"use client";

import { useState, useEffect, useMemo } from "react";
import { EventNews } from "@/types/program";
import { Article } from "@/types/article";
import { fetchEventData } from "@/features/event/data";
import { getArticles } from "@/features/article/data";

export function useDashboard() {
    const [events, setEvents] = useState<EventNews[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch both data in parallel for efficiency
                const [eventData, articleData] = await Promise.all([
                    fetchEventData(),
                    getArticles()
                ]);

                setEvents(eventData || []);
                setArticles(articleData || []);

            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                setEvents([]);
                setArticles([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // useMemo will recalculate upcomingEvents only when the events array changes.
    const upcomingEvents = useMemo(() => {
        return events
            .filter(event => new Date(event.event_date) <= new Date())
            .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
            .slice(0, 5);
    }, [events]);

    return {
        isLoading,
        articles,
        upcomingEvents,
    };
}
