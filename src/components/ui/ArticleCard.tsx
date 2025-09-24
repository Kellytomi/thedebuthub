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
      <div className="group relative flex flex-col xl:flex-col w-full h-[360px] md:h-[418px] gap-2 cursor-pointer">
        <div className="relative w-full h-[350px] overflow-hidden rounded-xl border-[1px] border-white">
          <Image
            src={imageUrl}
            alt={article.title || "Article image"}
            width={370}
            height={350}
            priority={index < 3}
            loading={index < 3 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 330px, (max-width: 1200px) 370px, 370px"
            className="object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105"
            style={{
              aspectRatio: '370/350',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.currentTarget.src = "/images/david-image.png";
            }}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
        </div>
        <div className="text-white text-[20px] flex flex-col gap-1">
          <h3 className="truncate" title={article.title}>
            {article.title}
          </h3>
          <div className="text-sm text-[#CCCCCC] flex flex-row items-center xl:items-center xl:flex-row gap-2">
            <span className="truncate">{article.author}</span>
            <div className="w-1 h-1 bg-[#2C2C2C] rounded-full xl:block flex-shrink-0" />
            <span className="flex-shrink-0">{article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
