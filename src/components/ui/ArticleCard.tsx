"use client";

import { ArrowCircleRight, ArrowRight, ArrowRight2, Play } from "iconsax-react";
import Link from "next/link";

// Define the article data structure
interface Article {
  id: number | string;
  title: string;
  author: string;
  date: string;
  slug: string;
  image: string;
}

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  console.log("ArticleCard received article:", article);

  return (
    <div className="group cursor-pointer visible opacity-100">
      <a href={`/articles/${article.slug}`} className="block h-full">
        <div className="relative flex flex-col h-full">
          <div
            className="relative rounded-[20px] border-[1px] border-[#FFDDB2] bg-[#171717] overflow-hidden"
            style={{ aspectRatio: "370/350" }}
          >
            <img
              src={article.image || "/images/david-image.png"}
              alt={article.title}
              className="object-cover rounded-[20px] transition-transform duration-300 group-hover:scale-105 w-full h-full"
              onError={(e) => {
                // Silent fallback to prevent console errors
                try {
                  const currentSrc = e.currentTarget.src;
                  // Only set fallback if not already using david-image.png
                  if (!currentSrc.includes("david-image.png")) {
                    e.currentTarget.src = "/images/david-image.png";
                  }
                } catch (err) {
                  // Silently handle any errors without logging
                }
              }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                <ArrowRight2 size="42" color="black" variant="TwoTone" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-normal text-[18px] leading-[24px] my-3 group-hover:text-[#FFDDB2] transition-colors duration-300">
              {article.title}
            </h3>
            <div className="flex items-center text-white/70 text-[14px]">
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
