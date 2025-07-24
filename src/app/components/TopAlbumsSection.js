"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FlankDecoration from "./FlankDecoration";

// Function to convert popularity score to estimated stream count
const formatStreamCount = (popularity) => {
  // Handle undefined, null, or 0 values
  if (!popularity || popularity === 0) {
    return "0 streams";
  }
  
  // Ensure popularity is a number and within valid range
  const normalizedPopularity = Math.max(0, Math.min(100, Number(popularity) || 0));
  
  if (normalizedPopularity === 0) {
    return "0 streams";
  }
  
  // Convert popularity (0-100) to estimated stream count
  // Higher popularity = exponentially more streams
  const baseStreams = Math.pow(normalizedPopularity / 100, 2) * 50000000; // 50M max streams
  const randomFactor = 0.8 + (Math.random() * 0.4); // Add some variance (0.8-1.2)
  const streams = Math.floor(baseStreams * randomFactor);
  
  if (streams >= 1000000) {
    return `${(streams / 1000000).toFixed(1)}M streams`;
  } else if (streams >= 1000) {
    return `${(streams / 1000).toFixed(0)}K streams`;
  } else {
    return `${Math.max(1, streams)} streams`; // Ensure at least 1 stream for non-zero popularity
  }
};

const fallbackAlbums = [
  {
    id: 1,
    title: "Love, Damini",
    artist: "Burna Boy",
    cover: "/images/album3.png",
    tracks: "19 tracks",
    popularity: 89,
    streamCount: formatStreamCount(89),
  },
  {
    id: 2,
    title: "Made in Lagos",
    artist: "Wizkid",
    cover: "/images/album1.png",
    tracks: "14 tracks",
    popularity: 92,
    streamCount: formatStreamCount(92),
  },
  {
    id: 3,
    title: "A Better Time",
    artist: "Davido",
    cover: "/images/album2.png",
    tracks: "17 tracks",
    popularity: 85,
    streamCount: formatStreamCount(85),
  },
];

export default function TopAlbumsSection() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch("/api/spotify/albums?limit=3");

        if (!res.ok) throw new Error("Failed to fetch");

        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          console.warn("Failed to parse JSON. Using fallback.");
          throw new Error("Invalid JSON");
        }

        if (data.success || data.fallback) {
          console.log("API Response:", data); // Debug log
          
          const transformed = data.albums?.map((album, i) => {
            // Use fallback popularity if API doesn't provide it
            const popularity = album.popularity || fallbackAlbums[i]?.popularity || 75;
            
            console.log(`Album ${i}: ${album.name}, popularity: ${album.popularity} -> ${popularity}`); // Debug log
            
            return {
              id: album.id || i + 1,
              title: album.name || `Album ${i + 1}`,
              artist: album.artist || "Unknown Artist",
              cover: album.image || fallbackAlbums[i]?.cover,
              tracks: album.total_tracks ? `${album.total_tracks} tracks` : "Tracks unknown",
              popularity: popularity,
              streamCount: formatStreamCount(popularity),
              spotifyUrl: album.external_urls?.spotify ?? "#",
            };
          }) || [];

          if (transformed.length === 0) throw new Error("Empty transformed array");

          setAlbums(transformed);
        } else {
          throw new Error("API returned failure");
        }
      } catch (err) {
        console.error("Album fetch error:", err);
        setError(true);
        // Transform fallback albums to ensure they have streamCount
        const transformedFallbacks = fallbackAlbums.map(album => ({
          ...album,
          streamCount: formatStreamCount(album.popularity)
        }));
        setAlbums(transformedFallbacks);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const AlbumSkeleton = () => (
    <div className="flex flex-col w-[370px] h-[418px] gap-2 animate-pulse">
      <div className="w-full h-[350px] bg-gray-800 rounded-md" />
      <div className="h-6 bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-600 rounded w-1/2" />
    </div>
  );

  const AlbumCard = ({ album, index }) => (
    <div className="group relative flex flex-col w-[370px] h-[418px] gap-2 cursor-pointer">
      <div className="relative w-full h-[350px] overflow-hidden rounded-md border border-white/10">
        <Image
          src={album.cover}
          alt={album.title}
          width={370}
          height={350}
          className="object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = fallbackAlbums[index]?.cover || "/images/placeholder.png";
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
        <h3 className="truncate" title={album.title}>{album.title}</h3>
        <div className="text-sm text-[#CCCCCC] flex items-center gap-4">
          <span className="truncate">{album.artist}</span>
          <div className="w-1 h-1 bg-[#2C2C2C] rounded-full flex-shrink-0" />
          <span className="flex-shrink-0">{album.tracks}</span>
          {album.streamCount && (
            <>
              <div className="w-1 h-1 bg-[#2C2C2C] rounded-full flex-shrink-0" />
              <div className="text-sm text-[#CCCCCC] flex items-center gap-1 flex-shrink-0">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l6-5-6-5z"/>
                </svg>
                <span>{album.streamCount}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden py-10 flex flex-col gap-10 w-full h-[666px] bg-[#040507]">
      <FlankDecoration />

      <div className="relative z-20 w-full text-center">
        <h2
          className="mb-8 flex flex-col text-lg"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
          }}
        >
          <span className="text-[#646464]">Top Nigerian Albums</span>
          <span className="text-white">This week</span>
        </h2>
        {error && (
          <p className="text-red-400 text-sm mt-2">
            Could not fetch albums – showing fallback data.
          </p>
        )}
      </div>

      <div className="relative z-20 flex justify-center items-center gap-[33px]">
        {loading ? (
          [...Array(3)].map((_, i) => <AlbumSkeleton key={i} />)
        ) : albums.length > 0 ? (
          albums.map((album, i) => <AlbumCard key={album.id} album={album} index={i} />)
        ) : (
          // This should *never* render but is a final fallback
          fallbackAlbums.map((album, i) => <AlbumCard key={album.id} album={album} index={i} />)
        )}
      </div>
    </section>
  );
}