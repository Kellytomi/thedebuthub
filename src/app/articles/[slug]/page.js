"use client";

import { useState, useEffect, use } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Layout } from "@/components/layout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FlankDecoration,
  IntroTitle,
  Button,
  ArticleCard,
} from "@/components/ui";
import { motion } from "framer-motion";
import SanityContent from "@/components/features/articles/SanityContent";

export default function ArticlePage({ params }) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState(null);
  const [rawArticle, setRawArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Fallback for related articles if none from Sanity
  const fallbackRelatedArticle = {
    title:
      "All about her historic Song for becoming Youngest to Most Inspiring woman",
    author: "David Adeleke",
    date: "Dec 15, 2024",
    image: "/images/david-image.png",
    slug: "fallback-article",
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    }),
  };

  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`/api/articles/${resolvedParams.slug}`);
        const data = await response.json();

        if (data.success && data.article) {
          setArticle(data.article);
          setRelatedArticles(data.relatedArticles || []);

          // Also fetch raw article data for rich content
          const rawResponse = await fetch(
            `/api/articles/${resolvedParams.slug}?raw=true`
          );
          const rawData = await rawResponse.json();
          if (rawData.success && rawData.article) {
            setRawArticle(rawData.article);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (resolvedParams.slug) {
      fetchArticle();
    }
  }, [resolvedParams.slug]);

  const handleBackToArticles = () => {
    router.push("/articles");
  };

  if (isLoading) {
    return (
      <Layout>
        <article className="max-w-[1350px] mx-auto px-4 md:px-16 pt-20">
          {/* Header Section Skeleton */}
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 mb-6">
            {/* Title skeleton - matches h1 size and layout */}
            <div className="w-full max-w-3xl flex flex-col gap-4">
              <div className="h-8 bg-[#171717] rounded animate-pulse mb-2 w-full mx-auto"></div>
            </div>

            {/* Author and date skeleton */}
            <div className="flex items-center text-white/70 text-[14px]">
              <div className="h-4 bg-[#171717] rounded animate-pulse w-32"></div>
              <div className="w-1 h-1 bg-[#171717] rounded-full mx-3"></div>
              <div className="h-4 bg-[#171717] rounded animate-pulse w-24"></div>
            </div>
          </div>

          {/* Featured Image skeleton */}
          <div className="relative w-full rounded-[20px] overflow-hidden mb-8">
            <div className="w-full aspect-video bg-[#171717] rounded-[20px] animate-pulse"></div>
          </div>
        </article>

        {/* Article Content Section Skeleton */}
        <section className="bg-[#040507] py-10">
          <div className="max-w-[1350px] mx-auto px-4 md:px-16">
            <div className="max-w-4xl mx-auto">
              {/* Rich text content simulation */}
              <div className="space-y-6">
                {/* Paragraph blocks */}
                <div className="space-y-3">
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-full"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-11/12"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-10/12"></div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-full"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-5/6"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-9/12"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-full"></div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-4/5"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-11/12"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-3/4"></div>
                </div>

                {/* Simulate a heading */}
                <div className="mt-8 mb-4">
                  <div className="h-7 bg-[#171717] rounded animate-pulse w-1/3"></div>
                </div>

                {/* More paragraph blocks */}
                <div className="space-y-3">
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-full"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-10/12"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-9/12"></div>
                  <div className="h-5 bg-[#171717] rounded animate-pulse w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles Section Skeleton */}
        <section className="relative py-10 flex flex-col w-full bg-[#040507]">
          {/* Section title skeleton */}
          <div className="relative flex flex-col px-4 md:px-16 z-20">

            {/* Related articles grid skeleton */}
            <div className="w-full py-10">
              {/* Desktop grid layout */}
              <div className="hidden xl:grid md:grid-cols-[370px_370px_370px] md:gap-6 justify-center">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-full max-w-[370px] gap-4"
                  >
                    {/* Image skeleton */}
                    <div className="relative w-full h-[350px] overflow-hidden rounded-xl bg-[#171717] animate-pulse"></div>
                    {/* Text content */}
                    <div className="flex flex-col gap-3">
                      {/* Title skeleton - multi-line to match actual card */}
                      <div className="h-6 bg-[#171717] animate-pulse rounded w-full"></div>
                      <div className="h-6 bg-[#171717] animate-pulse rounded w-4/5"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile/Tablet layout */}
              <div className="xl:hidden w-full flex flex-col items-center gap-8">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-full max-w-[370px] gap-4"
                  >
                    {/* Image skeleton */}
                    <div className="relative w-full h-[230px] overflow-hidden rounded-xl bg-[#171717] animate-pulse"></div>
                    {/* Text content */}
                    <div className="flex flex-col gap-3">
                      {/* Title skeleton */}
                      <div className="h-6 bg-[#171717] animate-pulse rounded w-full"></div>
                      <div className="h-6 bg-[#171717] animate-pulse rounded w-4/5"></div>
                      {/* Author and date */}
                      <div className="flex flex-row items-center gap-2 mt-1">
                        <div className="h-4 bg-[#171717] animate-pulse rounded w-20"></div>
                        <div className="w-1 h-1 bg-[#171717] rounded-full"></div>
                        <div className="h-4 bg-[#171717] animate-pulse rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All button skeleton */}
          <div className="relative flex justify-center z-20 mt-4">
            <div className="w-32 h-12 bg-[#171717] rounded-lg animate-pulse"></div>
          </div>
        </section>
      </Layout>
    );
  }

  if (notFound || !article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center">
          <h1 className="text-white text-4xl font-bold mb-4">
            Article Not Found
          </h1>
          <p className="text-white/70 mb-8">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={handleBackToArticles}
            className="bg-[#006DFF] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0056cc] transition-colors duration-300"
          >
            Back to Articles
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-[1350px] mx-auto px-4 md:px-16 pt-20">
        <motion.header
          className="max-w-4xl mx-auto flex flex-col items-center gap-6 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
        >
          <motion.h1
            className="text-white font-bold text-center text-[32px] md:text-[48px] leading-tight tracking-[-1px]"
            variants={fadeUp}
          >
            {article.title}
          </motion.h1>

          <motion.div
            className="flex items-center text-white/70 text-[14px]"
            variants={fadeUp}
            custom={1}
          >
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
          </motion.div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          className="relative w-full rounded-[20px] overflow-hidden mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
        >
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={800}
            className="w-full h-auto rounded-[20px]"
            priority
          />
        </motion.div>
      </article>

      {/* Article Content Section */}
      <section className="bg-[#040507] py-10">
        <motion.div
          className="max-w-[1350px] mx-auto px-4 md:px-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerStagger}
        >
          {rawArticle && rawArticle.body ? (
            <motion.div variants={fadeUp}>
              <SanityContent content={rawArticle.body} />
            </motion.div>
          ) : article?.excerpt ? (
            <motion.div
              className="text-white text-center text-[16px] md:text-[18px] max-w-4xl mx-auto leading-relaxed"
              variants={fadeUp}
            >
              <p className="mb-6">{article.excerpt}</p>
              <div className="text-white/70 text-sm text-center">
                Full article content is loading or not available from CMS...
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="text-white text-center text-[16px] md:text-[18px] max-w-4xl mx-auto"
              variants={fadeUp}
            >
              <div className="animate-pulse">
                <div className="h-4 bg-[#171717] rounded mb-4 w-full"></div>
                <div className="h-4 bg-[#171717] rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-[#171717] rounded mb-4 w-5/6"></div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Related Articles */}
      <section className="relative py-10 flex flex-col w-full bg-[#040507]">
        <FlankDecoration />
        <div className="relative flex flex-col px-4 md:px-16 z-20">
          <IntroTitle
            line1="What’s been going on?"
            line2="Similar articles for you"
          />
          <motion.div
            className="w-full py-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerStagger}
          >
            {/* Mobile/Tablet */}
            <div className="xl:hidden w-full flex flex-col items-center gap-6">
              {(relatedArticles.length > 0
                ? relatedArticles
                : Array.from({ length: 3 }, (_, index) => ({
                    ...fallbackRelatedArticle,
                    id: index + 1,
                    slug: `related-article-${index + 1}`,
                  }))
              )
                .slice(0, 3)
                .map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id || index}
                    className="w-full max-w-[370px] block"
                    variants={fadeUp}
                    custom={index}
                  >
                    <ArticleCard article={relatedArticle} index={index} />
                  </motion.div>
                ))}
            </div>

            {/* Desktop */}
            <div className="hidden xl:grid md:grid-cols-[370px_370px_370px] md:gap-6 justify-center">
              {(relatedArticles.length > 0
                ? relatedArticles
                : Array.from({ length: 3 }, (_, index) => ({
                    ...fallbackRelatedArticle,
                    id: index + 1,
                    slug: `related-article-${index + 1}`,
                  }))
              )
                .slice(0, 3)
                .map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id || index}
                    className="w-full max-w-[370px] block"
                    variants={fadeUp}
                    custom={index}
                  >
                    <ArticleCard article={relatedArticle} index={index} />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative flex justify-center z-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
        >
          <Button href="/articles">View All</Button>
        </motion.div>
      </section>
    </Layout>
  );
}
