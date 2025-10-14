
import ArticleCard from "./ArticleCard";

// Define the Article type
interface Article {
  id: number;
  title: string;
  slug: string;
  author: string;
  publish_date: string;
  image_url: string;
  excerpt: string;
}

const ArticleList = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="max-w-[1300px] mx-auto px-4 py-[40px] rounded-lg mt-6 inter flex flex-col items-center gap-12">
        {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500">Tidak ada artikel yang ditemukan.</p>
        )}

        {/* Pagination can be implemented here later */}
        {articles.length > 0 && (
             <nav className="flex items-center gap-x-1 mt-12">
                <button type="button" className="btn btn-soft" disabled>Previous</button>
                <div className="flex items-center gap-x-1">
                    <button type="button" className="btn btn-soft btn-square" aria-current="page">1</button>
                    {/* Add more page numbers dynamically based on API response */}
                </div>
                <button type="button" className="btn btn-soft">Next</button>
            </nav>
        )}
    </div>
  );
}

export default ArticleList;
