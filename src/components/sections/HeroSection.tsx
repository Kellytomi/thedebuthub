"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";

export default function HeroSection() {
  const { isMuted, toggleMute, hasUserInteracted, pendingUnmute } = useAudio();
  const [artists, setArtists] = useState<{ id: string; name: string; image: string; fallback: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Fetch Nigerian artists on component mount
  const fetchArtists = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/spotify/artists?limit=7");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.artists?.length > 0) {
        const validatedArtists = data.artists
          .filter((artist: any) => artist?.name)
          .map((artist: any) => ({
            id: artist.id || `artist-${Date.now()}-${Math.random()}`,
            name: artist.name,
            image: artist.image || "/images/placeholder.svg",
            fallback: "/images/placeholder.svg",
            followers: artist.followers || 0,
            popularity: artist.popularity || 0,
            external_urls: artist.external_urls || {},
            genres: artist.genres || []
          }));

        if (validatedArtists.length > 0) {
          setArtists(validatedArtists);
          console.log('✅ Successfully loaded', validatedArtists.length, 'artists');
          return;
        }
      }
      
      // Fallback to static images
      throw new Error('No valid artists received');
      
    } catch (error) {
      console.error("Failed to fetch artists:", error);
      setArtists(getDefaultArtists());
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getDefaultArtists = () => [
    {
      id: "fallback-1",
      name: "Rema",
      image: "/images/rema-image.png",
      fallback: "/images/placeholder.svg",
    },
    {
      id: "fallback-2",
      name: "Wizkid", 
      image: "/images/wiz-image.png",
      fallback: "/images/placeholder.svg",
    },
    {
      id: "fallback-3",
      name: "Davido",
      image: "/images/david-image.png",
      fallback: "/images/placeholder.svg",
    },
    {
      id: "fallback-4",
      name: "Burna Boy",
      image: "/images/rema-image.png", 
      fallback: "/images/placeholder.svg",
    },
    {
      id: "fallback-5",
      name: "Asake",
      image: "/images/wiz-image.png",
      fallback: "/images/placeholder.svg",
    },
    {
      id: "fallback-6",
      name: "Fireboy DML",
      image: "/images/david-image.png",
      fallback: "/images/placeholder.svg",
    },
    {
      id: "fallback-7",
      name: "Omah Lay",
      image: "/images/rema-image.png",
      fallback: "/images/placeholder.svg",
    },
  ];

    useEffect(() => {
      fetchArtists();
    }, [fetchArtists]);

  // Auto-rotation carousel effect when idle
  useEffect(() => {
    if (!isAutoRotating || artists.length === 0) return;

    const interval = setInterval(() => {
      setCurrentArtistIndex((prev) => (prev + 1) % artists.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoRotating, artists.length]);

  // Memoized artist positions for performance optimization
  const artistPositions = useMemo(() => {
    if (artists.length === 0) return {};
    
    return {
      currentArtist: artists[currentArtistIndex],
      farLeftArtist: artists[(currentArtistIndex - 3 + artists.length) % artists.length] || artists[0],
      leftMainArtist: artists[(currentArtistIndex - 1 + artists.length) % artists.length] || artists[0],
      rightMainArtist: artists[(currentArtistIndex + 1) % artists.length] || artists[0],
      farRightArtist: artists[(currentArtistIndex + 3) % artists.length] || artists[0],
      backCard1Artist: artists[(currentArtistIndex - 2 + artists.length) % artists.length] || artists[0],
      backCard2Artist: artists[(currentArtistIndex + 2) % artists.length] || artists[0],
    };
  }, [artists, currentArtistIndex]);

  const { 
    currentArtist, 
    farLeftArtist, 
    leftMainArtist, 
    rightMainArtist, 
    farRightArtist, 
    backCard1Artist, 
    backCard2Artist 
  } = artistPositions;

  const imageVariants: Variants = {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const carouselVariants: Variants = {
    enter: {
      y: 200,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      y: -200,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      className="relative h-[1080px] sm:h-[1024px]"
      style={{
        width: "100%",
        backgroundColor: "",
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        {/* Tagline */}
        <h2
          className="mb-8 text-lg"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
          }}
        >
          <span style={{ color: "#646464" }}>Your</span>{" "}
          <span className="text-white">Sound,</span>{" "}
          <span style={{ color: "#646464" }}>Your</span>{" "}
          <span className="text-white">Story,</span>{" "}
          <span style={{ color: "#646464" }}>Your</span>{" "}
          <span className="text-white">Stage</span>
        </h2>

        {/* Main Title */}
        <h1
          className="text-white font-bold mb-8"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: "1.1",
            letterSpacing: "-2px",
          }}
        >
          The Debut Hub
        </h1>

        {/* Description */}
        <p
          className="text-white/70 mb-16 max-w-4xl"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          Explore trending music charts, breaking news, and tools to elevate
          your sound, all in one hub.
        </p>

        {/* Artist Images Layout - Carousel of 7 Nigerian Artists */}
        <div className="relative mb-12">
          {/* Far left artist image */}
          <div
            className="xl:inline hidden absolute rounded-lg"
            style={{
              top: "100px",
              left: "-450px",
              width: "120px",
              height: "120px",
            }}
          >
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              {isLoading ? (
                <div
                  className="w-full h-full bg-[#171717] animate-pulse rounded-lg"
                  style={{ animationDelay: "0ms" }}
                />
              ) : farLeftArtist ? (
                <motion.div
                  key={`far-left-${currentArtistIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={farLeftArtist.image}
                    alt={`${farLeftArtist.name} - Nigerian Artist`}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="absolute inset-0 rounded-lg"
                  />
                </motion.div>
              ) : null}
            </div>
          </div>

          {/* Left main artist image */}
          <div
            className="absolute hidden lg:block"
            style={{
              top: "80px",
              left: "-300px",
              width: "190px",
              height: "170px",
            }}
          >
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              {isLoading ? (
                <div
                  className="w-full h-full bg-[#171717] animate-pulse rounded-lg"
                  style={{ animationDelay: "200ms" }}
                />
              ) : leftMainArtist ? (
                <motion.div
                  key={`left-main-${currentArtistIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={leftMainArtist.image}
                    alt={`${leftMainArtist.name} - Nigerian Artist`}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="absolute inset-0 rounded-lg"
                  />
                </motion.div>
              ) : null}
            </div>
          </div>

          {/* Center main artist image with carousel */}
          <div className="relative">
            {/* Background artist cards */}
            <div>
              {/* Back Card 1 - Left rotated */}
              <motion.div
                key={`back1-${currentArtistIndex}`}
                className="absolute hidden md:block w-[300px] h-[356px] rounded-2xl -left-[75px] bottom-0 overflow-hidden"
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    rotate: 0,
                    opacity: 0,
                    x: 60,
                    transition: { duration: 0 },
                  },
                  animate: {
                    rotate: -12,
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      mass: 0.5,
                      delay: 0.1,
                      restDelta: 0.01,
                    },
                  },
                }}
                style={{
                  transformOrigin: "top left",
                }}
              >
                {isLoading ? (
                  <div
                    className="w-full h-full bg-[#171717] animate-pulse rounded-2xl"
                    style={{ animationDelay: "300ms" }}
                  />
                ) : backCard1Artist ? (
                  <motion.div
                    key={`back1-${currentArtistIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={backCard1Artist.image}
                      alt={`${backCard1Artist.name} - Nigerian Artist`}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      className="absolute inset-0 rounded-2xl"
                    />
                  </motion.div>
                ) : null}
              </motion.div>

              {/* Back Card 2 - Right rotated */}
              <motion.div
                key={`back2-${currentArtistIndex}`}
                className="absolute hidden md:block w-[300px] h-[356px] rounded-2xl -right-20 bottom-14 overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: {
                    rotate: 0,
                    opacity: 0,
                    x: -60,
                    transition: { duration: 0 },
                  },
                  animate: {
                    rotate: 12,
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15, 
                      mass: 0.5,
                      delay: 0.1,
                      restDelta: 0.01,
                    },
                  },
                }}
                style={{
                  transformOrigin: "top left",
                }}
              >
                {isLoading ? (
                  <div
                    className="w-full h-full bg-[#171717] animate-pulse rounded-2xl"
                    style={{ animationDelay: "500ms" }}
                  />
                ) : backCard2Artist ? (
                  <motion.div
                    key={`back2-${currentArtistIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={backCard2Artist.image}
                      alt={`${backCard2Artist.name} - Nigerian Artist`}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      className="absolute inset-0 rounded-2xl"
                    />
                  </motion.div>
                ) : null}
              </motion.div>
            </div>

            <motion.div
              className="relative"
              style={{ height: "427px", width: "360px" }}
              initial="initial"
              animate="animate"
              variants={imageVariants}
            >
              <div className="w-full h-full overflow-hidden relative rounded-2xl shadow-2xl">
                {isLoading ? (
                  <div
                    className="w-full h-full bg-[#171717] animate-pulse rounded-2xl"
                    style={{ animationDelay: "400ms" }}
                  />
                ) : currentArtist ? (
                  <motion.div
                    key={`center-${currentArtistIndex}`}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={carouselVariants}
                    className="w-full h-full"
                  >
                    <Image
                      src={currentArtist.image}
                      alt={`${currentArtist.name} - Featured Nigerian Artist`}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      className="absolute inset-0 rounded-2xl"
                    />
                  </motion.div>
                ) : null}
              </div>

              {/* Hot News Badge */}
              <div className="absolute w-full inset-0">
                <Image
                  src="/images/hn-badge.svg"
                  alt="Hot News Badge"
                  height={100}
                  width={100}
                  className="absolute -top-12 -right-3 md:-right-12"
                />
              </div>
            </motion.div>
          </div>

          {/* Right main artist image */}
          <div
            className="absolute hidden lg:block"
            style={{
              top: "80px",
              right: "-300px",
              width: "190px",
              height: "170px",
            }}
          >
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              {isLoading ? (
                <div
                  className="w-full h-full bg-[#171717] animate-pulse rounded-lg"
                  style={{ animationDelay: "600ms" }}
                />
              ) : rightMainArtist ? (
                <motion.div
                  key={`right-main-${currentArtistIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={rightMainArtist.image}
                    alt={`${rightMainArtist.name} - Nigerian Artist`}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="absolute inset-0 rounded-lg"
                  />
                </motion.div>
              ) : null}
            </div>
          </div>

          {/* Far right artist image */}
          <div
            className="xl:inline hidden absolute rounded-lg"
            style={{
              top: "100px",
              right: "-450px",
              width: "120px",
              height: "120px",
            }}
          >
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              {isLoading ? (
                <div
                  className="w-full h-full bg-[#171717] animate-pulse rounded-lg"
                  style={{ animationDelay: "800ms" }}
                />
              ) : farRightArtist ? (
                <motion.div
                  key={`far-right-${currentArtistIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={farRightArtist.image}
                    alt={`${farRightArtist.name} - Nigerian Artist`}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="absolute inset-0 rounded-lg"
                  />
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>

        <Button ariaLabel="Explore more news">
          Explore More News
        </Button>
      </div>
    </section>
  );
}
