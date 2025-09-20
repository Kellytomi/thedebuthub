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

export default function ArticlePage({ params }) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const relatedArticleBase = {
    title:
      "All about her historic Song for becoming Youngest to Most Inspiring woman",
    author: "David Adeleke",
    date: "Dec 15, 2024",
    image: "/images/david-image.png",
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
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
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
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-[#171717] rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-[#171717] rounded mb-8 w-1/2"></div>
            <div className="aspect-video bg-[#171717] rounded-[20px] mb-8"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-[#171717] rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
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
      <article className="max-w-[1350px] mx-auto px-4 md:px-8 pt-20">
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
          className="relative h-[300px] sm:h-[400px] md:h-[536px] rounded-[20px] overflow-hidden mb-8 border border-[#FFDDB2]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </article>

      {/* Content Section */}
      <section className="bg-[#040507] py-10">
        <motion.div
          className="max-w-[1350px] mx-auto flex flex-col gap-6 px-4 md:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerStagger}
        >
          <motion.div
            className="relative h-[300px] sm:h-[400px] md:h-[536px] w-full max-w-4xl rounded-[20px] overflow-hidden border border-[#FFDDB2] mx-auto"
            variants={fadeUp}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            className="text-white text-center text-[14px] max-w-4xl mx-auto"
            variants={fadeUp}
          >
            This is the caption for this image.
          </motion.div>
        </motion.div>
      </section>

      {/* Paragraph + Image Section */}
      <section className="bg-[#040507] py-10">
        <motion.div
          className="max-w-[1350px] mx-auto flex flex-col gap-6 px-4 md:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerStagger}
        >
          <motion.p
            className="text-white text-center text-[16px] md:text-[18px] max-w-4xl mx-auto"
            variants={fadeUp}
          >
            LLorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident sunt in
            culpa qui officia deserunt mollit anim id est laborum. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium totam rem aperiam eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            aut odit aut fugit sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Neque porro quisquam est qui
            dolorem ipsum quia dolor sit amet consectetur adipiscing elit.
          </motion.p>
          <motion.div variants={fadeUp}>
            <div className="relative h-[300px] sm:h-[400px] md:h-[536px] w-full max-w-4xl rounded-[20px] overflow-hidden border border-[#FFDDB2] mx-auto">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-white text-center text-[14px] max-w-4xl mx-auto mt-4">
              This is the caption for this image.
            </div>
          </motion.div>
          <motion.p
            className="text-white text-center text-[16px] md:text-[18px] max-w-4xl mx-auto"
            variants={fadeUp}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </motion.p>
        </motion.div>
      </section>

      {/* Related Articles */}
      <section className="relative py-10 flex flex-col w-full bg-[#040507]">
        <FlankDecoration />
        <div className="relative flex flex-col px-4 z-20">
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
              {Array.from({ length: 3 }, (_, index) => {
                const article = {
                  ...relatedArticleBase,
                  id: index + 1,
                  slug: `related-article-${index + 1}`,
                };
                return (
                  <motion.div
                    key={index}
                    className="w-full max-w-[370px] block"
                    variants={fadeUp}
                    custom={index}
                  >
                    <ArticleCard article={article} index={index} />
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop */}
            <div className="hidden xl:grid md:grid-cols-[370px_370px_370px] md:gap-6 justify-center">
              {Array.from({ length: 3 }, (_, index) => {
                const article = {
                  ...relatedArticleBase,
                  id: index + 1,
                  slug: `related-article-${index + 1}`,
                };
                return (
                  <motion.div
                    key={index}
                    className="w-full max-w-[370px] block"
                    variants={fadeUp}
                    custom={index}
                  >
                    <ArticleCard article={article} index={index} />
                  </motion.div>
                );
              })}
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
