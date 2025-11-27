// src/components/dashboard/ArticleCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import { getImageUrl } from "@/lib/utils/image";

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <div key={article.slug} className={`lg:p-3 rounded-2xl w-full cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-2 hover:border-blue-500 bg-white/70 hover:shadow-xl`}>
            <div className="flex items-stretch justify-start content-stretch gap-4 h-full">
                <div className="relative w-2/6 md:w-2/6 lg:w-1/4 xl:w-3/12 shrink-0 mb-0 h-[80px] md:h-[100px] lg:h-[120px] xl:h-[100px] 2xl:h-[120px] rounded-md overflow-hidden">
                    <Image src={getImageUrl(article.image)} alt={article.title} width={6000} height={5000} className="h-full w-full rounded-md md:rounded-lg object-cover" />
                </div>
                <div className="w-4/6 md:w-4/6 lg:w-3/4 xl:w-9/12 flex flex-col items-start justify-start">
                    <h3 className="font-bold max-lg:text-sm text-xl text-gray-900 line-clamp-2"><a href={`/article/${article.slug}`}>{article.title}</a></h3>
                    <p className="max-lg:text-xs text-sm text-gray-500 mb-3">{new Date(article.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    {/* <div dangerouslySetInnerHTML={{ __html: article.description }} className="html-content text-xs md:text-sm text-gray-600 line-clamp-3  md:line-clamp-6 lg:line-clamp-3 xl:line-clamp-5 overflow-hidden" /> */}
                </div>
            </div>
        </div>
    )
}
