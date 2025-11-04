
import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getArticles } from '@/features/article/data';
import ArticleBanner from '@/components/article/banner';
import ArticleList from '@/components/article/ArticleList';
import FullPageLoader from '@/components/ui/FullPageLoader';
import type { Article as ArticleType } from '@/types/article';

export const metadata: Metadata = {
  title: 'Artikel | Optimal Untuk Negeri',
  description: 'Baca artikel terbaru tentang kesehatan, keperawatan, teknologi, dan lainnya dari Optimal Untuk Negeri.',
};
// This component fetches the data and passes it to the presentation component.
async function ArticleListFetcher({ params }: { params: URLSearchParams }) {
    const articles = await getArticles(params);
    // Ensure the fetched data conforms to the app's Article type before passing down
    const typedArticles = articles as unknown as ArticleType[];
    return <ArticleList articles={typedArticles} />;
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
                <div className="container mx-auto px-4 rounded-lg pt-12">
                    <div className="flex items-center justify-center gap-4 inter flex-wrap">
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg active">Semua</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Homecare</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Karier</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Keperawatan</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Kesehatan</button>
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Teknologi</button>
                    </div>
                </div>

                <Suspense fallback={<FullPageLoader />}>
                    
                    <ArticleListFetcher params={params} />
                </Suspense>
            </div>
        </>
    );
}
