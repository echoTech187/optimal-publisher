
import Link from "next/link";
import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="max-md:text-lg text-3xl font-bold">Berita terbaru</h2>
        <Link href="/article" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 max-md:text-xs">
          Lihat semua &rarr;
        </Link>
      </div>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {articles.map((article) => (
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
