// src/components/dashboard/EventCard.tsx
"use client";

import Image from "next/image";
import { EventNews } from "@/types/program";
import { getImageUrl } from "@/lib/utils/image";
import DOMPurify from 'dompurify';

export default function EventCard({ event }: { event: EventNews }) {
    // Ensure description is a string before sanitizing
    const sanitizedDescription = typeof event.description === 'string' 
        ? DOMPurify.sanitize(event.description) 
        : '';

    return (
        <div
            key={event.slug}
            className={`lg:p-3 rounded-2xl w-full cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-2 hover:border-blue-500 bg-white/70 hover:shadow-xl`}
        >
            <div className="flex items-center gap-4">
                <div className="w-2/6 md:w-2/6 lg:w-1/4 xl:w-2/6 rounded-lg overflow-hidden shadow-xl h-full">
                    <Image src={getImageUrl(event.image)} alt={event.title} width={5000} height={6000} className="transition-opacity duration-500 w-full h-full object-cover" />
                </div>
                <div className="w-4/6 md:w-4/6 lg:w-3/4 xl:w-4/6">
                    <h3 className="font-bold max-lg:text-sm text-xl text-gray-900 line-clamp-1 "><a href={`/event/${event.slug}`}>{event.title}</a></h3>
                    <p className="max-lg:text-xs text-sm text-gray-500 mb-3">{new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div 
                        dangerouslySetInnerHTML={{ __html: sanitizedDescription }} 
                        className="html-content max-md:text-xs text-sm text-gray-600 line-clamp-6 md:line-clamp-6 lg:line-clamp-3 xl:line-clamp-5 2xl:line-clamp-7 overflow-hidden" 
                    />
                </div>
            </div>
        </div>
    );
}