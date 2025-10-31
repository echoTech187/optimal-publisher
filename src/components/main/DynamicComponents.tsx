'use client';

import dynamic from 'next/dynamic';

// Import loading skeletons
import ArticleListLoading from '@/components/article/ArticleListLoading';
import NewsEventsLoading from '@/components/event/NewsEventsLoading';
import TestimoniLoading from '@/components/testimoni/TestimoniLoading';
import FaqsLoading from '@/components/faqs/FaqsLoading';
import ContactSkeleton from '@/components/contact/ContactSkeleton';

// Lazy load components that are below the fold
const NewsEvents = dynamic(() => import("@/components/event"), { loading: () => <NewsEventsLoading />, ssr: false });
const Contact = dynamic(() => import("@/components/contact"), { loading: () => <ContactSkeleton />, ssr: false });
const Testimoni = dynamic(() => import("@/components/testimoni"), { loading: () => <TestimoniLoading />, ssr: false });
const Article = dynamic(() => import("@/components/article"), { loading: () => <ArticleListLoading />, ssr: false });
const Faqs = dynamic(() => import("@/components/faqs"), { loading: () => <FaqsLoading />, ssr: false });

export default function DynamicComponents() {
  return (
    <>
      <NewsEvents />
      <Contact />
      <Testimoni />
      <Article />
      <Faqs />
    </>
  );
}
