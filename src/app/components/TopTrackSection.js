"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FlankDecoration from "./FlankDecoration";
import { Play } from "iconsax-react";
import dynamic from "next/dynamic";

// Dynamic import for framer-motion to reduce bundle size
const MotionDiv = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.div })), {
  ssr: false
});

export default function TopTracksSection() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);




  // Auto-rotation removed - now using vertical stack on mobile

  useEffect(() => {
    fetchNigerianTracks();
  }, []);

  const fetchNigerianTracks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/spotify/tracks?limit=3");
      const data = await response.json();

      if (data.success || data.fallback) {
        const transformedTracks = data.tracks.map((track, index) => ({
          id: track.id || index + 1,
          title: track.name || `Track ${index + 1}`,
          artist: track.artist || "Unknown Artist",
          cover: track.image || `/images/track${index + 1}.png`,
          duration: track.duration || "0:00",
          spotifyUrl: track.external_urls?.spotify,
          previewUrl: track.preview_url,
        }));
        setTracks(transformedTracks);
      } else {
        setError(data.error || "Failed to fetch tracks");
        // Fallback to static data on error
        setTracks([
          {
            id: 1,
            title: "Love",
            artist: "Burna Boy",
            cover: "/images/track3.png",
            duration: "3:45",
          },
          {
            id: 2,
            title: "Essence",
            artist: "Wizkid",
            cover: "/images/track1.png",
            duration: "3:12",
          },
          {
            id: 3,
            title: "Stand Strong",
            artist: "Davido",
            cover: "/images/track2.png",
            duration: "2:55",
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching Nigerian tracks:", err);
      setError("Failed to load tracks");
      // Fallback to static data on error
      setTracks([
        {
          id: 1,
          title: "Love",
          artist: "Burna Boy",
          cover: "/images/track3.png",
          duration: "3:45",
        },
        {
          id: 2,
          title: "Essence",
          artist: "Wizkid",
          cover: "/images/track1.png",
          duration: "3:12",
        },
        {
          id: 3,
          title: "Stand Strong",
          artist: "Davido",
          cover: "/images/track2.png",
          duration: "2:55",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const TrackSkeleton = () => (
    <div className="group relative flex flex-col lg:flex-row xl:flex-col lg:justify-center w-[330px] md:w-[370px] lg:w-full xl:w-[370px] lg:h-auto h-[360px] md:h-[418px] gap-2">
      <div className="relative w-full lg:w-[370px] xl:w-full h-[350px] overflow-hidden rounded-xl bg-[#171717]">
        <div className="absolute inset-0 bg-[#171717] animate-pulse" />
      </div>

      <div className="text-white text-[20px] flex flex-col lg:justify-center gap-1">
        <div className="h-6 w-3/4 lg:w-[250px] xl:w-3/4 bg-[#171717] rounded animate-pulse truncate" />

        <div className="text-sm text-[#CCCCCC] flex flex-row items-center lg:items-start xl:items-center lg:flex-col xl:flex-row gap-2">
          <div className="h-4 w-1/3 bg-[#171717] rounded animate-pulse truncate" />

          <div className="flex flex-row items-center gap-2">
            <div className="h-4 w-16 bg-[#171717] rounded animate-pulse flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );

  const AlbumCard = ({ track, index }) => (
    <div className="group relative flex flex-col xl:flex-col w-[330px] md:w-[370px] xl:w-[370px] h-[360px] md:h-[418px] gap-2 cursor-pointer">
      <div className="relative w-full h-[350px] overflow-hidden rounded-xl border-[1px] border-[#FFDDB2]">
        <Image
          src={track.cover}
          alt={track.title}
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

        <div className="absolute inset-0 bg-black bg-opacity-40 md:opacity-0 md:group-hover:opacity-50 opacity-50 transition-opacity duration-300 rounded-md" />

        <div className="absolute inset-0 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
            <Play size="42" color="black" variant="TwoTone" />
          </div>
        </div>
        {track.spotifyUrl && (
          <a
            href={track.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
            aria-label={`View ${track.title} on Spotify`}
          />
        )}
      </div>
      <div className="text-white text-[20px] flex flex-col gap-1">
        <h3 className="truncate" title={track.title}>
          {track.title}
        </h3>
        <div className="text-sm text-[#CCCCCC] flex flex-row items-center xl:items-center xl:flex-row gap-2">
          <span className="truncate">{track.artist}</span>
          <div className="w-1 h-1 bg-[#2C2C2C] rounded-full xl:block flex-shrink-0" />
          <div className="flex flex-row items-center gap-2">
            <span className="flex-shrink-0">{track.duration}</span>
          </div>
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
          <span className="text-[#646464]">Top Nigerian Tracks</span>
          <span className="text-white">This week</span>
        </h2>
        {error && (
          <p className="text-red-400 text-sm mt-2">
            Could not fetch tracks – showing fallback data.
          </p>
        )}
      </div>

      {/* Mobile/Tablet/Laptop: Vertical Stack (below xl) */}
      <div className="xl:hidden relative z-20 w-full flex flex-col items-center gap-6 px-4">
        {loading ? (
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <TrackSkeleton key={i} />
            ))}
          </div>
                 ) : tracks.length > 0 ? (
           tracks.map((track, i) => (
             <div key={track.id} className="flex justify-center">
               <AlbumCard track={track} index={i} />
             </div>
           ))
         ) : (
           fallbackAlbums.map((track, i) => (
             <div key={track.id} className="flex justify-center">
               <AlbumCard track={track} index={i} />
             </div>
           ))
        )}
      </div>

      {/* Desktop Grid (xl and above) */}
      <div className="hidden xl:flex relative z-20 justify-center items-center gap-[33px]">
        {loading
          ? [...Array(3)].map((_, i) => <TrackSkeleton key={i} />)
          : tracks.length > 0
          ? tracks.map((track, i) => (
              <AlbumCard key={track.id} track={track} index={i} />
            ))
          : fallbackAlbums.map((track, i) => (
              <AlbumCard key={track.id} track={track} index={i} />
            ))}
      </div>
    </section>
  );
}
