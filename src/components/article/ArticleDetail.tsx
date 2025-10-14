
import Image from "next/image";

// Define the Article type to match the data it receives
interface Article {
  id: number;
  title: string;
  slug: string;
  author: string;
  publish_date: string;
  image_url: string;
  excerpt: string;
  description: string;
}

import { getImageUrl } from "@/lib/utils/image";

const ArticleDetail = ({ article }: { article: Article }) => {
    const imageUrl = getImageUrl(article.image_url);
    const displayDate = new Date(article.publish_date).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="bg-gray-50 dark:bg-gray-700 min-h-screen">
            <div className="max-w-[1300px] mx-auto px-4 py-[100px] rounded-lg mt-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{article.title}</h1>
                    <p className="text-lg text-gray-500 font-normal my-2">Oleh {article.author} | {displayDate}</p>
                </div>
                <div className="relative w-full h-96">
                    <Image
                        priority
                        src={imageUrl}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                    />
                </div>
                <div
                    className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-600 dark:text-gray-50 py-12"
                    dangerouslySetInnerHTML={{ __html: article.description }}
                />
            </div>
        </div>
    );
}

export default ArticleDetail;
