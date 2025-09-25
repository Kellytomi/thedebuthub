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
        
        if (data.success && data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setError("No articles available");
          setArticles([]); // Ensure articles is empty array
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError("Failed to load articles");
        setArticles([]); // Ensure articles is empty array
      } finally {
        setIsLoading(false);
      }
    }

    fetchLatestArticles();
  }, []);


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
              : (
                  <div className="col-span-full flex items-center justify-center min-h-[400px]">
                    <div className="text-center max-w-md mx-auto px-4">
                      <div className="mb-4">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      {error ? (
                        <>
                          <h3 className="text-white text-xl font-medium mb-2">Unable to Load Articles</h3>
                          <p className="text-gray-400 text-sm mb-4">
                            {error}. Please check your connection or try refreshing the page.
                          </p>
                          <button 
                            onClick={() => window.location.reload()} 
                            className="inline-flex items-center px-4 py-2 bg-[#006DFF] text-white text-sm font-medium rounded-lg hover:bg-[#0056cc] transition-colors duration-300"
                          >
                            Retry
                          </button>
                        </>
                      ) : (
                        <>
                          <h3 className="text-white text-xl font-medium mb-2">No Articles Available</h3>
                          <p className="text-gray-400 text-sm mb-4">
                            There are currently no articles to display. Check back soon for new content!
                          </p>
                        </>
                      )}
                    </div>
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