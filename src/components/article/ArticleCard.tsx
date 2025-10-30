
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';
import { getImageUrl } from '@/lib/utils/image';

const ArticleCard = ({ article }: { article: Article }) => {
  const imageUrl = getImageUrl(article.image);

  const displayDate = new Date(article.created_at).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Link href={`/article/${article.slug}`} className=" group flex max-md:flex-row flex-col max-md:gap-4">
      <div className="relative max-md:w-[100px] w-full max-md:h-20 h-60 mb-4 max-md:flex-1">
        <Image
          priority
          src={imageUrl}
          alt={article.title}
          width={0}
          height={0}
          style={{ objectFit: 'cover' }}
          className="rounded-lg h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="max-md:w-2/3 w-full ">
        <div className="flex items-center max-md:text-xs text-sm text-gray-500 mb-2">
          <span>• {article.article_category.category}</span>
          <span className="mx-2">•</span>
          <span>{displayDate}</span>
        </div>
        <h3 title={article.title} className="max-md:text-sm text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 mb-2 flex-1">
          {article.title}
        </h3>
        <div dangerouslySetInnerHTML={{ __html: article.description }} className="max-md:text-xs text-sm text-gray-600 max-md:line-clamp-2 line-clamp-3"></div>

      </div>
    </Link>
  );
};

export default ArticleCard;
