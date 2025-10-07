// Import components from the correct top-level 'components' directory
import Article from "@/components/article";
import Book from "@/components/book";
import Contact from "@/components/contact";
import NewsEvents from "@/components/event";
import Faqs from "@/components/faqs";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Testimoni from  "@/components/testimoni";
import WebLayout from "./layout/web";

// Import the server-side authentication utility
import { getSession } from "@/lib/auth/session";

// The Home page is now an async Server Component
export default async function Home() {

  // Check authentication status on the server
  const session = await getSession();

  // Determine the correct URLs based on authentication status
  const isbnUrl = session ? '/program' : '/auth/signin?type=isbn';
  const issnUrl = session ? '/program' : '/auth/signin?type=issn'; // Assuming same logic
  const hkiUrl = session ? '/program' : '/auth/signin?type=hki';   // Assuming same logic

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
          <NewsEvents />
          <Contact />
          <Testimoni />
          <Article />
          <Faqs />
        </main>
  );
}