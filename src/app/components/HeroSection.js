'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // This will be used later when background music is implemented
    console.log('Background music', isMuted ? 'unmuted' : 'muted');
  };

  return (
    <section 
      className="relative overflow-hidden mx-auto"
      style={{
        width: '100%',
        maxWidth: '1440px',
        height: '1024px',
        backgroundColor: '#030303'
      }}
    >
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '81.37px 80.23px'
        }}
      />

      {/* Header Navigation */}
      <div className="absolute top-8 left-0 right-0 z-20">
        <div className="flex justify-between items-center px-12">
          {/* Logo */}
          <div 
            className="flex items-center"
            style={{
              width: '36px',
              height: '39px'
            }}
          >
            <Image 
              src="/The Debut Hub.png"
              alt="The Debut Hub Logo"
              width={36}
              height={39}
              priority
              style={{ width: '36px', height: '39px', objectFit: 'contain' }}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Volume/Mute Button */}
            <button 
              onClick={toggleMute}
              className="text-white/70 hover:text-white relative overflow-hidden transition-colors"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                boxShadow: '0px 2px 7px 0px rgba(87, 87, 87, 0.17)',
                padding: '8px'
              }}
              aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
            >
              {/* Border gradient overlay */}
              <div 
                className="absolute inset-0 rounded-md p-px"
                style={{
                  background: 'linear-gradient(180deg, #242424 0%, #070707 100%)',
                  zIndex: -1
                }}
              >
                <div 
                  className="w-full h-full rounded-md"
                  style={{
                    background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`
                  }}
                />
              </div>
              
              {/* Volume Icon */}
              {isMuted ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>

            {/* Subscribe Button */}
            <button 
              className="text-white/70 hover:text-white font-medium relative overflow-hidden"
              style={{
                width: '100px',
                height: '32px',
                borderRadius: '6px',
                background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                boxShadow: '0px 2px 7px 0px rgba(87, 87, 87, 0.17)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                padding: '8px 16px'
              }}
            >
              {/* Border gradient overlay */}
              <div 
                className="absolute inset-0 rounded-md p-px"
                style={{
                  background: 'linear-gradient(180deg, #242424 0%, #070707 100%)',
                  zIndex: -1
                }}
              >
                <div 
                  className="w-full h-full rounded-md"
                  style={{
                    background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`
                  }}
                />
              </div>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        {/* Tagline */}
        <h2 
          className="mb-8 text-lg"
          style={{ 
            fontFamily: "'Dancing Script', cursive",
            fontSize: '24px'
          }}
        >
          <span style={{ color: '#646464' }}>Your</span> <span className="text-white">Sound,</span> <span style={{ color: '#646464' }}>Your</span> <span className="text-white">Story,</span> <span style={{ color: '#646464' }}>Your</span> <span className="text-white">Stage</span>
        </h2>

        {/* Main Title */}
        <h1 
          className="text-white font-bold mb-8"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: '1.1',
            letterSpacing: '-2px'
          }}
        >
          The Debut Hub
        </h1>

        {/* Description */}
        <p 
          className="text-white/70 mb-16 max-w-4xl"
          style={{ 
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '18px',
            lineHeight: '1.6'
          }}
        >
          Explore trending music charts, breaking news, and tools to elevate your sound, all in one hub.
        </p>

        {/* Artist Images Layout */}
        <div className="relative mb-12">
          {/* Left smaller artist image */}
          <div 
            className="absolute hidden lg:block"
            style={{ 
              top: '0px', 
              left: '-300px',
              width: '180px',
              height: '240px'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                <div className="text-white/60">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Center main artist image */}
          <div 
            className="relative"
            style={{ 
              width: '400px',
              height: '500px'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 rounded-lg overflow-hidden relative">
              {/* Blue glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-blue-400/20" />
              
              {/* Artist placeholder */}
              <div className="w-full h-full flex items-center justify-center text-white/80">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>

            {/* Hot News Badge */}
            <div 
              className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full flex items-center justify-center"
              style={{
                width: '80px',
                height: '80px'
              }}
            >
              <div className="text-xs font-bold text-center leading-tight">
                <div>hot</div>
                <div>news</div>
                <div>only</div>
              </div>
            </div>
          </div>

          {/* Right smaller artist image */}
          <div 
            className="absolute hidden lg:block"
            style={{ 
              top: '80px', 
              right: '-280px',
              width: '200px',
              height: '260px'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-black/20 flex items-center justify-center">
                <div className="text-white/80">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore More News Button */}
        <div className="relative">
          <button
            className="text-white font-semibold relative overflow-hidden hover:scale-105 transition-transform"
            style={{
              width: '220px',
              height: '50px',
              borderRadius: '6px',
              background: 'linear-gradient(180deg, #006DFF 0%, #004199 100%)',
              boxShadow: '0px 2px 7px 0px rgba(87, 87, 87, 0.17)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              padding: '8px 16px'
            }}
          >
            {/* Border gradient overlay */}
            <div 
              className="absolute inset-0 rounded-md p-px"
              style={{
                background: 'linear-gradient(180deg, #338AFF 0%, #003883 100%)',
                zIndex: -1
              }}
            >
              <div 
                className="w-full h-full rounded-md"
                style={{
                  background: 'linear-gradient(180deg, #006DFF 0%, #004199 100%)'
                }}
              />
            </div>
            Explore more news
          </button>
        </div>
      </div>
    </section>
  );
} 