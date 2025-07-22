'use client';

import { useState, useRef } from 'react';
import AlbumCard from './AlbumCard';

export default function TopAlbumsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const topAlbums = [
    {
      id: 1,
      title: "You'll be alright, kid (Chapter 1)",
      artist: "Alex Warren",
      tracks: "24 Tracks",
      imageUrl: "/placeholder-album-1.jpg",
      year: "2024"
    },
    {
      id: 2,
      title: "Manchild",
      artist: "Sabrina Carpenter", 
      tracks: "12 Tracks",
      imageUrl: "/placeholder-album-2.jpg",
      year: "2023"
    },
    {
      id: 3,
      title: "Love, Damini",
      artist: "Burna Boy",
      tracks: "21 Tracks",
      imageUrl: "/placeholder-album-3.jpg", 
      year: "2024"
    },
    {
      id: 4,
      title: "SOS",
      artist: "SZA",
      tracks: "23 Tracks",
      imageUrl: "/placeholder-album-4.jpg", 
      year: "2024"
    },
    {
      id: 5,
      title: "Un Verano Sin Ti",
      artist: "Bad Bunny",
      tracks: "23 Tracks",
      imageUrl: "/placeholder-album-5.jpg", 
      year: "2024"
    }
  ];

  const scrollToSlide = (index) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const cardWidth = 370 + 32; // card width + gap
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % topAlbums.length;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? topAlbums.length - 1 : currentIndex - 1;
    scrollToSlide(prevIndex);
  };

  return (
    <section 
      className="relative overflow-hidden mx-auto"
      style={{
        width: '100%',
        maxWidth: '1440px',
        height: '666px',
        backgroundColor: '#040507'
      }}
    >
      {/* Grid Pattern Background (subtle) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)
          `,
          backgroundSize: '81.37px 80.23px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            className="text-white/80 mb-2"
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              fontSize: '36px',
              fontWeight: '400'
            }}
          >
            Top albums
          </h2>
          <h3 
            className="text-white/80"
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              fontSize: '42px',
              fontWeight: '600'
            }}
          >
            This Week
          </h3>
        </div>
        
        {/* Carousel Container */}
        <div className="relative w-full max-w-6xl">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110"
            style={{ marginLeft: '-60px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110"
            style={{ marginRight: '-60px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Albums Carousel */}
          <div 
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {topAlbums.map((album) => (
              <div key={album.id} className="flex-shrink-0">
                <AlbumCard album={album} />
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {topAlbums.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 