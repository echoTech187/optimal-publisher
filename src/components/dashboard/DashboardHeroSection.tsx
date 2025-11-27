// src/components/dashboard/DashboardHeroSection.tsx
"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function DashboardHeroSection() {
    return (
        <section className="bg-white/60 dark:bg-gray-800 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mx-auto">
                <div className={`bg-white max-md:p-4 md:p-6 xl:p-8 rounded-2xl border-3 border-amber-100 w-full relative `}>
                    <div className="flex items-center gap-4 ">
                        <div className={`p-4 rounded-xl bg-yellow-100`}>
                            <Icon icon="ion:book-outline" className={`size-8 md:size-10 lg:size-12 text-gray-800`} />
                        </div>
                        <div className="flex-1 ">
                            <h3 className="text-2xl max-lg:text-base lg:text-lg xl:text-base font-bold text-gray-800">Penerbitan ISBN</h3>
                            <p className="text-gray-600 text-sm max-lg:text-xs">Resmikan dan standarisasi karya tulis Anda dengan International Standard Book Number.</p>
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
                            <h3 className="text-2xl max-lg:text-base lg:text-lg xl:text-base font-bold text-gray-800">Proteksi HKI</h3>
                            <p className="text-sm max-lg:text-xs text-gray-600 ">Amankan properti intelektual Anda untuk melindungi inovasi dan kreativitas.</p>
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
