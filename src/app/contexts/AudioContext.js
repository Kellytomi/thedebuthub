"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true); // Start muted to match YouTube's initial state
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [pendingUnmute, setPendingUnmute] = useState(false); // Track if we want to unmute but need a direct click

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    setPendingUnmute(false); // Clear pending state when user manually toggles
    console.log("YouTube background music", newMuteState ? "muted" : "unmuted");
  };

  // Handle first user interaction - mark as interacted but don't auto-unmute yet
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFirstInteraction = (event) => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        
        // If it's a direct click, we can safely unmute immediately
        if (event.type === 'click') {
          setIsMuted(false);
          console.log("🎵 User clicked - Auto-starting Afrobeats background music!");
        } else {
          // For scroll/keydown, set pending unmute (requires next click)
          setPendingUnmute(true);
          console.log("🎵 User interacted - Music will start on next click!");
        }
        
        // Remove listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    // Listen for various user interactions
    document.addEventListener('click', handleFirstInteraction, { passive: true });
    document.addEventListener('scroll', handleFirstInteraction, { passive: true });
    document.addEventListener('keydown', handleFirstInteraction, { passive: true });
    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasUserInteracted]);

  // Handle pending unmute on next click
  useEffect(() => {
    if (!pendingUnmute) return;

    const handleClickForUnmute = () => {
      if (pendingUnmute && isMuted) {
        setIsMuted(false);
        setPendingUnmute(false);
        console.log("🎵 Click detected - Starting Afrobeats background music!");
        document.removeEventListener('click', handleClickForUnmute);
      }
    };

    document.addEventListener('click', handleClickForUnmute, { passive: true });

    return () => {
      document.removeEventListener('click', handleClickForUnmute);
    };
  }, [pendingUnmute, isMuted]);

  return (
    <AudioContext.Provider value={{ isMuted, setIsMuted, toggleMute, hasUserInteracted, pendingUnmute }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
} 