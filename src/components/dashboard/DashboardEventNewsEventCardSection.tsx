// src/components/dashboard/DashboardEventNewsEventCardSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { EventNews } from "@/types/program";
import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";
import EventCard from "./EventCard";

interface DashboardEventNewsEventCardSectionProps {
    events: EventNews[];
    articles: Article[];
}

export default function DashboardEventNewsEventCardSection({ events, articles }: DashboardEventNewsEventCardSectionProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventNews | null>(null);

    useEffect(() => {
        if (events && events.length > 0) {
            setSelectedEvent(events[0]);
        }
    }, [events]);

    if (!events || events.length === 0) {
        return (
            <div className="my-12 p-8 lg:p-12 flex-1">
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 text-center">Tidak ada acara tersedia.</h2>
            </div>
        );
    }

    if (!selectedEvent) {
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-white/20 backdrop-blur-3xl shadow-xl z-50 flex justify-center items-center">
                <Image src="/penerbit-logo.png" alt="logo" width={200} height={100} priority={true} className="animate-pulse w-24" />
            </div>
        );
    }

    return (
        <section className=" dark:bg-gray-800 rounded-xl py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 mx-auto">
                {/* Left Column: Articles */}
                <div className="space-y-4 md:grid-cols-1 lg:grid-cols-1 xl:col-span-1 2xl:col-span-2">
                    <div className="mb-8">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-800 mb-1">Wawasan Terkini</h2>
                        <p className="text-xs lg:text-sm text-gray-500 h-12 line-clamp-2 overflow-hidden">Jelajahi artikel-artikel pilihan untuk memperkaya pengetahuan dan wawasan industri Anda.</p>
                    </div>
                    {articles.map(article => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>

                {/* Right Column: Event List */}
                <div className="space-y-4 md:grid-cols-1 lg:grid-cols-1 xl:col-span-1 2xl:col-span-1">
                    <div className="flex justify-between items-center mb-8 gap-4">
                        <div className="">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-800 mb-1">Agenda Eksklusif</h2>
                            <p className="text-xs lg:text-sm text-gray-500 h-12 line-clamp-2 overflow-hidden">Jangan lewatkan kesempatan untuk terhubung dan berkembang dalam acara-acara inspiratif kami.</p>
                        </div>
                        <div className="text-center w-fit whitespace-nowrap">
                            <a href="/events" className="text-xs lg:text-sm bg-white text-gray-700 font-normal lg:py-3 lg:px-6 rounded-full lg:border lg:border-gray-200 lg:hover:bg-gray-50 transition-colors">
                                Lihat Semua
                            </a>
                        </div>
                    </div>
                    {events.map(event => (
                        <EventCard key={event.slug} event={event} />
                    ))}
                </div>
            </div>
        </section>
    )
}
