"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import IntroBody from "./IntroBody";
import IntroTitle from "./IntroTitle";

// Generate dynamic artist story based on artist data
const generateArtistStory = (artist) => {
  if (!artist)
    return {
      title: "Details about artist's song",
      description: "Loading artist information...",
    };

  const stories = [
    {
      title: `${artist.name}'s Chart-Topping Journey`,
      description: `This week's chartbreaker is ${artist.name}, the Nigerian sensation whose latest releases have dominated streaming platforms worldwide. With millions of streams and a growing international fanbase, ${artist.name} continues to push the boundaries of Afrobeats, blending traditional rhythms with contemporary sounds. Their music represents the new wave of Nigerian artists taking the global stage by storm.`,
    },
    {
      title: `Behind the Music with ${artist.name}`,
      description: `${artist.name} has emerged as the #1 artist this week, captivating audiences with their unique sound and powerful storytelling. From Lagos streets to international stages, their journey embodies the spirit of modern Afrobeats. Each track tells a story of resilience, love, and the vibrant culture of Nigeria, resonating with fans across continents.`,
    },
    {
      title: `${artist.name}: Breaking Records and Hearts`,
      description: `Currently sitting at #1 on the charts, ${artist.name} has become the voice of a generation. Their latest work seamlessly weaves together Afrobeats, R&B, and contemporary sounds, creating music that speaks to both local and global audiences. This week's chart dominance is just another milestone in their incredible artistic journey.`,
    },
  ];

  // Use artist name to consistently pick the same story variant
  const storyIndex = artist.name.length % stories.length;
  return stories[storyIndex];
};

export default function CoverStorySection() {
  const [topArtist, setTopArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Fetch the #1 top Nigerian artist
  useEffect(() => {
    async function fetchTopArtist() {
      try {
        const response = await fetch("/api/spotify/artists?limit=1");
        const data = await response.json();

        if (data.success && data.artists.length > 0) {
          setTopArtist(data.artists[0]);
        } else {
          setTopArtist({
            id: "fallback-top",
            name: "Wizkid",
            image: "/images/wiz-image.png",
            popularity: 95,
            followers: 8000000,
            genres: ["afrobeats", "pop"],
          });
        }
      } catch (error) {
        console.error("Failed to fetch top artist:", error);
        setError(true);
        setTopArtist({
          id: "fallback-top",
          name: "Wizkid",
          image: "/images/wiz-image.png",
          popularity: 95,
          followers: 8000000,
          genres: ["afrobeats", "pop"],
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopArtist();
  }, []);

  // Handle inView changes
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const artistStory = generateArtistStory(topArtist);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const childVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3,
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden mx-auto w-full h-[1280px] xl:h-[1024px] bg-[#030303]"
      initial="hidden"
      animate={controls}
    >
      <div className="absolute w-8 h-[1024px] top-[14px] left-[1298px] bg-[#006DFF] backdrop-blur-[300px] blur-[150px]" />

      <div className="relative z-10 h-full">
        <IntroTitle line1="Where words fail," line2="Music speaks" />

        <IntroBody
          title="Cover Story"
          description="Meet the artist who broke the charts this week. Get an exclusive look into their journey, inspirations, and what's next for them."
        />

        <div className="flex flex-col xl:flex-row items-center justify-center px-16 mt-16 gap-16">
          {/* Dynamic Artist Image */}
          <motion.div
            className="relative"
            style={{
              height: "427px",
              width: "360px",
            }}
            variants={imageVariants}
            whileHover="hover"
          >
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              {isLoading ? (
                <div className="w-full h-full bg-[#171717] animate-pulse rounded-lg" />
              ) : topArtist ? (
                <Image
                  src={topArtist.image}
                  alt={`${topArtist.name} - #1 Nigerian Artist`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  className="absolute inset-0 rounded-lg"
                />
              ) : null}
            </div>

            {/* Top Artist Badge */}
            <motion.div
              className="absolute w-full inset-0"
              initial="hidden"
              animate={controls}
              variants={badgeVariants}
            >
              <Image
                src="/images/tp-artiste.svg"
                alt="Top Artist Badge"
                height={100}
                width={100}
                className="absolute -top-12 -left-12"
              />
            </motion.div>

            {/* Artist Rank Indicator */}
            {!isLoading && topArtist && (
              <motion.div
                className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-[#00ccff] text-sm font-semibold">
                  #1 This Week
                </div>
                <div className="text-white text-xs">{topArtist.name}</div>
              </motion.div>
            )}
          </motion.div>

          {/* Dynamic Artist Details */}
          <motion.div
            className="flex-1 max-w-xl"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {isLoading ? (
              <div className="space-y-6">
                <div className="h-8 bg-[#171717] animate-pulse rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-[#171717] animate-pulse rounded" />
                  <div className="h-4 bg-[#171717] animate-pulse rounded" />
                  <div className="h-4 bg-[#171717] animate-pulse rounded w-2/3" />
                </div>
                <div className="flex gap-6">
                  <div className="h-16 w-16 bg-[#171717] animate-pulse rounded" />
                  <div className="h-16 w-16 bg-[#171717] animate-pulse rounded" />
                  <div className="h-16 w-16 bg-[#171717] animate-pulse rounded" />
                </div>
              </div>
            ) : (
              <>
                <motion.h3
                  className="text-white font-bold mb-6 font-montserrat text-[32px] tracking-[-0.5px]"
                  variants={childVariants}
                >
                  {artistStory.title}
                </motion.h3>

                <motion.p
                  className="text-white/70 mb-8 leading-[1.8] font-dm-sans text-[16px]"
                  variants={childVariants}
                >
                  {artistStory.description}
                </motion.p>

                {/* Artist Stats */}
                {topArtist && (
                  <motion.div
                    className="flex items-center gap-6"
                    initial="hidden"
                    animate={controls}
                    variants={statsVariants}
                  >
                    <motion.div
                      className="text-center"
                      variants={childVariants}
                    >
                      <div className="text-white text-xl font-bold">#{1}</div>
                      <div className="text-white/60 text-sm">
                        Chart Position
                      </div>
                    </motion.div>
                    <motion.div
                      className="w-px h-8 bg-white/20"
                      variants={childVariants}
                    />
                    <motion.div
                      className="text-center"
                      variants={childVariants}
                    >
                      <div className="text-white text-xl font-bold">
                        {topArtist.popularity || 95}
                      </div>
                      <div className="text-white/60 text-sm">
                        Popularity Score
                      </div>
                    </motion.div>
                    <motion.div
                      className="w-px h-8 bg-white/20"
                      variants={childVariants}
                    />
                    <motion.div
                      className="text-center"
                      variants={childVariants}
                    >
                      <div className="text-white text-xl font-bold">
                        {topArtist.followers
                          ? `${(topArtist.followers / 1000000).toFixed(1)}M`
                          : "8.0M"}
                      </div>
                      <div className="text-white/60 text-sm">Followers</div>
                    </motion.div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
