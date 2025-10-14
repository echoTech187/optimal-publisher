import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

import { getArticleBySlug } from '@/features/article/data';
import ArticleDetail from '@/components/article/ArticleDetail';
import ArticleDetailLoading from '@/components/article/ArticleDetailLoading';
import Article from '@/components/article'; // For the related articles section at the bottom

// Props for the page component
type Props = {
    params: { slug: string };
};

// This function generates dynamic metadata for the page
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: 'Artikel Tidak Ditemukan',
        };
    }

    return {
        title: `${article.title} | Optimal Untuk Negeri`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [`${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.image_url}`],
        },
    };
}

// This helper component fetches the data
async function ArticleDetailFetcher({ slug }: { slug: string }) {
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound(); // Triggers the not-found.tsx page
    }

    return <ArticleDetail article={article} />;
}

// The main page component
export default function DetailArticlePage({ params }: Props) {
    return (
        <>
            <Suspense fallback={<ArticleDetailLoading />}>
                {/* @ts-expect-error Server Component */}
                <ArticleDetailFetcher slug={params.slug} />
            </Suspense>
            
            {/* You can enhance this to show related articles instead of all articles */}
            <Article />
        </>
    );
}