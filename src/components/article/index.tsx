"use client";

import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import { Article } from '@/types/article';
import ArticleListLoading from './ArticleListLoading';

export default function ArticleSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const getSkeletonCount = () => {
        if (typeof window === 'undefined') return 4; // Default for SSR
        if (window.innerWidth < 640) return 5; // sm
        if (window.innerWidth < 768) return 2; // md
        if (window.innerWidth < 1024) return 3; // lg
        return 4; // xl and up
    };
    const [skeletonCount, setSkeletonCount] = useState(4);
  useEffect(() => {
    setSkeletonCount(getSkeletonCount());

    // Fetch articles
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/articles`);
        const data = await response.json();
        setArticles(data.data); // Fetch all articles
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []); // Remove articles from dependency array

  if (loading) {
    return <ArticleListLoading />;
  }

  return <ArticleList articles={articles} />;
}