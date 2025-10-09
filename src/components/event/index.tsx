"use client";
import Image from "next/image";
export default function NewsEvents() {
    return (<>
        <section className="w-full h-auto pt-[100px] px-4  max-w-[1300px] mx-auto 2xl:px-0" id="news-events">
            <header className="relative text-2xl font-extrabold text-center mb-24">
                <Image priority={true}src="/stock/underline.png" alt="Underline" width={2000} height={0} className="absolute left-1/2 -translate-x-1/2 top-1 mx-auto h-auto w-1/6 mt-9 z-1" />
                <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Berita & Acara</h1>
            </header>
            <div id="draggable" data-carousel='{ "loadingClasses": "opacity-0","dotsItemClasses": "carousel-dot carousel-active:bg-primary","isAutoHeight": true, "slidesQty": { "xs": 1, "md": 2, "lg": 3 }, "isDraggable": true }' className="relative w-full" >
                <div className="carousel h-[690px] rounded-none">
                    <div className="carousel-body max-md:gap-0 gap-4 h-full carousel-dragging:transition-none carousel-dragging:cursor-grabbing cursor-grab opacity-0" >
                        <div className="carousel-slide">
                            <div className="flex flex-col size-full justify-center border border-gray-200" onClick={() => window.open("/auth/signin?type=event", "_parent")}>
                                <Image priority={true}src="/browser/Menulis Artikel Ilmiah.png" alt="Event 1" width={0} height={0} className="size-full object-cover" />
                                <div className="flex size-full items-center justify-between bg-white p-6 h-20 rounded-t-xl -mt-2">
                                    <span className="text-lg font-bold">Rp. 100.000/acara</span>
                                    <button type="button" className="px-4 py-2 bg-fuchsia-800 text-white text-sm rounded font-bold">Daftar Sekarang</button>
                                </div>
                            </div>

                        </div>
                        <div className="carousel-slide">
                            <div className="flex flex-col size-full justify-center border border-gray-200" onClick={() => window.open("/auth/signin?type=event", "_parent")}>
                                <Image priority={true}src="/browser/9.png" alt="Event 1" width={0} height={0} className="size-full object-cover" />
                                <div className="flex size-full items-center justify-between bg-white p-6 h-20 rounded-t-xl -mt-2">
                                    <span className="text-lg font-bold">Rp. 100.000/acara</span>
                                    <button type="button" className="px-4 py-2 bg-fuchsia-800 text-white text-sm rounded font-bold">Daftar Sekarang</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-slide">
                            <div className="flex flex-col size-full justify-center border border-gray-200" onClick={() => window.open("/auth/signin?type=event", "_parent")}>
                                <Image priority={true}src="/browser/Cerdas Cermat.png" alt="Event 1" width={0} height={0} className="size-full object-cover" />
                                <div className="flex size-full items-center justify-between bg-white p-6 h-20 rounded-t-xl -mt-2">
                                    <span className="text-lg font-bold">Rp. 100.000/acara</span>
                                    <button type="button" className="px-4 py-2 bg-fuchsia-800 text-white text-sm rounded font-bold">Daftar Sekarang</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-slide">
                            <div className="flex flex-col size-full justify-center border border-gray-200" onClick={() => window.open("/auth/signin?type=event", "_parent")}>
                                <Image priority={true}src="/browser/Cipta Poster Kesehatan.png" alt="Event 1" width={0} height={0} className="size-full object-cover" />
                                <div className="flex size-full items-center justify-between bg-white p-6 h-20 rounded-t-xl -mt-2">
                                    <span className="text-lg font-bold">Rp. 100.000/acara</span>
                                    <button type="button" className="px-4 py-2 bg-fuchsia-800 text-white text-sm rounded font-bold">Daftar Sekarang</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-slide">
                            <div className="flex flex-col size-full justify-center border border-gray-200" onClick={() => window.open("/auth/signin?type=event", "_parent")}>
                                <Image priority={true}src="/browser/Kreasi Cuci Tangan.png" alt="Event 1" width={0} height={0} className="size-full object-cover" />
                                <div className="flex size-full items-center justify-between bg-white p-6 h-20 rounded-t-xl -mt-2">
                                    <span className="text-lg font-bold">Rp. 100.000/acara</span>
                                    <button type="button" className="px-4 py-2 bg-fuchsia-800 text-white text-sm rounded font-bold">Daftar Sekarang</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-slide">
                            <div className="flex flex-col size-full justify-center border border-gray-200" onClick={() => window.open("/auth/signin?type=event", "_parent")}>
                                <Image priority={true}src="/browser/Lomba Puisi.png" alt="Event 1" width={0} height={0} className="size-full object-cover" />
                                <div className="flex size-full items-center justify-between bg-white p-6 h-20 rounded-t-xl -mt-2">
                                    <span className="text-lg font-bold">Rp. 100.000/acara</span>
                                    <button type="button" className="px-4 py-2 bg-fuchsia-800 text-white text-sm rounded font-bold">Daftar Sekarang</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-pagination absolute bottom-3 end-0 start-0 flex justify-center gap-3"></div>
            </div>
        </section>
    </>);
}