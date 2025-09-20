"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArticleCard } from "@/components/ui";
import { Layout } from "@/components";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Loading skeleton data
  const skeletonCount = 15;

  useEffect(() => {
    async function fetchArticles() {
      try {
        // Aggressive cache-busting with multiple parameters
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const response = await fetch(`/api/articles?_t=${timestamp}&_r=${randomId}&nocache=true`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        const data = await response.json();

        if (data.success && Array.isArray(data.articles)) {
          // Force all articles to use only david-image.png
          const validatedArticles = data.articles
            .filter(article => article && article.id && article.title) // Only valid articles
            .map(article => ({
              ...article,
              // Force use of david-image.png only, ignore any other image references
              image: '/images/david-image.png',
              // Ensure required fields exist
              title: article.title || 'Untitled Article',
              author: article.author || 'The Debut Hub',
              date: article.date || 'Unknown Date',
              slug: article.slug || `article-${article.id}`
            }));
          
          console.log(`✅ Loaded ${validatedArticles.length} validated articles with forced image paths`);
          setArticles(validatedArticles);
        } else {
          console.error('API returned unsuccessful response:', data);
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <Layout>
      {/* Header Section */}
      <div className="text-center py-5 flex flex-col items-center gap-5 px-4">
        <h1 className="text-white font-bold text-[32px] sm:text-[48px] md:text-[64px] tracking-[-2px]">
          Articles from recent times
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-2xl">
          Explore trending articles about artists you love
        </p>

        {/* Search Bar */}
        <div className="max-w-md w-full mx-auto mb-10 md:mb-24">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="text"
              placeholder="Search for an artiste"
              className="w-full sm:flex-1 px-6 py-4 bg-[#252525]/30 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button className="bg-[#006DFF] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0056cc] transition-colors duration-300">
              Search
            </button>
          </div>
        </div>
      </div>

      <section
        ref={ref}
        className="relative overflow-hidden mx-auto w-full bg-[#040507] py-10 md:py-20"
      >
        <div className="relative z-10">
          {/* Articles Grid */}
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            {isLoading ? (
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: skeletonCount }, (_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-[#171717] animate-pulse rounded-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
            ) : (
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {articles.map((article, index) => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    index={index} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
