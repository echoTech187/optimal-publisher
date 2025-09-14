
import Article from "./components/article/page";
import Faqs from "./components/faqs/page";
import Hero from "./components/hero/page";
import Package from "./components/package/page";
import Testimoni from "./components/testimoni/page";
export default function Home() {

  return (
    <main className="h-full w-full dark:bg-gray-800">
      <Hero />
      <Package />
      <Testimoni />
      <Article />
      <Faqs />
    </main>
  );
}