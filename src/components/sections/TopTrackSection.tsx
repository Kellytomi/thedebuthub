"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FlankDecoration } from "@/components/ui";
import { Play } from "iconsax-react";
import dynamic from "next/dynamic";
import { trpc } from "@/lib/trpc-client";

// Dynamic import for framer-motion to reduce bundle size
const MotionDiv = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.div })), {
  ssr: false
});

const fallbackTracks = [
  {
    id: 1,
    title: "FUN",
    artist: "Rema",
    cover: "/images/rema-image.png",
    duration: "3:27",
  },
  {
    id: 2,
    title: "you",
    artist: "FOLA",
    cover: "/images/album2.png",
    duration: "2:48",
  },
  {
    id: 3,
    title: "Na So",
    artist: "Shallipopi",
    cover: "/images/album1.png",
    duration: "2:15",
  },
];

export default function TopTracksSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use tRPC to fetch Nigerian tracks
  const { 
    data: tracksData, 
    isLoading: loading, 
    error,
    isSuccess 
  } = trpc.spotify.getTracks.useQuery(
    { limit: 3 },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    }
  );

  // Process tracks data from tRPC
  const tracks = (() => {
    if (isSuccess && tracksData?.tracks?.length > 0) {
      return tracksData.tracks.map((track: any, index: number) => ({
        id: track.id || index + 1,
        title: track.name || `Track ${index + 1}`,
        artist: track.artist || "Unknown Artist",
        cover: track.image || fallbackTracks[index]?.cover || "/images/placeholder.svg",
        duration: track.duration || "0:00",
        spotifyUrl: track.external_urls?.spotify,
        previewUrl: track.preview_url,
      }));
    }

    // Fallback data if API fails or returns no data
    return fallbackTracks;
  })();

  const TrackSkeleton = () => (
    <div className="group relative flex flex-col w-[330px] md:w-[370px] xl:w-[370px] h-[360px] md:h-[418px] gap-2">
      <div className="relative w-full h-[350px] overflow-hidden rounded-xl bg-[#171717]">
        <div className="absolute inset-0 bg-[#171717] animate-pulse" />
      </div>
      <div className="text-white text-[20px] flex flex-col gap-1">
        <div className="h-6 w-3/4 bg-[#171717] rounded animate-pulse" />
        <div className="text-sm text-[#CCCCCC] flex flex-row items-center gap-2">
          <div className="h-4 w-1/3 bg-[#171717] rounded animate-pulse" />
          <div className="h-4 w-16 bg-[#171717] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  const TrackCard = ({ track, index }: { track: any; index: number; }) => (
    <div className="group relative flex flex-col xl:flex-col w-[330px] md:w-[370px] xl:w-[370px] h-[360px] md:h-[418px] gap-2 cursor-pointer">
      <div className="relative w-full h-[350px] overflow-hidden rounded-xl border-[1px] border-white">
        <Image
          src={track.cover}
          alt={track.title}
          width={370}
          height={350}
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 330px, (max-width: 1200px) 370px, 370px"
          className="object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105"
          style={{
            aspectRatio: '370/350',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.currentTarget.src = fallbackTracks[index]?.cover || "/images/placeholder.png";
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
          <span className="flex-shrink-0">{track.duration}</span>
        </div>
      </div>
    </div>
  );

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
        ) : (
          tracks.map((track: any, i: number) => (
            <div key={track.id} className="flex justify-center">
              <TrackCard track={track} index={i} />
            </div>
          ))
        )}
      </div>

      {/* Desktop Grid (xl and above) */}
      <div className="hidden xl:flex relative z-20 justify-center items-center gap-[33px]">
        {loading
          ? [...Array(3)].map((_, i) => <TrackSkeleton key={i} />)
          : tracks.map((track: any, i: number) => (
              <TrackCard key={track.id} track={track} index={i} />
            ))}
      </div>
    </section>
  );
}