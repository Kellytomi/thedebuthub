"use client";

import { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";

export default function TopTracksSection() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchNigerianTracks();
    }
  }, [isClient]);

  const fetchNigerianTracks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/spotify/tracks?limit=3');
      const data = await response.json();
      
      if (data.success || data.fallback) {
        // Transform Spotify data to match AlbumCard component structure
        const transformedTracks = data.tracks.map((track, index) => ({
          id: track.id || index + 1,
          title: track.name,
          artist: track.artist,
          cover: track.image || `/images/album${index + 1}.png`,
          duration: track.duration,
          spotifyUrl: track.external_urls?.spotify,
          previewUrl: track.preview_url
        }));
        setTracks(transformedTracks);
      } else {
        setError(data.error || 'Failed to fetch tracks');
      }
    } catch (err) {
      console.error('Error fetching Nigerian tracks:', err);
      setError('Failed to load tracks');
      // Fallback to static data on error
      setTracks([
        {
          id: 1,
          title: "Love",
          artist: "Burna Boy",
          cover: "/images/album3.png",
          duration: "3:45"
        },
        {
          id: 2,
          title: "Essence",
          artist: "Wizkid",
          cover: "/images/album1.png",
          duration: "3:12"
        },
        {
          id: 3,
          title: "Stand Strong",
          artist: "Davido",
          cover: "/images/album2.png",
          duration: "2:55"
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton component
  const TrackSkeleton = () => (
    <div className="group relative flex flex-col w-[370px] h-[418px] gap-2 cursor-pointer">
      <div className="relative w-full h-[350px] overflow-hidden rounded-md">
        <div className="w-full h-full bg-gray-800 animate-pulse rounded-md"></div>
      </div>
      <div className="text-[20px] flex flex-col gap-1 text-white">
        <div className="h-6 bg-gray-700 animate-pulse rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 animate-pulse rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <section
      className="flex flex-col gap-10 relative overflow-hidden py-10"
      style={{
        width: "100%",
        height: "666px",
        backgroundColor: "#040507",
      }}
    >
      <div className="w-full text-center">
        <h2
          className="mb-12 text-lg flex flex-col"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
          }}
        >
          <span style={{ color: "#646464" }}>Top Songs</span>{" "}
          <span className="text-white">This week</span>
        </h2>
        {error && (
          <p className="text-red-400 text-sm mt-2">
            {error} - Showing fallback data
          </p>
        )}
      </div>

      <div className="flex justify-center gap-[33px] items-center h-auto">
        {loading || !isClient ? (
          // Show loading skeletons
          [...Array(3)].map((_, index) => (
            <TrackSkeleton key={index} />
          ))
        ) : (
          // Show tracks
          tracks.map((track) => (
            <AlbumCard
              key={track.id}
              cover={track.cover}
              title={track.title}
              artist={track.artist}
              duration={track.duration}
            />
          ))
        )}
      </div>
    </section>
  );
}