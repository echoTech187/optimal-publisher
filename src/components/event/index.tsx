"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchEventData } from "@/features/event/data";
import { EventNews } from "@/types/program";
import { getImageUrl } from "@/lib/utils/image";
export default function NewsEvents() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    async function fetchEvents() {
        const events = await fetchEventData();
        setEvents(events);
        setLoading(false);
    }
    useEffect(() => {

        fetchEvents();
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            requestAnimationFrame(() => {
                if (
                    window.HSStaticMethods &&
                    typeof window.HSStaticMethods.autoInit === 'function'
                ) {
                    window.HSStaticMethods.autoInit();
                }
            });
        }
    }, [events]);

    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        )
    }
    return (<>
        <section className="w-full h-auto pt-[100px] px-4  container mx-auto 2xl:px-0" id="news-events">
            <header className="relative text-2xl font-extrabold text-center mb-24">
                <Image priority={true} src="/stock/underline.png" alt="Underline" width={2000} height={0} className="absolute left-1/2 -translate-x-1/2 top-1 mx-auto h-auto w-1/6 mt-9 z-1" />
                <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Berita & Acara</h1>
            </header>
            <div id="draggable" data-carousel='{ "loadingClasses": "opacity-0","dotsItemClasses": "carousel-dot carousel-active:bg-primary","isAutoHeight": true, "slidesQty": { "xs": 1, "sm": 2, "md": 3, "lg": 4 ,"xl": 5 }, "isDraggable": true }' className="relative w-full" >
                <div className="carousel min-h-[120px] rounded-none">
                    <div className="carousel-body max-md:gap-0 gap-4 h-full carousel-dragging:transition-none carousel-dragging:cursor-grabbing cursor-grab opacity-0" >
                        {
                            events.map((item: EventNews, index) => (
                                <div className={`carousel-slide rounded-xl ${index === 0 ? "sm:[&]:ml-4 " : ""}`} key={item.slug}>
                                    <div className="relative flex flex-col rounded-xl size-full justify-center border border-gray-200" onClick={() => window.open(`/event/${item.slug}`, "_parent")}>
                                        <Image priority={true} src={getImageUrl(item.image)} alt={item.title} width={0} height={0} className="size-full object-cover rounded-xl" />
                                        <div className="absolute -bottom-2 left-0 right-0 w-full mb-2 h-1/4 bg-fuchsia-800/50 text-white backdrop-blur-sm flex flex-col size-full justify-between rounded-lg -mt-2 p-2">
                                            <span className="px-2 font-semibold flex-1 line-clamp-2 overflow-hidden">{item.title}</span>
                                            
                                            <button type="button" className="px-4 py-2 w-full bg-fuchsia-800 text-white text-sm rounded-full hover:bg-fuchsia-950 font-bold">Daftar Sekarang</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="carousel-pagination absolute -bottom-6 end-0 start-0 flex justify-center gap-3"></div>
            </div>
        </section>
    </>);
}