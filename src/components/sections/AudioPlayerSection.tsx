'use client';

import { useState, useRef, useEffect } from 'react';

export default function AudioPlayerSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = [
    {
      id: 1,
      title: "Essence",
      artist: "Wizkid ft. Tems",
      duration: "3:12",
      audioUrl: "/audio/sample-1.mp3" // placeholder
    },
    {
      id: 2,
      title: "Last Last",
      artist: "Burna Boy",
      duration: "2:55",
      audioUrl: "/audio/sample-2.mp3" // placeholder
    },
    {
      id: 3,
      title: "Rush",
      artist: "Ayra Starr",
      duration: "3:05",
      audioUrl: "/audio/sample-3.mp3" // placeholder
    }
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSong = (index: number) => {
    setCurrentSong(index);
    setIsPlaying(false);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Now Playing
          </h2>
          <p className="text-slate-300 text-lg">
            Discover new hits with our randomised playback
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Album Art */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
            </div>

            {/* Track Info and Controls */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-1">
                {playlist[currentSong].title}
              </h3>
              <p className="text-slate-400 mb-4">
                {playlist[currentSong].artist}
              </p>

              {/* Audio Controls */}
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <button
                  onClick={togglePlay}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>

                <span className="text-slate-400 text-sm">
                  {playlist[currentSong].duration}
                </span>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h4 className="text-white font-semibold mb-4">Up Next</h4>
            <div className="space-y-2">
              {playlist.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => changeSong(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSong === index 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-slate-400">{song.artist}</p>
                    </div>
                    <span className="text-sm text-slate-400">{song.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={playlist[currentSong].audioUrl}
          onEnded={() => setIsPlaying(false)}
          preload="none"
        />
      </div>
    </section>
  );
} 