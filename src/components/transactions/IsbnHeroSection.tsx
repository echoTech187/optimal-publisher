// src/components/transactions/IsbnHeroSection.tsx
"use client";

import { Icon } from '@iconify/react';

function openWhatsappChat() {
    // It's better to use window.open to avoid replacing the current page context
    window.open("https://wa.link/gkfaqz", '_blank', 'noopener,noreferrer');
}

export default function IsbnHeroSection() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 text-center 2xl:flex 2xl:items-center 2xl:justify-start 2xl:gap-8 2xl:flex-row-reverse">
            <div className="flex justify-center mb-6 md:mb-8">
                <img src="/images/ISBN.png" alt="Lindungi Karya Anda" className="w-40 sm:w-56 md:w-64 lg:w-72 2xl:w-99 h-auto mx-auto" />
            </div>
            <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 uppercase">
                    Wujudkan Impian Menerbitkan Buku
                </h2>
                <p className="text-gray-600 mx-auto mt-3 mb-8 md:mb-8 text-sm sm:text-base leading-relaxed max-w-2xl px-2">
                    Menerbitkan buku tidak harus rumit. Kami sederhanakan setiap langkah dan mendampingi Anda di setiap prosesnya. Dari konsultasi awal hingga penerbitan resmi, tim expert kami siap membantu. Fokus pada karya Anda, percayakan sisanya kepada kami.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 md:mb-8 w-full max-w-xl mx-auto">
                    <a href="/program" className="w-full sm:w-auto bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                        Mulai Pendaftaran Sekarang
                        <Icon icon="ion:arrow-forward-outline" className="ml-2" />
                    </a>
                    <button onClick={openWhatsappChat} className="w-full sm:w-auto bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                        <Icon icon="ion:chatbubbles-outline" className="mr-2" />
                        Jadwalkan Konsultasi
                    </button>
                </div>
            </div>
        </div>
    );
}
