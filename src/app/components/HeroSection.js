"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ActionButton from "./ActionButton";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(false);
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Fetch Nigerian artists on component mount
  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await fetch("/api/spotify/artists?limit=7");
        const data = await response.json();

        if (data.success && data.artists.length > 0) {
          setArtists(data.artists);
        } else {
          // Fallback to static images if API fails
          setArtists([
            {
              id: "fallback-1",
              name: "Rema",
              image: "/images/rema-image.png",
            },
            {
              id: "fallback-2",
              name: "Wizkid",
              image: "/images/wiz-image.png",
            },
            {
              id: "fallback-3",
              name: "Davido",
              image: "/images/david-image.png",
            },
            {
              id: "fallback-4",
              name: "Burna Boy",
              image: "/images/rema-image.png",
            },
            {
              id: "fallback-5",
              name: "Asake",
              image: "/images/wiz-image.png",
            },
            {
              id: "fallback-6",
              name: "Fireboy DML",
              image: "/images/david-image.png",
            },
            {
              id: "fallback-7",
              name: "Omah Lay",
              image: "/images/rema-image.png",
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch artists:", error);
        // Fallback to static images
        setArtists([
          {
            id: "fallback-1",
            name: "Rema",
            image: "/images/rema-image.png",
          },
          {
            id: "fallback-2",
            name: "Wizkid",
            image: "/images/wiz-image.png",
          },
          {
            id: "fallback-3",
            name: "Davido",
            image: "/images/david-image.png",
          },
          {
            id: "fallback-4",
            name: "Burna Boy",
            image: "/images/rema-image.png",
          },
          {
            id: "fallback-5",
            name: "Asake",
            image: "/images/wiz-image.png",
          },
          {
            id: "fallback-6",
            name: "Fireboy DML",
            image: "/images/david-image.png",
          },
          {
            id: "fallback-7",
            name: "Omah Lay",
            image: "/images/rema-image.png",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArtists();
  }, []);

  // Auto-rotation carousel effect when idle
  useEffect(() => {
    if (!isAutoRotating || artists.length === 0) return;

    const interval = setInterval(() => {
      setCurrentArtistIndex((prev) => (prev + 1) % artists.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoRotating, artists.length]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log("Background music", isMuted ? "unmuted" : "muted");
  };

  // Get the artists for display - flowing left to right
  const currentArtist = artists[currentArtistIndex]; // Center main
  const farLeftArtist =
    artists[(currentArtistIndex - 3 + artists.length) % artists.length] ||
    artists[0]; // Far left (3 positions behind)
  const leftMainArtist =
    artists[(currentArtistIndex - 1 + artists.length) % artists.length] ||
    artists[0]; // Left main (1 position behind)
  const rightMainArtist =
    artists[(currentArtistIndex + 1) % artists.length] || artists[0]; // Right main (1 position ahead)
  const farRightArtist =
    artists[(currentArtistIndex + 3) % artists.length] || artists[0]; // Far right (3 positions ahead)
  const backCard1Artist =
    artists[(currentArtistIndex - 2 + artists.length) % artists.length] ||
    artists[0]; // Back card 1 (2 positions behind)
  const backCard2Artist =
    artists[(currentArtistIndex + 2) % artists.length] || artists[0]; // Back card 2 (2 positions ahead)

  const imageVariants = {
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

  const carouselVariants = {
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
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="relative h-[1024px]"
      style={{
        width: "100%",
        // maxWidth: "1440px",
        // height: "1024px",
        backgroundColor: "#030303",
      }}
    >
      {/* Grid Pattern Background */}
      <Image
        src="/images/grid-layers.svg"
        alt="grid pattern background"
        width={36}
        height={39}
        priority
        style={{
          position: "absolute",
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />

      {/* Header Navigation */}
      <div className="absolute top-8 left-0 right-0 z-20">
        <div className="flex justify-between items-center px-12 max-w-[1440px] mx-auto">
          {/* Logo */}
          <div
            className="flex items-center"
            style={{
              width: "36px",
              height: "39px",
            }}
          >
            <Image
              src="/images/the debut hub.png"
              alt="The Debut Hub Logo"
              width={36}
              height={39}
              priority
              style={{ width: "36px", height: "39px", objectFit: "contain" }}
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Volume/Mute Button */}
            <button
              onClick={toggleMute}
              className="text-white/70 hover:text-white relative overflow-hidden transition-colors"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                boxShadow: "0px 2px 7px 0px rgba(87, 87, 87, 0.17)",
                padding: "8px",
              }}
              aria-label={
                isMuted ? "Unmute background music" : "Mute background music"
              }
            >
              {/* Border gradient overlay */}
              <div
                className="absolute inset-0 rounded-md p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #242424 0%, #070707 100%)",
                  zIndex: -1,
                }}
              >
                <div
                  className="w-full h-full rounded-md"
                  style={{
                    background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                  }}
                />
              </div>

              {/* Volume Icon */}
              {isMuted ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            {/* Subscribe Button */}
            <button
              className="text-white/70 hover:text-white font-medium relative overflow-hidden"
              style={{
                width: "100px",
                height: "32px",
                borderRadius: "6px",
                background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                boxShadow: "0px 2px 7px 0px rgba(87, 87, 87, 0.17)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                padding: "8px 16px",
              }}
            >
              {/* Border gradient overlay */}
              <div
                className="absolute inset-0 rounded-md p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #242424 0%, #070707 100%)",
                  zIndex: -1,
                }}
              >
                <div
                  className="w-full h-full rounded-md"
                  style={{
                    background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                  }}
                />
              </div>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8 bg-black/50">
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
                className="absolute w-[300px] h-[356px] rounded-2xl -left-[75px] bottom-0 overflow-hidden"
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
                className="absolute w-[300px] h-[356px] rounded-2xl -right-20 bottom-14 overflow-hidden"
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
                  className="absolute -top-12 -right-12"
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

        <ActionButton onClick={() => alert("Action triggered!")}>
          Explore More News
        </ActionButton>
      </div>
    </section>
  );
}
