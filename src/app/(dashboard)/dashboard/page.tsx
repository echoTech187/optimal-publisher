'use client';

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { EventNews } from "@/types/program"; // EventNews is in program.ts
import { Article } from "@/types/article";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchEventData } from "@/features/event/data";
import { getImageUrl } from "@/lib/utils/image";
import { getArticles } from "@/features/article/data";

const mockStats = [
    { value: "10+", label: "Program Unggulan" },
    { value: "500+", label: "Pengguna Terdaftar" },
    { value: "100+", label: "Buku Terbit" },
    { value: "95%", label: "Tingkat Kepuasan" },
];

// --- Animation Variants ---
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

// --- COMPONENTS ---

const HeroSection = () => (
    <motion.section
        className="object-cover h-auto flex items-center justify-center bg-cover bg-center bg-no-repeat py-12 lg:px-8 2xl:min-h-[700px]"
        style={{ backgroundImage: "url('/images/Poster.png')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
    >
        <div className="container mx-auto p-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Membuka Potensi, Menuang Karya
            </h1>
            <p className="text-lg md:text-xl text-gray-950 mb-10">
                Platform terdepan untuk penulis, peneliti, dan profesional yang ingin menerbitkan karya berkualitas tinggi.
            </p>
            <div className="flex flex-col gap-6 justify-center items-center">
                <motion.button
                    className="border border-fuchsia-500/30 bg-fuchsia-800/90 drop-shadow-2xl backdrop-blur-2xl text-white font-semibold py-3 px-8 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Terbitkan Karya Anda
                </motion.button>
                <motion.button
                    className="text-fuchsia-900"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Baca Tips Menulis Karya Ilmiah
                </motion.button>
            </div>
        </div>
        {/* <motion.div 
            className="relative h-96 mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
            <Image src="/images/banner.png" alt="Illustration" layout="fill" objectFit="contain" />
        </motion.div> */}
    </motion.section>
);

const StatsSection = () => (
    <motion.section
        className="my-12 p-8 lg:p-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
    >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {mockStats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <p className="text-4xl lg:text-5xl font-bold text-green-500 mb-2">{stat.value}</p>
                    <p className="text-sm lg:text-base text-gray-600">{stat.label}</p>
                </motion.div>
            ))}
        </div>
    </motion.section>
);

const EventsSection = ({ events }: { events: EventNews[] }) => {
    const [selectedEvent, setSelectedEvent] = useState<EventNews | null>(null);

    useEffect(() => {
        if (events && events.length > 0) {
            setSelectedEvent(events[0]);
        }
    }, [events]);

    if (!events || events.length === 0) {
        return (
            <div className="my-12 p-8 lg:p-12 flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center">Tidak ada acara tersedia.</h2>
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
        <motion.section
            className="my-12 p-8 lg:p-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className=" mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Acara Mendatang</h2>
                <p className="text-base lg:text-lg text-gray-500 mt-2">Ikuti acara menarik untuk menambah wawasan Anda.</p>
            </div>
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left Column: Image */}
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl sticky top-8">
                    <Image src={getImageUrl(selectedEvent.image)} alt={selectedEvent.title} width={5000} height={6000} className="transition-opacity duration-500 w-full h-full object-cover" />
                </div>

                {/* Right Column: Event List */}
                <div className="space-y-6">
                    {events.map(event => (
                        <motion.div
                            key={event.slug}
                            onClick={() => setSelectedEvent(event)}
                            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${selectedEvent.slug === event.slug ? 'bg-white shadow-2xl border-2 border-blue-500' : 'bg-white/70 shadow-lg hover:shadow-xl'}`}
                            whileHover={{ scale: 1.03 }}
                        >
                            <h3 className="font-bold text-xl text-gray-900 ">{event.title}</h3>
                            <p className="text-sm text-gray-500 mb-3">{new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <div dangerouslySetInnerHTML={{ __html: event.description }} className="html-content text-sm text-gray-600 line-clamp-2 overflow-hidden" />
                        </motion.div>
                    ))}
                    <div className="text-center mt-12">
                        <a href="/events" className="bg-white text-gray-700 font-semibold py-3 px-6 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50
       transition-colors">
                            Lihat Semua Acara
                        </a>
                    </div>
                </div>

            </div>
            {/* Mobile: Simple Vertical List */}
            <div className="block lg:hidden flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory">
                {events.map(event => (
                    <motion.div
                        key={event.slug}
                        className="bg-white/70 border border-white/20 rounded-2xl shadow-lg backdrop-blur-md overflow-hidden group min-w-[280px] snap-center flex flex-col justify-between"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >                        <div className="relative h-56 w-full">
                            <Image src={getImageUrl(event.image)} alt={event.title} width={5000} height={6000} className="transition-opacity duration-500 w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex-1 w-full h-auto flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">{event.title}</h3>
                                <p className="text-sm text-gray-500 mb-3">{new Date(event.event_date).toLocaleDateString('id-ID', {
                                    weekday: 'long', year: 'numeric',
                                    month: 'long', day: 'numeric'
                                })}</p>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: event.description }} className="html-content text-sm text-gray-600 line-clamp-3" />
                            <a href={`/event/${event.slug}`} className="mt-4 font-semibold text-green-500 hover:text-green-600 transition-colors inline-block">
                                Daftar Sekarang <Icon icon="ic:round-arrow-forward" className="inline-block" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-12 block lg:hidden">
                <a href="/events" className="bg-white text-gray-700 font-semibold py-3 px-6 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50
       transition-colors">
                    Lihat Semua Acara
                </a>
            </div>
        </motion.section>
    );
};

const ArticlesSection = ({ articles }: { articles: Article[] }) => (
    <motion.section
        className="my-12 p-8 lg:p-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
        <div className="text-left mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Wawasan Terbaru</h2>
            <p className="text-base lg:text-lg text-gray-500 mt-2">Baca artikel dan tips terbaru dari para ahli di bidangnya.</p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block space-y-8">
            {articles.map((article, index) => (
                <motion.div
                    key={article.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row md:items-start gap-0 md:h-42"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full md:w-1/3">
                        <Image src={getImageUrl(article.image)} alt={article.title} width={5000} height={6000} className="transition-opacity duration-500 w-full h-full object-cover" />
                    </div>
                    <div className="p-8 w-full h-full md:w-2/3 flex flex-col justify-between">
                        <div>
                            <p className="text-sm text-green-500 font-semibold mb-1">{article.article_category.category.toUpperCase()}</p>
                            <h3 className="font-bold text-lg text-gray-800 mb-3">{article.title}</h3>
                        </div>
                        {/* <div dangerouslySetInnerHTML={{ __html: article.description }} className="text-gray-600 mb-4 html-content"/> */}
                        <a href={`/article/${article.slug}`} className="font-semibold text-green-500 hover:text-green-600 transition-colors group-hover:translate-x-1 inline-block">
                            Read Article <Icon icon="ic:round-arrow-forward" className="inline-block" />
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Mobile View */}
        <div className="block md:hidden flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {articles.map((article, index) => (
                <motion.div
                    key={article.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col items-center gap-0 min-w-[300px] snap-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full h-64">
                        <Image src={getImageUrl(article.image)} alt={article.title} width={5000} height={6000} className="transition-opacity h-64 duration-500 w-full  object-cover" />
                    </div>
                    <div className="p-8 w-full">
                        <p className="text-sm text-green-500 font-semibold mb-1">{article.article_category.category.toUpperCase()}</p>
                        <h3 className="font-bold text-xl text-gray-800 mb-3">{article.title}</h3>
                        {/* <div dangerouslySetInnerHTML={{ __html: article.description }} className="text-gray-600 mb-4 html-content"/> */}
                        <a href={`/article/${article.slug}`} className="font-semibold text-green-500 hover:text-green-600 transition-colors group-hover:translate-x-1 inline-block">
                            Read Article <Icon icon="ic:round-arrow-forward" className="inline-block" />
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.section>
);

import TipsSection from "@/components/main/TipsSection";

export default function DashboardPage() {
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
        .slice(0, 3);

    if (isLoading) return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-white/20 backdrop-blur-3xl shadow-xl z-50 flex justify-center items-center">
            <Image src="/penerbit-logo.png" alt="logo" width={200} height={100} priority={true} className="animate-pulse w-24" />
        </div>
    )
    return (
        <div className="bg-[#F4F7FE]">
            <div className="">
                <HeroSection />
                {/* <StatsSection /> */}
                <div className="grid grid-cols-1 2xl:grid-cols-2 lg:gap-8 mb-12">
                    <EventsSection events={upcomingEvents} />
                    <ArticlesSection articles={articles} />
                </div>
                <TipsSection images={tipImages} />
            </div>
        </div>
    );
}