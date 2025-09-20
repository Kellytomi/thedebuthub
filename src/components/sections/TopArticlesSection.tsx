"use client";

import React from "react";
import { ArticleCard, Button, FlankDecoration, IntroTitle } from "../ui";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const TopArticlesSection = () => {
  const relatedArticleBase = {
    title:
      "All about her historic Song for becoming Youngest to Most Inspiring woman",
    author: "David Adeleke",
    date: "Dec 15, 2024",
    image: "/images/david-image.png",
  };

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
        <IntroTitle
          line1="What’s been going on?"
          line2="New articles for you"
        />

        {/* Related Articles Container */}
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Desktop: Grid Layout */}
          <div className="grid grid-cols-[330px] sm:grid-cols-[370px] lg:grid-cols-[370px_370px] xl:grid-cols-[370px_370px_370px] grid-rows-[444px_444px] gap-6 justify-center">
            {Array.from({ length: 6 }, (_, index) => (
              <motion.div
                key={index}
                className="w-full max-w-[370px]"
                variants={cardVariants}
              >
                <ArticleCard
                  article={{
                    ...relatedArticleBase,
                    id: index + 1,
                    slug: `related-article-${index + 1}`,
                  }}
                  index={index}
                />
              </motion.div>
            ))}
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