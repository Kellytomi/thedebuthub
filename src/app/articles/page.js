"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArticleCard } from "@/components/ui";
import { Layout } from "@/components";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]); // Store all articles for searching
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Loading skeleton data
  const skeletonCount = 15;

  const fetchArticles = useCallback(async () => {
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
        // Use actual article images from Sanity
        const validatedArticles = data.articles
          .filter(article => article && article.id && article.title) // Only valid articles
          .map(article => ({
            ...article,
            // Keep the original image from Sanity, with fallback
            image: article.image || '/images/david-image.png',
            // Ensure required fields exist
            title: article.title || 'Untitled Article',
            author: article.author || 'The Debut Hub',
            date: article.date || 'Unknown Date',
            slug: article.slug || `article-${article.id}`
          }));
        
        setAllArticles(validatedArticles); // Store all articles
        setArticles(validatedArticles); // Display all articles initially
      } else {
        setAllArticles([]);
        setArticles([]);
      }
    } catch (error) {
      setAllArticles([]);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchTerm.trim() === "") {
      // If search is empty, show all articles
      setArticles(allArticles);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(7);
      const response = await fetch(`/api/articles?search=${encodeURIComponent(searchTerm)}&_t=${timestamp}&_r=${randomId}&nocache=true`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.articles)) {
        const validatedArticles = data.articles
          .filter(article => article && article.id && article.title)
          .map(article => ({
            ...article,
            image: article.image || '/images/david-image.png',
            title: article.title || 'Untitled Article',
            author: article.author || 'The Debut Hub',
            date: article.date || 'Unknown Date',
            slug: article.slug || `article-${article.id}`
          }));
        
        setArticles(validatedArticles);
      } else {
        setArticles([]);
      }
    } catch (error) {
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="text"
              placeholder="Search for an artiste"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full sm:flex-1 px-6 py-4 bg-[#252525]/30 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button 
              type="submit"
              className="bg-[#006DFF] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0056cc] transition-colors duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <section
        ref={ref}
        className="relative overflow-hidden mx-auto w-full bg-[#040507] py-10 md:py-20"
      >
        <div className="relative z-10">
          {/* Articles Grid */}
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            {isLoading ? (
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
              <div className="grid grid-cols-[350px] lg:grid-cols-[370px_370px] xl:grid-cols-3 gap-[33px] justify-center">
                {Array.from({ length: skeletonCount }, (_, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-full h-auto gap-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Image skeleton with border */}
                    <div className="relative w-full h-[350px] overflow-hidden rounded-xl bg-[#171717] animate-pulse"></div>
                    {/* Text content skeleton */}
                    <div className="flex flex-col gap-1">
                      {/* Title skeleton */}
                      <div className="h-6 bg-[#171717] animate-pulse rounded w-4/5"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
              <div
                className="grid grid-cols-[350px] md:grid-cols-[370px] lg:grid-cols-[370px_370px] xl:grid-cols-[370px_370px_370px] gap-7 xl:gap-[33px] justify-center"
              >
                {articles.map((article, index) => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              <div className="col-span-full flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md mx-auto px-4">
                  <div className="mb-4">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  {searchTerm.trim() !== "" ? (
                    <>
                      <h3 className="text-white text-xl font-medium mb-2">No articles found</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        We couldn't find any articles matching "<span className="text-white">{searchTerm}</span>". Try adjusting your search terms.
                      </p>
                      <button 
                        onClick={() => {
                          setSearchTerm("");
                          setArticles(allArticles);
                        }}
                        className="inline-flex items-center px-4 py-2 bg-[#006DFF] text-white text-sm font-medium rounded-lg hover:bg-[#0056cc] transition-colors duration-300"
                      >
                        Clear Search
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-white text-xl font-medium mb-2">No Articles Available</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        There are currently no articles to display. Check back soon for new content!
                      </p>
                      <button 
                        onClick={() => fetchArticles()}
                        className="inline-flex items-center px-4 py-2 bg-[#006DFF] text-white text-sm font-medium rounded-lg hover:bg-[#0056cc] transition-colors duration-300"
                      >
                        Refresh
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}