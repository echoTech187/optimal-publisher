"use client";

import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import { Article } from '@/types/article';
import ArticleListLoading from './ArticleListLoading';
import { getArticles } from '@/features/article/data';

export default function ArticleSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Add error state

  useEffect(() => {

    // Fetch articles
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data); // Fetch all articles
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setError(true); // Set error state to true
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <ArticleListLoading />;
  }

  if (error) { // Display error message if fetch failed
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-500">Failed to load articles. Please try again later.</p>
      </div>
    );
  }

  return <ArticleList articles={articles} showAll={false} />;
}