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
    <Link href={`/articles/${article.slug}`} passHref className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006DFF] focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-xl">
      <div className="group relative flex flex-col xl:flex-col w-full h-[360px] md:h-[418px] gap-3 cursor-pointer transition-transform duration-300 hover:-translate-y-2">
        <div className="relative w-full h-[350px] overflow-hidden rounded-xl border border-white/70 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-[#00ccff]/70 group-hover:shadow-[0_22px_70px_rgba(0,109,255,0.16)]">
          <Image
            src={imageUrl}
            alt={article.title || "Article image"}
            width={370}
            height={350}
            priority={index < 3}
            loading={index < 3 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 330px, (max-width: 1200px) 370px, 370px"
            className="object-cover w-full h-full rounded-md transition-transform duration-700 group-hover:scale-110"
            style={{
              aspectRatio: '370/350',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.currentTarget.src = "/images/david-image.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
          <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
              Read story
            </span>
          </div>
        </div>
        <div className="text-white text-[20px] flex flex-col gap-1 transition-colors duration-300 group-hover:text-[#EAF5FF]">
          <h3 className="truncate font-medium" title={article.title}>
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
