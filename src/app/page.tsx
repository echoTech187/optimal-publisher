// Import components from the correct top-level 'components' directory
import Article from "@/components/article/page";
import Book from "@/components/book/page";
import Contact from "@/components/contact/page";
import NewsEvents from "@/components/event/page";
import Faqs from "@/components/faqs/page";
import Hero from "@/components/hero/page";
import Services from "@/components/services/page";
import Testimoni from "@/components/testimoni/page";
import WebLayout from "./layout/web";

// Import the server-side authentication utility
import { isAuthenticated } from "@/lib/auth/session";

// The Home page is now an async Server Component
export default async function Home() {

  // Check authentication status on the server
  const authenticated = await isAuthenticated();

  // Determine the correct URLs based on authentication status
  const isbnUrl = authenticated ? '/program' : '/auth/signin?type=isbn';
  const issnUrl = authenticated ? '/program' : '/auth/signin?type=issn'; // Assuming same logic
  const hkiUrl = authenticated ? '/program' : '/auth/signin?type=hki';   // Assuming same logic

  return (
      <WebLayout>
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
      </WebLayout>
  );
}