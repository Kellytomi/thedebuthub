"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FlankDecoration from "./FlankDecoration";

// Simple hash function to generate consistent pseudo-random numbers
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Function to convert popularity score to estimated stream count
const formatStreamCount = (popularity, albumName = '') => {
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
  
  // Use consistent pseudo-random factor based on album name
  const hashValue = simpleHash(albumName || 'default');
  const consistentFactor = 0.85 + ((hashValue % 100) / 100) * 0.3; // Consistent 0.85-1.15 range
  const streams = Math.floor(baseStreams * consistentFactor);
  
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
    streamCount: formatStreamCount(89, "Love, Damini"),
  },
  {
    id: 2,
    title: "Made in Lagos",
    artist: "Wizkid",
    cover: "/images/album1.png",
    tracks: "14 tracks",
    popularity: 92,
    streamCount: formatStreamCount(92, "Made in Lagos"),
  },
  {
    id: 3,
    title: "A Better Time",
    artist: "Davido",
    cover: "/images/album2.png",
    tracks: "17 tracks",
    popularity: 85,
    streamCount: formatStreamCount(85, "A Better Time"),
  },
];

export default function TopAlbumsSection() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMostStreamedAlbums = async () => {
      try {
        console.log("🇳🇬 Fetching top albums from Nigeria's official charts...");
        const res = await fetch("/api/spotify/albums/most-streamed?limit=3");

        if (!res.ok) throw new Error("Failed to fetch Nigeria Top 50 chart data");

        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          console.warn("Failed to parse JSON. Using fallback.");
          throw new Error("Invalid JSON");
        }

        if (data.success || data.fallback) {
          console.log("🎯 Nigeria Chart Data API Response:", data);
          
          const transformed = data.albums?.map((album, i) => {
            // Ensure popularity is available for stream count calculation
            const popularity = album.popularity || 85;
            
            console.log(`🏆 #${i + 1} Chart Position: ${album.artist} - ${album.name} (${album.tracksInTop50 || 'unknown'} tracks in Top 50, popularity: ${popularity})`);
            console.log(`🖼️  Image URL received: ${album.image}`);
            
            const coverImage = album.image || fallbackAlbums[i]?.cover;
            console.log(`🖼️  Final cover image: ${coverImage}`);
            
            return {
              id: album.id || i + 1,
              title: album.name || `Album ${i + 1}`,
              artist: album.artist || "Unknown Artist",
              cover: coverImage,
              tracks: album.total_tracks ? `${album.total_tracks} tracks` : "Tracks unknown",
              popularity: popularity,
              streamCount: formatStreamCount(popularity, album.name || `Album ${i + 1}`),
              spotifyUrl: album.external_urls?.spotify ?? "#",
            };
          }) || [];

          if (transformed.length === 0) throw new Error("Empty transformed array");

          console.log("✅ Successfully loaded Nigeria chart albums:", transformed.map(a => `${a.artist} - ${a.title}`));
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
            streamCount: formatStreamCount(95, "Love, Damini"),
          },
          {
            id: 2,
            title: "Twice As Tall",
            artist: "Burna Boy",
            cover: "/images/album2.png", // Twice As Tall = album2.png
            tracks: "15 tracks",
            popularity: 92,
            streamCount: formatStreamCount(92, "Twice As Tall"),
          },
          {
            id: 3,
            title: "Made in Lagos",
            artist: "Wizkid",
            cover: "/images/album1.png", // Made in Lagos = album1.png
            tracks: "14 tracks",
            popularity: 90,
            streamCount: formatStreamCount(90, "Made in Lagos"),
          }
        ];
        
        console.log("🔄 Using enhanced fallback data for Nigeria chart rankings");
        setAlbums(enhancedFallbacks);
      } finally {
        setLoading(false);
      }
    };

    fetchMostStreamedAlbums();
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
      <div className="relative w-full h-[350px] overflow-hidden rounded-md border border-white">
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
          <span className="text-[#646464]">Top Albums Nigeria</span>
          <span className="text-white">From Official Charts</span>
        </h2>
        {error && (
          <p className="text-red-400 text-sm mt-2">
            Could not fetch Nigeria's Top 50 chart data – showing fallback rankings.
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