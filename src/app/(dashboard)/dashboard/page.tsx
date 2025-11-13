"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { EventNews } from "@/types/program";
import { fetchEventData } from "@/features/event/data";
import { getArticles } from "@/features/article/data";
import { Article } from "@/types/article";
import { getImageUrl } from "@/lib/utils/image";


export function DashboardPage() {
    const [events, setEvents] = useState<EventNews[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const tipImages = [
        '/images/tips/2.png',
        '/images/tips/3.png',
        '/images/tips/4.png',
        '/images/tips/5.png',
        '/images/tips/6.png',
        '/images/tips/7.png',
        '/images/tips/8.png',
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // >>> GANTILAH BAGIAN INI DENGAN FUNGSI PENGAMBILAN DATA ANDA <<<
                const eventData = await fetchEventData();
                const articleData = await getArticles(); // Placeholder for your function

                if (eventData && eventData.length > 0) {
                    setEvents(eventData);
                } else {
                    setEvents([]);
                }

                if (articleData && articleData.length > 0) {
                    setArticles(articleData);
                } else {
                    setArticles([]);
                }

            } catch (error) {
                console.error("Failed to fetch data:", error);
                setEvents([]);
                setArticles([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter and sort for the 3 upcoming events
    const upcomingEvents = events
        .filter(event => new Date(event.event_date) <= new Date())
        .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
        .slice(0, 5);

    if (isLoading) return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-white/20 backdrop-blur-3xl shadow-xl z-50 flex justify-center items-center">
            <Image src="/penerbit-logo.png" alt="logo" width={200} height={100} priority={true} className="animate-pulse w-24" />
        </div>
    )
    return (
        <div className="container m-auto p-6 ">
            <DashboardHeroSection />
            <DashboardEventNewsEventCardSection events={upcomingEvents} articles={articles} />
        </div>
    );
}

export function DashboardEventNewsEventCardSection({ events, articles }: { events: EventNews[]; articles: Article[] }) {
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
        ); // Or some other loading indicator
    }
    return (
        <section className=" dark:bg-gray-800 rounded-xl py-6">

            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8 mx-auto">
                {/* Left Column: Image */}
                <div className="space-y-4 2xl:col-span-2">
                    <div className="mb-8">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-800 mb-1">Artikel Terbaru</h2>
                        <p className="text-xs lg:text-sm text-gray-500">Baca artikel-artikel terbaru kami untuk meningkatkan wawasan Anda.</p>
                    </div>
                    {
                        articles.map(article => (
                            <ArticleCard key={article.slug} article={article} />
                        ))
                    }
                </div>

                {/* Right Column: Event List */}
                <div className="space-y-4 2xl:col-span-1">
                    <div className="flex justify-between items-center mb-8 gap-4">
                        <div className="">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-800 mb-1">Acara Mendatang</h2>
                            <p className="text-xs lg:text-sm text-gray-500">Bergabung bersama kami di acara-acara yang akan datang.</p>
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

export function EventCard({ event }: { event: EventNews }) {
    return (
        <div
            key={event.slug}
            className={`md:p-3 rounded-2xl w-full cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-2 hover:border-blue-500 bg-white/70 hover:shadow-xl`}
        >
            <div className="flex items-center gap-4">
                <div className="w-2/6 md:w-1/6 lg:w-1/4 xl:w-2/6 rounded-lg overflow-hidden shadow-xl h-full">
                    <Image src={getImageUrl(event.image)} alt={event.title} width={5000} height={6000} className="transition-opacity duration-500 w-full h-full object-cover" />
                </div>
                <div className="w-4/6 md:w-5/6 lg:w-3/4 xl:w-4/6">
                    <h3 className="font-bold max-md:text-sm text-xl text-gray-900 line-clamp-1 "><a href={`/event/${event.slug}`}>{event.title}</a></h3>
                    <p className="max-md:text-xs text-sm text-gray-500 mb-3">{new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div dangerouslySetInnerHTML={{ __html: event.description }} className="html-content max-md:text-xs text-sm text-gray-600 line-clamp-6 md:line-clamp-6 lg:line-clamp-3 xl:line-clamp-5 2xl:line-clamp-7 overflow-hidden" />
                </div>
            </div>
        </div>
    )
}

export function ArticleCard({ article }: { article: Article }) {
    return (
        <div key={article.slug} className={`md:p-3 rounded-2xl w-full cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-2 hover:border-blue-500 bg-white/70 hover:shadow-xl`}>
            <div className="flex items-center gap-4">
                <div className="relative w-2/6 md:w-1/6 lg:w-1/4 xl:w-3/12 shrink-0 h-[80px] md:h-[100px] lg:h-[120px] xl:h-[150px] 2xl:h-[150px] rounded-md overflow-hidden">
                    <Image src={getImageUrl(article.image)} alt={article.title} width={6000} height={5000} className="h-full w-full rounded-md md:rounded-lg object-cover" />
                </div>
                <div className="w-4/6 md:w-5/6 lg:w-3/4 xl:w-9/12 flex flex-col items-start justify-start">
                    <h3 className="font-bold max-md:text-sm text-xl text-gray-900 line-clamp-2"><a href={`/article/${article.slug}`}>{article.title}</a></h3>
                    <p className="max-md:text-xs text-sm text-gray-500 mb-3">{new Date(article.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    {/* <div dangerouslySetInnerHTML={{ __html: article.description }} className="html-content text-xs md:text-sm text-gray-600 line-clamp-3  md:line-clamp-6 lg:line-clamp-3 xl:line-clamp-5 overflow-hidden" /> */}
                </div>
            </div>
        </div>
    )
}
export function DashboardHeroSection() {
    return (
        <section className="bg-white/60 dark:bg-gray-800 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mx-auto">
                <div className={`bg-white max-md:p-4 md:p-6 xl:p-8 rounded-2xl border-3 border-amber-100 w-full relative `}>
                    <div className="flex items-center gap-4 ">
                        <div className={`p-4 rounded-xl bg-yellow-100`}>
                            <Icon icon="ion:book-outline" className={`size-8 md:size-10 lg:size-12 text-gray-800`} />
                        </div>
                        <div className="flex-1 ">
                            <h3 className="text-2xl max-lg:text-base lg:text-lg xl:text-base font-bold text-gray-800">ISBN</h3>
                            <p className="text-gray-600 text-sm max-lg:text-xs">Terbitkan karya anda dengan ISBN</p>
                        </div>
                        <Link href="/program" className=" max-lg:hidden flex max-lg:items-center max-lg:justify-between max-lg:w-full max-lg:text-sm max-lg:gap-2 max-lg:bg-amber-300/20 max-lg:px-4 max-lg:py-2 max-lg:rounded-lg">
                            <span className="md:hidden font-semibold">Daftar Sekarang</span>
                            <Icon icon="ion:arrow-forward-circle-outline" className={`size-12 max-lg:size-8 text-yellow-800`} />
                        </Link>
                    </div>

                </div>
                <div className={`bg-white max-md:p-4 md:p-6 xl:p-8 rounded-2xl border-3 border-fuchsia-100 w-full relative `}>
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-xl bg-fuchsia-100`}>
                            <Icon icon="ion:library-outline" className={`size-8 md:size-10 lg:size-12 text-gray-800`} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl max-lg:text-base lg:text-lg xl:text-base font-bold text-gray-800">Hak Kekayaan Intelektual</h3>
                            <p className="text-sm max-lg:text-xs text-gray-600 ">Lindungi karya anda dengan hak kekayaan intelektual</p>
                        </div>
                        <Link href="/hki/register" className=" max-lg:hidden flex max-lg:items-center max-lg:justify-between max-lg:w-full max-lg:text-sm max-lg:gap-2 max-lg:bg-fuchsia-300/20 max-lg:px-4 max-lg:py-2 max-lg:rounded-lg">
                            <span className="md:hidden font-semibold">Daftar Sekarang</span>
                            <Icon icon="ion:arrow-forward-circle-outline" className={`size-12 max-lg:size-8 text-fuchsia-800`} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default DashboardPage;
