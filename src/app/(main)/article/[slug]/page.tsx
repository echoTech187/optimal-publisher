import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

import { getArticleBySlug } from '@/features/article/data';
import ArticleDetail from '@/components/article/ArticleDetail';
import ArticleDetailLoading from '@/components/article/ArticleDetailLoading';
import Article from '@/components/article'; // For the related articles section at the bottom

// Props for the page component
type Props = {
    params: { slug: string  };
};

// This function generates dynamic metadata for the page
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {slug} = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: 'Artikel Tidak Ditemukan',
        };
    }

    return {
        title: `${article.title} | Optimal Untuk Negeri`,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            images: [`${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.image}`],
        },
    };
}

// This helper component fetches the data
async function ArticleDetailFetcher({ slug }: { slug: string }) {
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound(); // Triggers the not-found.tsx page
    }

    return <ArticleDetail article={article as any} />;
}

// The main page component
export default async function DetailArticlePage({ params }: Props) {
    const { slug } = await params;
    return (
        <>
            <Suspense fallback={<ArticleDetailLoading />}>
                <ArticleDetailFetcher slug={slug} />
            </Suspense>
            
            {/* You can enhance this to show related articles instead of all articles */}
            <Article />
        </>
    );
}