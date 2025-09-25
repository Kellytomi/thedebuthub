"use client";

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical images
    const preloadCriticalImages = () => {
      const criticalImages = [
        '/images/album1.png',
        '/images/album2.png', 
        '/images/album3.png',
        '/images/tdh-logo.svg'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize third-party scripts loading
    const optimizeThirdPartyScripts = () => {
      // Defer YouTube loading until interaction
      const deferYouTube = () => {
        const scripts = document.querySelectorAll('script[src*="youtube.com"]');
        scripts.forEach(script => {
          if (script instanceof HTMLScriptElement) {
            script.defer = true;
          }
        });
      };
      deferYouTube();
    };

    // Add passive event listeners optimization
    const addPassiveListeners = () => {
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (['touchstart', 'touchmove', 'wheel', 'mousewheel'].includes(type)) {
          if (typeof options === 'boolean') {
            options = { passive: true, capture: options };
          } else if (typeof options === 'object' && options !== null) {
            options.passive = options.passive !== false;
          } else {
            options = { passive: true };
          }
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    };

    preloadCriticalImages();
    optimizeThirdPartyScripts();
    addPassiveListeners();


    return () => {
      // Clean up any observers if needed
    };
  }, []);

  return null;
}