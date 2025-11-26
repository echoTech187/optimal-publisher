"use client";

import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import { Article } from '@/types/article';
import ArticleListLoading from './ArticleListLoading';

export default function ArticleSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

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

  return <ArticleList articles={articles} showAll={false} />;
}