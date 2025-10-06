
import Article from "./components/article/page";
import Book from "./components/book/page";
import Contact from "./components/contact/page";
import NewsEvents from "./components/event/page";
import Faqs from "./components/faqs/page";
import Hero from "./components/hero/page";
import Package from "./components/package/page";
import Services from "./components/services/page";
import Testimoni from "./components/testimoni/page";
export default function Home() {
  return (
    <>
      <main className="h-full w-full dark:bg-gray-800">
        <Hero />
        {/* <Package /> */}
        <Book />
        <Services />
        <NewsEvents />
        <Contact />
        <Testimoni />
        <Article />
        <Faqs />
      </main>

    </>
  );
}