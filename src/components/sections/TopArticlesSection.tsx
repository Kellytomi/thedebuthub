"use client";

import React, { useState, useEffect } from "react";
import { ArticleCard, Button, FlankDecoration, IntroTitle, ArticleCardSkeleton } from "../ui";
import { motion, type Variants } from "framer-motion";
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

  // ✅ Container animation (staggered children)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  // ✅ Each card animation
  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

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
          <span className="text-[#646464]">What's been going on?</span>
          <span className="text-white">Latest articles for you</span>
        </h2>
        {error && (
          <p className="text-red-400 text-sm mt-2 text-center">
            Could not fetch articles – showing fallback data.
          </p>
        )}

        {/* Articles Container */}
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Desktop: Grid Layout */}
          <div className="grid grid-cols-[330px] sm:grid-cols-[370px] lg:grid-cols-[370px_370px] xl:grid-cols-[370px_370px_370px] grid-rows-[444px_444px] gap-6 justify-center">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ArticleCardSkeleton key={`skeleton-${index}`} />
                ))
              : articles.length > 0
              ? articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    className="w-full max-w-[370px]"
                    variants={cardVariants}
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
                  </motion.div>
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
        </motion.div>
      </div>


      <div className="relative flex justify-center z-20">
        <Button href="/articles">View All</Button>
      </div>
    </section>
  );
};

export default TopArticlesSection;