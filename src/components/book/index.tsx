"use client";
import { Icon } from "@iconify/react"
import Image from "next/image"
export default function Book() {
    return (
        <section id="book" className="min-h-full w-full px-5 lg:px-0 bg-gradient-to-r from-[#f4c573] to-[#f5be5f] text-black dark:text-white dark:bg-gray-800  py-[100px]">
            <div className="container mx-auto h-full">
                <div className="flex max-md:flex-col md:flex-row items-center h-full w-full gap-12 py-12">
                    <div className="flex-1">
                        <Image priority={true}src="/images/book-recommended.png" alt="Underline" width={2000} height={0} className="md:w-full lg:2/3 h-auto mx-auto" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-6xl font-semibold mb-3 dark:text-gray-50">Temukan Buku yang Sesuai Untukmu</h1>
                        <p className="text-3xl text-black/60 dark:text-gray-50">Temukan buku yang sesuai dengan kebutuhanmu dengan mudah dan cepat</p>
                        <button onClick={() => window.open("/book", "_parent")} className="flex items-center justify-between gap-6 mt-6 py-3 px-6 rounded-md transition-colors bg-black/90 backdrop-blur-3xl text-white font-semibold hover:bg-yellow-700 hover:text-white">
                            <span className="flex items-center gap-2">
                                <Icon icon="tabler:books" className="size-6" width="32" height="32" />
                                Temukan Sekarang
                            </span>
                            <Icon icon="tabler:arrow-right" className="size-6" width="32" height="32" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}