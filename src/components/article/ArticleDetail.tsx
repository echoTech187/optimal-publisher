
import Image from "next/image";

// Define the Article type to match the data it receives


import { getImageUrl } from "@/lib/utils/image";
import { Article } from "@/types/article";

const ArticleDetail = ({ article }: { article: Article }) => {
    const imageUrl = getImageUrl(article.image);
    const displayDate = new Date(article.created_at).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="bg-gray-50 dark:bg-gray-700 min-h-screen">
            <div className="container mx-auto px-4 py-[100px] rounded-lg">

                <article className="w-full">
                    <div className="mb-4 md:mb-0 w-full mx-auto relative">
                        <div className="relative w-full h-[200px] md:h-[600px]">
                            <Image
                                priority
                                src={imageUrl}
                                alt={article.title}
                                fill
                                style={{ objectFit: 'contain' }}
                                className="rounded-lg size-full"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-3/4 mx-auto mt-12">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 leading-tight text-center">{article.title}</h1>
                        <p className="text-sm md:text-lg text-gray-500 font-normal my-4 text-center">Oleh {article?.create_by_user?.full_name} | {displayDate}</p>
                        <div
                            className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-600 dark:text-gray-50 html_content max-md:text-xs"
                            dangerouslySetInnerHTML={{ __html: article.description }}
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}

export default ArticleDetail;
