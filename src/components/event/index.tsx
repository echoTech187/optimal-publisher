"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchEventData } from "@/features/event/data";
import { EventNews } from "@/types/program";
import { getImageUrl } from "@/lib/utils/image";
import { Icon } from "@iconify/react";
import EventCardSkeleton from "./EventCardSkeleton"; // Import the skeleton component

// Function to determine the number of skeletons to show based on screen width
const getSkeletonCount = () => {
    if (typeof window === 'undefined') return 5; // Default for SSR
    if (window.innerWidth < 640) return 1; // sm
    if (window.innerWidth < 768) return 2; // md
    if (window.innerWidth < 1024) return 3; // lg
    if (window.innerWidth < 1280) return 4; // xl
    return 5; // 2xl
};

// Main component for displaying news and events
export default function NewsEvents() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<EventNews[]>([]);
    const [skeletonCount, setSkeletonCount] = useState(5);

    useEffect(() => {
        // Set skeleton count on initial mount and on resize
        const handleResize = () => {
            setSkeletonCount(getSkeletonCount());
        };
        handleResize(); // Set initial count
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const eventsData = await fetchEventData();
                setEvents(eventsData);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    // Initialize carousel after events are loaded
    useEffect(() => {
        if (!loading && events.length > 0) {
            requestAnimationFrame(() => {
                if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
                    window.HSStaticMethods.autoInit();
                }
            });
        }
    }, [loading, events]);

    return (
        <section className="w-full h-auto py-12 px-4 container mx-auto 2xl:px-0 scroll-mt-24" id="news-events">
            <header className="relative text-center mb-12">
                <Image priority={true} src="/stock/underline.png" alt="" width={500} height={50} className="absolute left-1/2 -translate-x-1/2 top-1 mx-auto h-auto w-1/2 md:w-1/4 mt-8 md:mt-9 z-1" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Berita & Acara</h2>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <EventCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div id="draggable" data-carousel='{ "loadingClasses": "opacity-0","isAutoHeight": true, "slidesQty": { "xs": 1, "sm": 2, "md": 3, "lg": 4 ,"xl": 5 }, "isDraggable": true }' className="relative w-full gap-2">
                    <div className="carousel min-h-[120px] rounded-none">
                        <div className="carousel-body max-md:gap-0 gap-4 h-full carousel-dragging:transition-none carousel-dragging:cursor-grabbing cursor-grab opacity-0">
                            {events.map((item: EventNews, index) => (
                                <EventCard item={item} index={index} key={item.slug} />
                            ))}
                        </div>
                    </div>
                    <CarouselButtons />
                </div>
            )}
        </section>
    );
}

// Extracted Event Card component for clarity
const EventCard = ({ item, index }: { item: EventNews, index: number }) => (
    <div className={`carousel-slide rounded-xl ${index === 0 ? "sm:[&]:ml-4 " : ""}`} key={item.slug}>
        {/* Desktop Card */}
        <div className="max-md:hidden relative flex flex-col rounded-xl size-full justify-center border border-gray-200 cursor-pointer" onClick={() => window.open(`/event/${item.slug}`, "_parent")}>
            <Image priority={true} src={getImageUrl(item.image)} alt={item.title} width={500} height={700} className="size-full object-cover rounded-xl" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" />
            <div className="absolute bottom-0 left-0 right-0 w-full bg-fuchsia-800/50 text-white backdrop-blur-sm flex flex-col justify-between rounded-b-xl p-4 h-fit">
                <span className="text-sm font-semibold line-clamp-1 overflow-hidden mb-2">{item.title}</span>
                <div className="text-xs line-clamp-2 overflow-hidden" dangerouslySetInnerHTML={{ __html: item.description }} />
                <button type="button" className="text-xs px-4 py-2 w-full bg-fuchsia-800 text-white font-bold rounded-full hover:bg-fuchsia-950 flex justify-between items-center mt-2">
                    <span>Daftar Sekarang</span>
                    <Icon icon="tabler:arrow-right" width="20" height="20" className="text-white" />
                </button>
            </div>
        </div>
        {/* Mobile Card */}
        <div className="md:hidden relative flex items-center rounded-xl h-36 bg-gray-100 dark:bg-gray-800 size-full justify-center border border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => window.open(`/event/${item.slug}`, "_parent")}>
            <div className="w-1/3 h-full p-2">
                <Image priority={true} src={getImageUrl(item.image)} alt={item.title} width={500} height={700} className="size-full object-cover rounded-lg" />
            </div>
            <div className="w-2/3 h-full flex flex-col justify-between rounded-r-lg p-2">
                <span className="text-sm font-semibold line-clamp-2 overflow-hidden">{item.title}</span>
                <div className="text-xs line-clamp-2 overflow-hidden" dangerouslySetInnerHTML={{ __html: item.description }} />
                <button type="button" className="text-[10px] px-3 py-1.5 w-full bg-fuchsia-800 text-white font-bold rounded-full hover:bg-fuchsia-950 flex justify-between items-center mt-1">
                    <span>Daftar Sekarang</span>
                    <Icon icon="tabler:arrow-right" width="16" height="16" className="text-white" />
                </button>
            </div>
        </div>
    </div>
);

// Extracted Carousel Buttons component for clarity
const CarouselButtons = () => (
    <>
        <button type="button" className="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-0 opacity-80 size-9.5 bg-white/10 backdrop-blur-3xl flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
            <Icon icon="tabler:chevron-left" width="24" height="24" className="text-fuchsia-500 size-5" />
            <span className="sr-only">Previous</span>
        </button>
        <button type="button" className="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-0 opacity-80 size-9.5 bg-white/10 backdrop-blur-3xl flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
            <Icon icon="tabler:chevron-right" width="24" height="24" className="text-fuchsia-500 size-5" />
            <span className="sr-only">Next</span>
        </button>
    </>
);