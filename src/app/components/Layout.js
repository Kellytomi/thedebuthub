"use client";

import Image from "next/image";
import { useAudio } from "../contexts/AudioContext";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { isMuted, toggleMute, hasUserInteracted, pendingUnmute } = useAudio();

  return (
    <div className="min-h-screen">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/grid-layers.svg"
          alt="grid pattern background"
          width={36}
          height={39}
          priority
          style={{
            position: "absolute",
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Header Navigation */}
      <div className="fixed top-4 sm:top-8 left-0 right-0 z-50 ">
        <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto ">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/The Debut Hub.png"
              alt="The Debut Hub Logo"
              width={48}
              height={52}
              priority
              className="w-9 h-10 sm:w-12 sm:h-14 object-contain"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Volume/Mute Button */}
            <button
              onClick={toggleMute}
              className={`relative overflow-hidden transition-all duration-200 ${
                isMuted
                  ? pendingUnmute
                    ? "text-orange-400 hover:text-orange-300"
                    : "text-white/50 hover:text-white/70"
                  : "text-green-400 hover:text-green-300"
              }`}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                background: isMuted
                  ? pendingUnmute
                    ? `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(251, 146, 60, 0.15) 100%)`
                    : `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`
                  : `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(34, 197, 94, 0.15) 100%)`,
                boxShadow: isMuted
                  ? pendingUnmute
                    ? "0px 2px 7px 0px rgba(251, 146, 60, 0.3)"
                    : "0px 2px 7px 0px rgba(87, 87, 87, 0.17)"
                  : "0px 2px 7px 0px rgba(34, 197, 94, 0.3)",
                padding: "8px",
              }}
              aria-label={
                isMuted
                  ? "Click to play Afrobeats background music"
                  : "Mute Afrobeats background music"
              }
              title={
                pendingUnmute
                  ? "🎵 Click anywhere to start Afrobeats music!"
                  : isMuted
                  ? hasUserInteracted
                    ? "🎵 Click to unmute Afrobeats music"
                    : "🎵 Music will auto-start when you interact with the page"
                  : "🔇 Click to mute music"
              }
            >
              {/* Border gradient overlay */}
              <div
                className="absolute inset-0 rounded-md p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #242424 0%, #070707 100%)",
                  zIndex: -1,
                }}
              >
                <div
                  className="w-full h-full rounded-md"
                  style={{
                    background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                  }}
                />
              </div>

              {/* Volume Icon */}
              {isMuted ? (
                pendingUnmute ? (
                  <svg
                    className="w-4 h-4 animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 opacity-60"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                )
              ) : (
                <svg
                  className="w-4 h-4 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            {/* Subscribe Button - Links to Twitter */}
            <a
              href="https://twitter.com/thedebuthub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white font-medium relative overflow-hidden text-xs sm:text-sm px-3 py-2 sm:px-4 rounded-md h-8 sm:h-9 font-dm-sans inline-flex items-center justify-center transition-colors duration-200"
              style={{
                background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                boxShadow: "0px 2px 7px 0px rgba(87, 87, 87, 0.17)",
              }}
            >
              {/* Border gradient overlay */}
              <div
                className="absolute inset-0 rounded-md p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #242424 0%, #070707 100%)",
                  zIndex: -1,
                }}
              >
                <div
                  className="w-full h-full rounded-md"
                  style={{
                    background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                  }}
                />
              </div>
              Subscribe
            </a>
          </div>

        </div>
      </div>

      {/* Content */}
      <div>
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}