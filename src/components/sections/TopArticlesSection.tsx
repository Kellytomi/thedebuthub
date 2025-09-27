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
  const [hasNetworkError, setHasNetworkError] = useState(false);

  useEffect(() => {
    async function fetchLatestArticles() {
      try {
        setError(null);
        setHasNetworkError(false);
        const response = await fetch("/api/articles?limit=6&sort=latest", {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        if (!response.ok) {
          // This is likely a server/network error, not "no articles"
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          // No articles published - this is normal, not an error
          setArticles([]);
        }
      } catch (error) {
        console.error('Network error fetching articles:', error);
        setError("Unable to load articles due to network issues");
        setHasNetworkError(true);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLatestArticles();
  }, []);


  // Don't render the section at all if loading or no articles (unless there's a network error)
  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-10 flex flex-col gap-10 w-full bg-[#040507]">
        <FlankDecoration />
        <div className="relative flex flex-col z-20">
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
          <div className="w-full">
            <div className="grid grid-cols-[330px] sm:grid-cols-[370px] lg:grid-cols-[370px_370px] xl:grid-cols-[370px_370px_370px] gap-[33px] justify-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <ArticleCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If there are no articles and no network error, don't show the section at all
  if (articles.length === 0 && !hasNetworkError) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-10 flex flex-col gap-10 w-full bg-[#040507]">
      <FlankDecoration />
      <div className="relative flex flex-col z-20">
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

        {/* Articles Container */}
        <div className="w-full">
          {/* Desktop: Grid Layout */}
          <div className="grid grid-cols-[330px] sm:grid-cols-[370px] lg:grid-cols-[370px_370px] xl:grid-cols-[370px_370px_370px] gap-[33px] justify-center">
            {articles.length > 0 ? (
              articles.map((article, index) => (
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
            ) : hasNetworkError ? (
              <div className="col-span-full flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md mx-auto px-4">
                  <div className="mb-4">
                    <svg className="mx-auto h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-medium mb-2">Network Error</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {error}. Please try refreshing the page.
                  </p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="inline-flex items-center px-4 py-2 bg-[#006DFF] text-white text-sm font-medium rounded-lg hover:bg-[#0056cc] transition-colors duration-300"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : null}
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