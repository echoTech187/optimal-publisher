
import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getArticles } from '@/features/article/data';
import ArticleBanner from '@/components/article/banner';
import ArticleList from '@/components/article/ArticleList';
import ArticleListLoading from '@/components/article/ArticleListLoading';

export const metadata: Metadata = {
  title: 'Artikel | Optimal Untuk Negeri',
  description: 'Baca artikel terbaru tentang kesehatan, keperawatan, teknologi, dan lainnya dari Optimal Untuk Negeri.',
};

// This component fetches the data and passes it to the presentation component.
async function ArticleListFetcher({ params }: { params: URLSearchParams }) {
    const articles = await getArticles(params);
    return <ArticleList articles={articles} />;
}

export default function ArticlePage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    // Convert searchParams to URLSearchParams for our data fetching function
    const params = new URLSearchParams();
    if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
            if (typeof value === 'string') {
                params.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach(v => params.append(key, v));
            }
        });
    }

    return (
        <>
            <ArticleBanner />
            <div className="bg-gray-50 dark:bg-gray-700 min-h-screen">
                {/* TODO: Implement filter functionality */}
                <div className="max-w-[1300px] mx-auto px-4 rounded-lg pt-12">
                    <div className="flex items-center justify-center gap-4 inter flex-wrap">
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg active">Semua</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Homecare</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Karier</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Keperawatan</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Kesehatan</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Teknologi</button>
                    </div>
                </div>

                <Suspense fallback={<ArticleListLoading />}>
                    
                    <ArticleListFetcher params={params} />
                </Suspense>
            </div>
        </>
    );
}
