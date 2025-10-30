// Import components from the correct top-level 'components' directory
import dynamic from 'next/dynamic';
import Book from "@/components/book";
import Services from "@/components/services";
import Hero from "@/components/hero";

// Import loading skeletons
import ArticleListLoading from '@/components/article/ArticleListLoading';
import NewsEventsLoading from '@/components/event/NewsEventsLoading';
import TestimoniLoading from '@/components/testimoni/TestimoniLoading';
import FaqsLoading from '@/components/faqs/FaqsLoading';

// Lazy load components that are below the fold
const NewsEvents = dynamic(() => import("@/components/event"), { loading: () => <NewsEventsLoading /> });
const Contact = dynamic(() => import("@/components/contact"));
const Testimoni = dynamic(() => import("@/components/testimoni"), { loading: () => <TestimoniLoading /> });
const Article = dynamic(() => import("@/components/article"), { loading: () => <ArticleListLoading /> });
const Faqs = dynamic(() => import("@/components/faqs"), { loading: () => <FaqsLoading /> });

// Import the server-side authentication utility
import { getSession } from "@/features/auth/session";

// The Home page is now an async Server Component
export default async function Home() {

  // Check authentication status on the server
  const session = await getSession();

  // Determine the correct URLs based on authentication status
  const isbnUrl = session ? '/program' : '/signin?type=isbn';
  const issnUrl = '/book?feature=ISSN'; // Assuming same logic
  const hkiUrl = session ? '/program' : '/signin?type=hki';   // Assuming same logic

  return (
        <main className="h-full w-full dark:bg-gray-800">
          <Hero />
          {/* <Package /> */}
          <Book />
          {/* Pass the determined URLs as props to the Services component */}
          <Services 
            isbnUrl={isbnUrl} 
            issnUrl={issnUrl} 
            hkiUrl={hkiUrl} 
          />
          <NewsEvents  />
          <Contact />
          <Testimoni />
          <Article />
          <Faqs />
        </main>
  );
}