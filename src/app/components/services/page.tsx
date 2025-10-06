"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { checkAuthentication } from "@/utils/authentication";
import { useRouter } from "next/navigation";
export default function Services() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const authStatus = checkAuthentication();
        if (authStatus) setIsAuth(true);

    })
    const IsbnHandler = () => {
        return isAuth ? window.open("/program", "_parent") : window.open("/auth?type=isbn", "_parent");
    }

    return (
        <>
            <section id="services" className="h-auto w-full px-5 lg:px-0 dark:bg-gray-800 pt-[100px]">
                <div className="max-w-[1300px] mx-auto h-full">
                    <header className="relative text-2xl font-extrabold text-center mb-24">
                        <Image src="/stock/underline.png" alt="Underline" width={2000} height={0} className="absolute left-1/2 -translate-x-1/2 top-1 mx-auto h-auto w-1/4 mt-9 z-1" />
                        <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Apa yang Anda Cari?</h1>
                    </header>
                    <div className="flex items-center h-full w-full gap-12 py-12">
                        <div className="flex-1 max-md:hidden">
                            <Image src="/images/ISBN.png" alt="Underline" width={2000} height={0} className="md:w-full lg:w-2/3 h-auto mx-auto" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-6xl font-semibold mb-3 text-gray-700 dark:text-gray-50">Penulisan ISBN</h1>
                            <p className="text-2xl text-black/80">Mulai petualangan menulis bersama Optimal, di mana kata-kata menjadi jembatan yang menghubungkan ide-ide cemerlang. Optimal membantu Anda mengungkap potensi terbaik dalam menulis dengan alat dan layanan canggih. Bersama Optimal, mulai menulis bersama dan jelajahi batas-batas tulisan yang tak terbatas.</p>
                            <button onClick={IsbnHandler} className="flex items-center justify-between gap-6 mt-12 py-3 px-6 rounded-md transition-colors bg-yellow-400 text-black font-semibold hover:bg-yellow-700 hover:text-white">
                                <span className="flex items-center gap-2">
                                    Mulai Sekarang
                                </span>
                                <Icon icon="tabler:arrow-right" className="size-6" width="32" height="32" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-auto w-full px-5 lg:px-0 bg-gradient-to-r from-[#f4c573] to-[#f5be5f] text-black dark:text-gray-50 dark:bg-gray-800">
                <div className="max-w-[1300px] mx-auto h-full">
                    <div className="flex items-center h-full w-full gap-12 py-12">

                        <div className="flex-1">
                            <h1 className="text-6xl font-semibold mb-3">Publikasi ISSN</h1>
                            <p className="text-2xl text-black/80">Mulai petualangan publikasi bersama Optimal, di mana kata-kata Anda menggema dunia luar. Dengan Optimal, karya Anda dapat dijangkau oleh siapa pun di seluruh dunia. Mulai publikasi bersama dan bagikan karya Anda dengan dunia melalui Optimal.</p>
                            <button onClick={() => window.open("/auth?type=issn", "_parent")} className="flex items-center justify-between gap-6 mt-12 py-3 px-6 rounded-md transition-colors bg-black/90 backdrop-blur-3xl text-white font-semibold hover:bg-yellow-700 hover:text-white">
                                <span className="flex items-center gap-2">
                                    Publikasikan
                                </span>
                                <Icon icon="tabler:arrow-right" className="size-6" width="32" height="32" />
                            </button>
                        </div>
                        <div className="flex-1 max-md:hidden">
                            <Image src="/images/ISSN.png" alt="Underline" width={2000} height={0} className="md:w-full lg:2/3 h-auto mx-auto" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-auto w-full px-5 lg:px-0 dark:bg-gray-800">
                <div className="max-w-[1300px] mx-auto h-full">
                    <div className="flex items-center h-full w-full gap-12 py-12">
                        <div className="flex-1 max-md:hidden">
                            <Image src="/images/HKI.png" alt="Underline" width={2000} height={0} className="md:w-full lg:w-2/3  h-auto mx-auto" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-6xl font-semibold mb-3 text-gray-700 dark:text-gray-50">Hak Kekayaan Intelektual</h1>
                            <p className="text-2xl text-black/80">Hak paten, merek, desain industri, hak cipta, indikasi geografis, rahasia dagang, dan desain tata letak sirkuit terpadu - semua ini menjadi bagian integral dari karya dan inovasi yang mengubah dunia. Dengan melindungi hak-hak ini, kita memastikan karya dan ide-ide cemerlang tetap terjaga dan terlindungi. Bersama-sama, kita mempromosikan kreativitas, inovasi, dan kemajuan dalam berbagai bidang.</p>
                            <button onClick={() => window.open("/auth?type=hki", "_parent")} className="flex items-center justify-between gap-6 mt-12 py-3 px-6 rounded-md transition-colors bg-yellow-400 text-black font-semibold hover:bg-yellow-700 hover:text-white">
                                <span className="flex items-center gap-2">
                                    Daftarkan
                                </span>
                                <Icon icon="tabler:arrow-right" className="size-6" width="32" height="32" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}