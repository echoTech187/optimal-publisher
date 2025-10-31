"use client";
import { Icon } from "@iconify/react";

export default function Faqs() {
    return (
        <div className="bg-gray-50 dark:bg-gray-700 scroll-mt-24" id="faqs">
            <div className="container mx-auto px-4 py-[100px]  rounded-lg mt-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold z-10 text-gray-700 dark:text-gray-100 leading-tight">FAQs</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Pertanyaan yang sering diajukan tentang Optimal Courses</p>
                </div>
                <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Apa itu Optimal Courses?</h3>
                        <p className="text-base text-gray-600 dark:text-gray-300">Optimal Courses adalah platform bimbingan belajar online yang menyediakan materi persiapan UKOM untuk mahasiswa kesehatan.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Bagaimana cara mendaftar di Optimal Courses?</h3>
                        <p className="text-base text-gray-600 dark:text-gray-300">Anda dapat mendaftar dengan mengunjungi halaman pendaftaran di situs kami dan mengisi formulir yang tersedia.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Apakah Optimal Courses menyediakan materi persiapan UKOM gratis?</h3>
                        <p className="text-base text-gray-600 dark:text-gray-300">Ya, Optimal Courses menyediakan materi persiapan UKOM gratis untuk mahasiswa kesehatan.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Bagaimana cara mengakses materi pembelajaran?</h3>
                        <p className="text-base text-gray-600 dark:text-gray-300">Setelah mendaftar, Anda dapat mengakses materi pembelajaran melalui dashboard akun Anda di situs kami.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Apakah ada dukungan atau bantuan jika saya mengalami kesulitan?</h3>
                        <p className="text-base text-gray-600 dark:text-gray-300">Ya, kami menyediakan dukungan pelanggan melalui email dan chat langsung untuk membantu Anda dengan pertanyaan atau masalah yang mungkin Anda hadapi.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Apakah ada jaminan lulus UKOM jika saya belajar di Optimal Courses?</h3>
                        <p className="text-base text-gray-600 dark:text-gray-300">Optimal Courses memberikan jaminan sampai lulus UKOM dengan mengikuti syarat dan ketentuan yang berlaku.</p>
                    </div>
                </div>

                <div className="text-center mt-12 px-12 py-8 bg-purple-800 rounded-lg max-lg:w-full w-1/2  mx-auto text-white">
                    <h3 className="text-2xl font-bold mb-6">Masih Punya pertanyaan terkait UKOM?</h3>
                    <a href="https://wa.link/gkfaqz" className="flex items-center w-fit mx-auto bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-transparent hover:text-white border-2 border-transparent hover:border-white transition-colors">
                        <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" />
                        Hubungi Kami
                    </a>
                </div>
            </div>
        </div>
    );
}