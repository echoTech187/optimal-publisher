
import Image from 'next/image';
import Link from 'next/link';

// Define the Article type based on our data fetching logic
interface Article {
  id: number;
  title: string;
  slug: string;
  author: string;
  publish_date: string;
  image_url: string;
  excerpt: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
  // Construct the full image URL from the environment variable
  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.image_url}`;

  // Format date for display if needed
  const displayDate = new Date(article.publish_date).toLocaleDateString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <Link href={`/article/${article.slug}`} className="bg-white shadow-xs hover:shadow-2xl rounded-lg hover:cursor-pointer block">
      <div className="p-4 flex flex-col gap-4">
        <div className="w-full h-48 relative">
            <Image 
                priority
                src={imageUrl} 
                alt={article.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{article.title}</h3>
          <span className="flex items-center text-sm text-gray-500 mt-1">
            <small>Oleh {article.author}</small> . <small>{displayDate}</small>
          </span>
        </div>
        <p className="text-xs font-normal text-gray-500 line-clamp-3">{article.excerpt}</p>
      </div>
    </Link>
  );
}

export default ArticleCard;
