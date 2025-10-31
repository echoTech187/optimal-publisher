import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

const getArticleCount = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 5;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
};

const ArticleList = ({ articles }: { articles: Article[] }) => {
    const [articleCount, setArticleCount] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            setArticleCount(getArticleCount());
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const articlesToShow = articles.slice(0, articleCount);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">Berita terbaru</h2>
                <Link href="/article" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-semibold">
                    Lihat semua &rarr;
                </Link>
            </div>
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {articlesToShow.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No articles found.</p>
            )}
        </div>
    );
};

export default ArticleList;