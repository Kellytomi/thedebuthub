"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/config";

interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  image: any; // Can be a Sanity image object or a string URL
}

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({
  article,
  index = 0,
}: ArticleCardProps) {
  // The API might return a full string URL or a Sanity image object.
  // This logic handles both cases gracefully.
  const imageUrl =
    article.image && typeof article.image === "object" && article.image.asset
      ? urlFor(article.image).width(400).height(300).url()
      : article.image || "/images/david-image.png"; // Fallback to a placeholder

  return (
    <Link href={`/articles/${article.slug}`} passHref>
      <div className="group flex flex-col items-center justify-between text-white bg-[#0D0D0D] w-full h-[444px] rounded-lg p-4 transition-all duration-300 ease-in-out hover:bg-[#1a1a1a] hover:shadow-lg">
        <div className="relative w-full h-[250px] mb-4 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={article.title || "Article image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-[#006DFF]">
            {article.title}
          </h3>
          <p className="text-sm text-gray-400">By {article.author}</p>
          <p className="text-sm text-gray-400 mt-1">{article.date}</p>
        </div>
      </div>
    </Link>
  );
}
