"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TopAlbumsSection() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchNigerianAlbums();
    }
  }, [isClient]);

  const fetchNigerianAlbums = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/spotify/albums?limit=3');
      const data = await response.json();
      
      if (data.success || data.fallback) {
        // Transform Spotify data to match our component structure
        const transformedAlbums = data.albums.map((album, index) => ({
          id: album.id || index + 1,
          title: album.name,
          artist: album.artist,
          cover: album.image || `/images/album${index + 1}.png`,
          tracks: `${album.total_tracks} tracks`,
          spotifyUrl: album.external_urls?.spotify
        }));
        setAlbums(transformedAlbums);
      } else {
        setError(data.error || 'Failed to fetch albums');
      }
    } catch (err) {
      console.error('Error fetching Nigerian albums:', err);
      setError('Failed to load albums');
      // Fallback to static data on error
      setAlbums([
        {
          id: 1,
          title: "Love, Damini",
          artist: "Burna Boy",
          cover: "/images/album3.png",
          tracks: "19 tracks",
        },
        {
          id: 2,
          title: "Made in Lagos",
          artist: "Wizkid",
          cover: "/images/album1.png",
          tracks: "14 tracks",
        },
        {
          id: 3,
          title: "A Better Time",
          artist: "Davido",
          cover: "/images/album2.png",
          tracks: "17 tracks",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton component
  const AlbumSkeleton = () => (
    <div className="flex flex-col w-[370px] h-[418px] gap-2">
      <div className="w-[370px] h-[350px] bg-gray-800 animate-pulse rounded-lg"></div>
      <div className="text-[20px] flex flex-col gap-1">
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
          className="mb-8 text-lg flex flex-col"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
          }}
        >
          <span style={{ color: "#646464" }}>Top Nigerian Albums</span>{" "}
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
            <AlbumSkeleton key={index} />
          ))
        ) : (
          // Show albums
          albums.map((album, index) => (
            <div key={album.id} className="group cursor-pointer">
              <div className="flex flex-col w-[370px] h-[418px] gap-2">
                <div className="relative overflow-hidden rounded-lg border-2 border-white/100">
                  <Image
                    src={album.cover}
                    alt={album.title}
                    width={370}
                    height={350}
                    className="transition-transform duration-300 group-hover:scale-105 w-full h-full object-cover"
                    style={{
                      backgroundColor: "#1a1a1a"
                    }}
                    onError={(e) => {
                      // Fallback to local images if Spotify image fails
                      e.target.src = `/images/album${index + 1}.png`;
                    }}
                  />
                  
                  {/* Hover Effect - Clickable Area */}
                  {album.spotifyUrl && album.spotifyUrl !== '#' && (
                    <a
                      href={album.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg"
                      aria-label={`View ${album.title} on Spotify`}
                    />
                  )}
                </div>
                
                <div className="text-[20px] flex flex-col gap-1">
                  <h3 className="text-white font-medium truncate" title={album.title}>
                    {album.title}
                  </h3>
                  <div className="text-[14px] text-[#CCCCCC] flex gap-4 items-center">
                    <span className="truncate">{album.artist}</span>
                    <div className="w-1 h-1 rounded-full bg-[#2C2C2C] flex-shrink-0" />
                    <span className="flex-shrink-0">{album.tracks}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
