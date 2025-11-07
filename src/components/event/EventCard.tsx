'use client';

import { getImageUrl } from '@/lib/utils/image';
import { Icon } from '@iconify/react';
import React from 'react';
import Image from 'next/image';


export default function EventCard({ item, index }: { item: any, index: number }) {
    return (
        <div className={`carousel-slide rounded-xl ${index === 0 ? "sm:[&]:ml-4 " : ""}`} key={item.slug}>
                {/* Desktop Card */}
                <div className="max-md:hidden relative flex flex-col rounded-xl size-full justify-center border border-gray-200 cursor-pointer" onClick={() => window.open(`/events/${item.slug}`, "_parent")}>
                    <Image priority={true} src={getImageUrl(item.image)} alt={item.title} width={500} height={700} className="size-full object-cover rounded-xl" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" />
                    <div className="absolute bottom-0 left-0 right-0 w-full bg-fuchsia-800/50 text-white backdrop-blur-sm flex flex-col justify-between rounded-b-xl p-4 h-fit">
                        <span className="text-sm font-semibold line-clamp-1 overflow-hidden mb-2">{item.title}</span>
                        <div className="text-xs line-clamp-2 overflow-hidden" dangerouslySetInnerHTML={{ __html: item.description }} />
                        <button type="button" className="text-xs px-4 py-2 w-full bg-fuchsia-800 text-white font-bold rounded-full hover:bg-fuchsia-950 flex justify-between items-center mt-2">
                            <span>Daftar Sekarang</span>
                            <Icon icon="tabler:arrow-right" width="20" height="20" className="text-white" />
                        </button>
                    </div>
                </div>
                {/* Mobile Card */}
                <div className="md:hidden relative flex items-center rounded-xl h-36 bg-gray-100 dark:bg-gray-800 size-full justify-center border border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => window.open(`/events/${item.slug}`, "_parent")}>
                    <div className="w-1/3 h-full p-2">
                        <Image priority={true} src={getImageUrl(item.image)} alt={item.title} width={500} height={700} className="size-full object-cover rounded-lg" />
                    </div>
                    <div className="w-2/3 h-full flex flex-col justify-between rounded-r-lg p-2">
                        <span className="text-sm font-semibold line-clamp-2 overflow-hidden">{item.title}</span>
                        <div className="text-xs line-clamp-2 overflow-hidden" dangerouslySetInnerHTML={{ __html: item.description }} />
                        <button type="button" className="text-[10px] px-3 py-1.5 w-full bg-fuchsia-800 text-white font-bold rounded-full hover:bg-fuchsia-950 flex justify-between items-center mt-1">
                            <span>Daftar Sekarang</span>
                            <Icon icon="tabler:arrow-right" width="16" height="16" className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
    );
}
