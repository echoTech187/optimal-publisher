import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <>
            <section className="relative w-full h-[800px] flex items-center justify-center" id="hero">
                <div className="absolute top-0 left-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-[100%] w-full -z-0"></div>
                <div className="flex gap-4 max-w-[1300px] mx-auto px-4 2xl:px-0 w-full z-10">
                    <div className="w-1/2 max-lg:w-full flex flex-col gap-4">
                        <h1 className=" text-[2rem] md:text-[2.5rem] lg:text-[3.8rem] xl:text-[4.5rem] 2xl:text-[5rem] font-bold leading-tight flex flex-col"><p>Solusi Digital</p> <p>Belajar Test CPNS</p></h1>
                        <p className=" md:text-lg">Hai! Apakah kamu sedang mempersiapkan diri untuk tes CPNS?
                            <br />Mau belajar, tapi bingung mau mulai darimana?
                            <br />Mau tahu tips dan trik jawab soal dengan cepat?
                            <br /><b>Optimal Solusinya!</b> Sebuah platform belajar tes CPNS kapan saja dan dimana aja!</p>
                        <div className="flex max-md:flex-col flex-wrap max-md:gap-0 gap-4">
                            <span className="inline-block  py-1 text-sm rounded-full before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-orange-300 before:font-fontawesome before:mr-2 before:text-xs">Mulai Gratis</span>
                            <span className="inline-block  py-1 text-sm rounded-full before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-orange-300 before:font-fontawesome before:mr-2 before:text-xs">Banyak Pilihan Paket</span>
                            <span className="inline-block  py-1 text-sm rounded-full before:content-['✓'] before:p-1 before:w-5 before:h-5 before:rounded-full before:text-center before:inline-block before:bg-orange-300 before:font-fontawesome before:mr-2 before:text-xs">Langsung Lihat Skor</span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <button className="py-3 px-6 rounded-md transition-colors bg-yellow-400 text-black font-semibold hover:bg-yellow-700 hover:text-white">
                                Coba Sekarang
                            </button>
                        </div>
                        <p className="mt-2">Sudah Punya Akun?  <Link href="/" className='text-amber-600'>Silahkan Masuk</Link></p>
                    </div>
                    <div className="w-1/2 max-lg:hidden">
                        <Image src="/images/banner.svg" alt="Hero Image" width={500} height={300} className="mx-auto" />
                    </div>
                </div>
            </section>
        </>
    );
}