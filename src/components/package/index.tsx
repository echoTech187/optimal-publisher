"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
export default function Package() {
    return (
        <section className="w-full h-auto py-[100px] px-4 max-w-[1300px] mx-auto 2xl:px-0" id="package">
            <header className="relative text-2xl font-extrabold text-center mb-24">
                <Image priority={true}src="/stock/underline.png" alt="Underline" width={2000} height={0} className="absolute left-1/2 -translate-x-1/2 top-1 mx-auto h-auto w-1/4 mt-9 z-1" />
                <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Pilih Paket Belajarmu</h1>
            </header>
            <section className="w-full h-auto mt-8 flex flex-wrap justify-center gap-6">
                <div className="flex flex-col rounded-xl shadow-md bg-gradient-to-r from-[#e7e7e7] to-[#fff] dark:from-[#111] dark:to-[#333] dark:text-gray-50 text-black hover:cursor-pointer hover:shadow-2xl backdrop-blur-md max-w-sm">
                    <div className="relative text-xl font-bold mb-36 p-6">
                        <Image priority={true}priority={true} src="/courses/Bimbel-Perawat.png" alt="Icon Nurse" width={4800} height={3800} className="mb-2 absolute top-0 left-0 object-contain w-full -z-1 rounded-t-lg" />
                    </div>
                    <div className=" w-full">
                        <h5 className="text-xl font-bold text-center p-6 h-24">Bimbingan Belajar Intensif untuk Perawat</h5>
                        <ol className="list-outside space-y-4 text-sm px-6">
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Mendapatkan 3 paket try out disertai pembahasan via web Apps UKOM</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Total Soal 540 butir (3 paket try out)</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Berbasis Platform CBT (mirip dengan sistem try out UKOM)</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Dilengkapi dengan fitur pembahasan soal via web</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Dilengkapi dengan fitur hasil try out yang detail dan perangkingan</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Akses dimanapun dan Kapanpun</li>
                        </ol>
                        <div className="mt-4 border border-dotted border-gray-200 h-[1px]" />
                        <div className="flex justify-center px-6 py-4">
                            <button onClick={() => window.open("https://wa.link/gkfaqz", "_parent")} className="w-fit py-3 px-4 rounded-lg transition-colors bg-white dark:bg-black/80 dark:text-green-500 dark:hover:text-green-400 text-green-700 hover:font-semibold text-sm hover:bg-transparent border border-transparent hover:border-green-800 hover:text-green-800 flex items-center justify-center">
                                <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" /> Hubungi Kami
                            </button>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col rounded-xl shadow-md bg-gradient-to-r from-[#e7e7e7] to-[#fff] dark:from-[#111] dark:to-[#333] dark:text-gray-50 text-black hover:cursor-pointer hover:shadow-2xl backdrop-blur-md max-w-sm">
                    <div className="relative text-xl font-bold mb-36 p-6">
                        <Image priority={true}priority={true} src="/courses/Bimbel-Bidan.png" alt="Icon Nurse" width={4800} height={3800} className="mb-2 absolute top-0 left-0 object-contain w-full -z-1 rounded-t-lg" />
                    </div>
                    <div className="w-full">
                        <h5 className="text-xl font-bold text-center p-6 h-24">Bimbingan Belajar Intensif untuk Bidan</h5>
                        <ol className="list-outside space-y-4 text-sm px-6">
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Mendapatkan 3 paket try out disertai pembahasan via web Apps UKOM</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Total Soal 540 butir (3 paket try out)</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Berbasis Platform CBT (mirip dengan sistem try out UKOM)</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Dilengkapi dengan fitur pembahasan soal via web</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Dilengkapi dengan fitur hasil try out yang detail dan perangkingan</li>
                            <li className="before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-gray-100 dark:before:bg-gray-800 dark:before:text-purple-200 before:text-purple-700 before:font-fontawesome before:mr-2 before:text-xs">Akses dimanapun dan Kapanpun</li>
                        </ol>
                        <div className="mt-4 border border-dotted border-gray-200 h-[1px]" />
                        <div className="flex justify-center px-6 py-4">
                            <button onClick={() => window.open("https://wa.link/gkfaqz", "_parent")} className="w-fit py-3 px-4 rounded-lg transition-colors bg-white dark:bg-black/80 dark:text-green-500 dark:hover:text-green-400 text-green-700 hover:font-semibold text-sm hover:bg-transparent border border-transparent hover:border-green-800 hover:text-green-800 flex items-center justify-center">
                                <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" /> Hubungi Kami
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </section>
    );
}