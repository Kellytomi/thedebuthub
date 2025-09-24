"use client";

import React, { useState, useEffect } from "react";
import { ArticleCard, Button, FlankDecoration, IntroTitle, ArticleCardSkeleton } from "../ui";
interface ProcessedArticle {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

const TopArticlesSection = () => {
  const [articles, setArticles] = useState<ProcessedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestArticles() {
      try {
        setError(null);
        const response = await fetch("/api/articles?limit=6&sort=latest", {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.articles) {
          setArticles(data.articles);
        } else {
          console.warn("API returned success=false or no articles:", data);
          setError("No articles available");
        }
      } catch (error) {
        console.error("Error fetching latest articles:", error);
        setError("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLatestArticles();
  }, []);


  return (
    <section className="relative overflow-hidden py-10 flex flex-col gap-10 w-full bg-[#040507]">
      <FlankDecoration />
      <div className="relative flex flex-col z-20 px-4">
        <h2
          className="mb-8 flex flex-col text-lg text-center"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
          }}
        >
          <span className="text-[#646464]">What&apos;s been going on?</span>
          <span className="text-white">Latest articles for you</span>
        </h2>
        {error && (
          <p className="text-red-400 text-sm mt-2 text-center">
            Could not fetch articles – showing fallback data.
          </p>
        )}

        {/* Articles Container */}
        <div className="w-full">
          {/* Desktop: Grid Layout */}
          <div className="grid grid-cols-[330px] sm:grid-cols-[370px] lg:grid-cols-[370px_370px] xl:grid-cols-[370px_370px_370px] gap-6 justify-center">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ArticleCardSkeleton key={`skeleton-${index}`} />
                ))
              : articles.length > 0
              ? articles.map((article, index) => (
                  <div
                    key={article.id}
                    className="w-full max-w-[370px]"
                  >
                    <ArticleCard
                      article={{
                        id: article.id,
                        slug: article.slug,
                        title: article.title,
                        author: article.author,
                        date: article.date,
                        image: article.image,
                      }}
                      index={index}
                    />
                  </div>
                ))
              : error
              ? (
                  <div className="col-span-full flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <p className="text-red-400 mb-2">{error}</p>
                      <p className="text-gray-400 text-sm">
                        Please check your CMS connection or try refreshing the page.
                      </p>
                    </div>
                  </div>
                )
              : (
                  <div className="col-span-full flex items-center justify-center min-h-[400px]">
                    <p className="text-white text-center">
                      No articles found. Please add some in the CMS.
                    </p>
                  </div>
                )}
          </div>
          
          {/* View All Button - positioned right after the grid */}
          {articles.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button href="/articles">View All</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopArticlesSection;