"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FlankDecoration } from "@/components/ui";
import dynamic from "next/dynamic";
import { trpc } from "@/lib/trpc-client";

// Dynamic import for framer-motion to reduce bundle size
const MotionDiv = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.div })), {
  ssr: false
});

const fallbackAlbums = [
  {
    id: 1,
    title: "Rave & Roses Ultra",
    artist: "Rema",
    cover: "/images/rema-image.png",
    tracks: "15 tracks",
    popularity: 95,
  },
  {
    id: 2,
    title: "Afro Rave",
    artist: "Shallipopi",
    cover: "/images/album2.png",
    tracks: "12 tracks",
    popularity: 92,
  },
  {
    id: 3,
    title: "Work of Art",
    artist: "Asake",
    cover: "/images/album1.png",
    tracks: "14 tracks",
    popularity: 90,
  },
];

export default function TopAlbumsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use tRPC to fetch most streamed albums
  const { 
    data: albumsData, 
    isLoading: loading, 
    error,
    isSuccess 
  } = trpc.spotify.getMostStreamedAlbums.useQuery(
    { limit: 3 },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    }
  );

  // Process albums data from tRPC
  const albums = (() => {
    if (isSuccess && albumsData?.albums?.length > 0) {
      return albumsData.albums.map((album: any, i: number) => ({
        id: album.id || i + 1,
        title: album.name || `Album ${i + 1}`,
        artist: album.artist || "Unknown Artist",
        cover: album.image || fallbackAlbums[i]?.cover || "/images/placeholder.svg",
        tracks: album.total_tracks ? `${album.total_tracks} tracks` : "Tracks unknown",
        popularity: album.popularity || 85,
        spotifyUrl: album.external_urls?.spotify ?? "#",
      }));
    }

    // Fallback data if API fails or returns no data
    return fallbackAlbums;
  })();

  const AlbumSkeleton = () => (
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

  const AlbumCard = ({ album, index }: { album: any; index: number; }) => (
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
        ) : (
          albums.map((album, i) => (
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
          : albums.map((album, i) => (
              <AlbumCard key={album.id} album={album} index={i} />
            ))}
      </div>
    </section>
  );
}
