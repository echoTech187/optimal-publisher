"use client";
import Article from "@/app/components/article/page"
import Image from "next/image"
import { useEffect, useState } from "react"



export default async function DetailArticle() {
    // const slug  =  1;
    const [posts, setPosts] = useState([]);
    useEffect(() => {

        document.title = "Detail Article | Bookstore";
        async function getBook() {
            const posts = await fetch("http://127.0.0.1:8000/api/v1/article");
            const postsData = await posts.json();
            if (postsData.length > 0) {
                setPosts(postsData)
            } else {
                setPosts([])
            }
        }

    })

    if (!posts) {
        return (
            <div className="bg-gray-50 dark:bg-gray-700 min-h-screen">
                <div className="max-w-[1300px] mx-auto px-4 py-[100px]  rounded-lg mt-12">
                    <div className="mb-12">
                        <h1 className="text-5xl text-gray-700 dark:text-gray-100 leading-tight"> Article Not Found</h1>
                    </div>
                </div>
            </div>
        )
    }
    const { title, image, description, userPost, postDate } = posts[0];
    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-700 min-h-screen">
                <div className="max-w-[1300px] mx-auto px-4 py-[100px]  rounded-lg mt-12">
                    <div className="mb-12">
                        <h1 className="text-5xl text-gray-700 dark:text-gray-100 leading-tight"> {title}</h1>
                        <p className="text-lg text-gray-500 font-normal my-2">{userPost} | {postDate && new Date(postDate).toLocaleDateString('id', {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}</p>

                    </div>
                    <Image src={image} alt={title} width={0} height={0} className="size-full" />
                    <div className="text-center text-gray-600 mb-12 dark:text-gray-50 py-12 html_content" dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
            </div>
            <Article />
        </>
    );
}
