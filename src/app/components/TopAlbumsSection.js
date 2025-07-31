"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FlankDecoration from "./FlankDecoration";
import dynamic from "next/dynamic";

// Dynamic import for framer-motion to reduce bundle size
const MotionDiv = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.div })), {
  ssr: false
});
const AnimatePresence = dynamic(() => import("framer-motion").then(mod => ({ default: mod.AnimatePresence })), {
  ssr: false
});

const fallbackAlbums = [
  {
    id: 1,
    title: "Love, Damini",
    artist: "Burna Boy",
    cover: "/images/album3.png",
    tracks: "19 tracks",
    popularity: 89,
  },
  {
    id: 2,
    title: "Made in Lagos",
    artist: "Wizkid",
    cover: "/images/album1.png",
    tracks: "14 tracks",
    popularity: 92,
  },
  {
    id: 3,
    title: "A Better Time",
    artist: "Davido",
    cover: "/images/album2.png",
    tracks: "17 tracks",
    popularity: 85,
  },
];

export default function TopAlbumsSection() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);



  // Auto-rotation removed - now using vertical stack on mobile

  useEffect(() => {
    const fetchMostStreamedAlbums = async () => {
      try {
        console.log("🇳🇬 Fetching top albums from Nigeria's official charts...");
        const res = await fetch("/api/spotify/albums/most-streamed?limit=3");

        if (!res.ok)
          throw new Error("Failed to fetch Nigeria Top 50 chart data");

        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          console.warn("Failed to parse JSON. Using fallback.");
          throw new Error("Invalid JSON");
        }

        if (data.success || data.fallback) {
          console.log("🎯 Nigeria Chart Data API Response:", data);

          const transformed =
            data.albums?.map((album, i) => {
              // Ensure popularity is available for stream count calculation
              const popularity = album.popularity || 85;

              console.log(
                `🏆 #${i + 1} Chart Position: ${album.artist} - ${
                  album.name
                } (${
                  album.tracksInTop50 || "unknown"
                } tracks in Top 50, popularity: ${popularity})`
              );
              console.log(`🖼️  Image URL received: ${album.image}`);

              const coverImage = album.image || fallbackAlbums[i]?.cover;
              console.log(`🖼️  Final cover image: ${coverImage}`);

              return {
                id: album.id || i + 1,
                title: album.name || `Album ${i + 1}`,
                artist: album.artist || "Unknown Artist",
                cover: coverImage,
                tracks: album.total_tracks
                  ? `${album.total_tracks} tracks`
                  : "Tracks unknown",
                popularity: popularity,
                spotifyUrl: album.external_urls?.spotify ?? "#",
              };
            }) || [];

          if (transformed.length === 0)
            throw new Error("Empty transformed array");

          console.log(
            "✅ Successfully loaded Nigeria chart albums:",
            transformed.map((a) => `${a.artist} - ${a.title}`)
          );
          setAlbums(transformed);
        } else {
          throw new Error("API returned failure");
        }
      } catch (err) {
        console.error("❌ Nigeria chart data fetch error:", err);
        setError(true);

        // Enhanced fallback - realistic Nigeria chart rankings with correct image mappings
        const enhancedFallbacks = [
          {
            id: 1,
            title: "Love, Damini",
            artist: "Burna Boy",
            cover: "/images/album3.png", // Love, Damini = album3.png
            tracks: "19 tracks",
            popularity: 95,
          },
          {
            id: 2,
            title: "Twice As Tall",
            artist: "Burna Boy",
            cover: "/images/album2.png", // Twice As Tall = album2.png
            tracks: "15 tracks",
            popularity: 92,
          },
          {
            id: 3,
            title: "Made in Lagos",
            artist: "Wizkid",
            cover: "/images/album1.png", // Made in Lagos = album1.png
            tracks: "14 tracks",
            popularity: 90,
          },
        ];

        console.log(
          "🔄 Using enhanced fallback data for Nigeria chart rankings"
        );
        setAlbums(enhancedFallbacks);
      } finally {
        setLoading(false);
      }
    };

    fetchMostStreamedAlbums();
  }, []);

  const AlbumSkeleton = () => (
    <div className="group relative flex flex-col lg:flex-row xl:flex-col lg:justify-center w-[330px] md:w-[370px] lg:w-full xl:w-[370px] lg:h-auto h-[360px] md:h-[418px] gap-2">
      <div className="relative w-full lg:w-[370px] xl:w-full h-[350px] overflow-hidden rounded-xl bg-[#171717]">
        <div className="absolute inset-0 bg-[#171717] animate-pulse" />
      </div>

      <div className="text-white text-[20px] flex flex-col lg:justify-center gap-1">
        <div className="h-6 w-3/4 bg-[#171717] rounded animate-pulse truncate" />

        <div className="text-sm text-[#CCCCCC] flex flex-row items-center lg:items-start xl:items-center lg:flex-col xl:flex-row gap-2">
          <div className="h-4 w-1/3 bg-[#171717] rounded animate-pulse truncate" />

          <div className="flex flex-row items-center gap-2">
            <div className="h-4 w-16 bg-[#171717] rounded animate-pulse flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );

  const AlbumCard = ({ album, index }) => (
    <div className="group relative flex flex-col xl:flex-col w-[330px] md:w-[370px] xl:w-[370px] h-[360px] md:h-[418px] gap-2 cursor-pointer">
      <div className="relative w-full h-[350px] overflow-hidden rounded-xl border-[1px] border-[#FFDDB2]">
        <Image
          src={album.cover}
          alt={album.title}
          width={370}
          height={350}
          priority={index < 3} // Priority for first 3 images
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 330px, (max-width: 1200px) 370px, 370px"
          className="object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105"
          style={{
            aspectRatio: '370/350',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.currentTarget.src =
              fallbackAlbums[index]?.cover || "/images/placeholder.png";
          }}
        />
        {album.spotifyUrl && (
          <a
            href={album.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
            aria-label={`View ${album.title} on Spotify`}
          />
        )}
      </div>
      <div className="text-white text-[20px] flex flex-col gap-1">
        <h3 className="truncate" title={album.title}>
          {album.title}
        </h3>
        <div className="text-sm text-[#CCCCCC] flex flex-row items-center xl:items-center xl:flex-row gap-2">
          <span className="truncate">{album.artist}</span>
          <div className="w-1 h-1 bg-[#2C2C2C] rounded-full xl:block flex-shrink-0" />
            <span className="flex-shrink-0">{album.tracks}</span>
        </div>
      </div>
    </div>
  );

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="relative overflow-hidden py-10 flex flex-col gap-10 w-full xl:h-[666px] bg-[#040507]">
      <FlankDecoration />

      <div className="relative z-20 w-full text-center">
        <h2
          className="mb-8 flex flex-col text-lg"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
          }}
        >
          <span className="text-[#646464]">Top Albums Nigeria</span>
          <span className="text-white">From Official Charts</span>
        </h2>
        {error && (
          <p className="text-red-400 text-sm mt-2">
            Could not fetch albums – showing fallback data.
          </p>
        )}
      </div>

      {/* Mobile/Tablet/Laptop: Vertical Stack (below xl) */}
      <div className="xl:hidden relative z-20 w-full flex flex-col items-center gap-6 px-4">
        {loading ? (
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <AlbumSkeleton key={i} />
            ))}
          </div>
                 ) : albums.length > 0 ? (
           albums.map((album, i) => (
             <div key={album.id} className="flex justify-center">
               <AlbumCard album={album} index={i} />
             </div>
           ))
         ) : (
           fallbackAlbums.map((album, i) => (
             <div key={album.id} className="flex justify-center">
               <AlbumCard album={album} index={i} />
             </div>
           ))
        )}
      </div>

      {/* Desktop Grid (xl and above) */}
      <div className="hidden xl:flex relative z-20 justify-center items-center gap-[33px]">
        {loading
          ? [...Array(3)].map((_, i) => <AlbumSkeleton key={i} />)
          : albums.length > 0
          ? albums.map((album, i) => (
              <AlbumCard key={album.id} album={album} index={i} />
            ))
          : fallbackAlbums.map((album, i) => (
              <AlbumCard key={album.id} album={album} index={i} />
            ))}
      </div>
    </section>
  );
}
