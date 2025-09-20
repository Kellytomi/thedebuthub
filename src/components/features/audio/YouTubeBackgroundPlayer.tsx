"use client";

import { useEffect, useRef, useState } from 'react';

// YouTube API type declarations
type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getPlayerState: () => number;
  destroy: () => void;
};

type YouTubePlayerEvent = {
  target: YouTubePlayer;
  data: number;
};

type YouTubeAPI = {
  Player: new (element: HTMLElement, config: any) => YouTubePlayer;
  PlayerState: {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  };
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}
import { useAudio } from '@/contexts/AudioContext';

// Global player instance for external access
let globalYouTubePlayer: YouTubePlayer | null = null;

export default function YouTubeBackgroundPlayer() {
  const { isMuted, hasUserInteracted, pendingUnmute } = useAudio();
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isAPILoaded, setIsAPILoaded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const hasInitialized = useRef(false);

  // Hydration guard
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!hasMounted || hasInitialized.current) return;

    const loadYouTubeAPI = () => {
      // Check if API is already loaded
      if (window.YT && window.YT.Player) {
        setIsAPILoaded(true);
        return;
      }

      // Check if script is already in DOM
      if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        // Script exists, wait for it to load
        const checkAPI = setInterval(() => {
          if (window.YT && window.YT.Player) {
            setIsAPILoaded(true);
            clearInterval(checkAPI);
          }
        }, 100);
        return;
      }

      // Load the API script
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      
      // Set up unique callback to avoid conflicts
      const callbackName = `onYouTubeIframeAPIReady_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store previous callback if it exists
      const previousCallback = window.onYouTubeIframeAPIReady;
      
      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube IFrame API Ready');
        setIsAPILoaded(true);
        
        // Restore previous callback if it existed
        if (previousCallback && typeof previousCallback === 'function') {
          previousCallback();
        }
      };

      document.head.appendChild(script);
    };

    loadYouTubeAPI();
    hasInitialized.current = true;

    return () => {
      // Cleanup global callback
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = undefined;
      }
      
      // Cleanup player
      if (globalYouTubePlayer && typeof globalYouTubePlayer.destroy === 'function') {
        try {
          globalYouTubePlayer.destroy();
          globalYouTubePlayer = null;
        } catch (error) {
          console.warn('Error destroying YouTube player:', error);
        }
      }
      
      // Remove script if we added it
      const script = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (script) {
        script.remove();
      }
    };
  }, [hasMounted]);

  // Initialize YouTube Player when API is loaded
  useEffect(() => {
    if (!isAPILoaded || !window.YT || !window.YT.Player || !playerRef.current) return;

    const initializePlayer = () => {
      try {
        const player = new window.YT!.Player(playerRef.current!, {
          videoId: 'IWXV5eFeGy8', // Afrobeats mix video ID
          width: '1',
          height: '1',
          playerVars: {
            autoplay: 1,
            mute: 1, // Start muted for autoplay compliance
            loop: 1,
            playlist: 'IWXV5eFeGy8', // Required for looping
            controls: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: YouTubePlayerEvent) => {
              console.log('YouTube Background Player Ready');
              globalYouTubePlayer = event.target;
              setIsPlayerReady(true);
              
              // Set volume low for background music
              event.target.setVolume(15); // 15% volume
              
              // Ensure it starts muted (browser compliance)
              event.target.mute();
              
              // Start playing (muted initially)
              event.target.playVideo();
              
              console.log('🔇 YouTube player initialized - muted and ready for user interaction');
            },
            onStateChange: (event: YouTubePlayerEvent) => {
              const states: { [key: number]: string } = {
                '-1': 'unstarted',
                '0': 'ended',
                '1': 'playing',
                '2': 'paused',
                '3': 'buffering',
                '5': 'cued'
              };
              console.log('YouTube Player State:', states[event.data] || event.data);
              
              // Ensure continuous playback
              if (event.data === window.YT!.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
            onError: (event: YouTubePlayerEvent) => {
              console.error('YouTube Player Error:', event.data);
              const errorMessages: { [key: number]: string } = {
                2: 'Invalid video ID',
                5: 'HTML5 player error',
                100: 'Video not found',
                101: 'Video not allowed in embedded players',
                150: 'Video not allowed in embedded players'
              };
              console.error('Error details:', errorMessages[event.data] || 'Unknown error');
            }
          }
        });
      } catch (error) {
        console.error('Failed to initialize YouTube player:', error);
      }
    };

    initializePlayer();
  }, [isAPILoaded]);

  // Handle mute/unmute from external button
  useEffect(() => {
    if (!isPlayerReady || !globalYouTubePlayer) return;

    try {
      if (isMuted) {
        globalYouTubePlayer.mute();
        console.log('🔇 YouTube background music MUTED');
      } else {
        // For unmuting, we need to ensure it's from a valid user interaction
        console.log('🔊 Attempting to unmute YouTube background music...');
        
        // First unmute
        globalYouTubePlayer.unMute();
        
        // Then ensure it's playing
        globalYouTubePlayer.playVideo();
        
        // Double-check the mute state and volume
        setTimeout(() => {
          if (globalYouTubePlayer) {
            const isMutedState = globalYouTubePlayer.isMuted();
            const volume = globalYouTubePlayer.getVolume();
            const playerState = globalYouTubePlayer.getPlayerState();
            
            console.log('🎵 YouTube Player Status:', {
              isMuted: isMutedState,
              volume: volume,
              state: playerState,
              stateText: playerState === 1 ? 'playing' : playerState === 2 ? 'paused' : 'other'
            });
            
            if (isMutedState) {
              console.warn('⚠️ YouTube player is still muted - browser may be blocking programmatic unmute');
              console.log('💡 User will need to click the mute button manually');
            } else {
              console.log('✅ YouTube background music successfully unmuted and playing!');
            }
          }
        }, 500);
      }
    } catch (error) {
      console.warn('Error controlling YouTube player mute:', error);
    }
  }, [isMuted, isPlayerReady]);

  // Prevent hydration mismatch by only rendering after client mount
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* Hidden YouTube Player Container */}
      <div 
        className="fixed -top-[200px] -left-[200px] w-[1px] h-[1px] overflow-hidden pointer-events-none"
        style={{ visibility: 'hidden', opacity: 0 }}
      >
        <div ref={playerRef} />
      </div>

      {/* Development Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50">
          <div>YouTube API: {isAPILoaded ? '✅' : '❌'}</div>
          <div>Player Ready: {isPlayerReady ? '✅' : '❌'}</div>
          <div>User Interacted: {hasUserInteracted ? '✅' : '❌'}</div>
          <div>Pending Unmute: {pendingUnmute ? '⏳' : '❌'}</div>
          <div>Muted: {isMuted ? '🔇' : '🔊'}</div>
          <div>Global Player: {globalYouTubePlayer ? '✅' : '❌'}</div>
          {!isMuted && isPlayerReady && hasUserInteracted && !pendingUnmute && (
            <div className="text-green-400 font-bold mt-1">🎵 Afrobeats Playing!</div>
          )}
          {pendingUnmute && isPlayerReady && (
            <div className="text-orange-400 font-bold mt-1">👆 Click anywhere to start music!</div>
          )}
          {isMuted && isPlayerReady && !pendingUnmute && (
            <div className="text-yellow-400 font-bold mt-1">👆 Click mute button to play music</div>
          )}
          {!hasUserInteracted && isPlayerReady && (
            <div className="text-blue-400 font-bold mt-1">👆 Click anywhere or scroll to activate</div>
          )}
        </div>
      )}
    </>
  );
}

// Export global player instance for external control
export const getYouTubePlayer = () => globalYouTubePlayer; 