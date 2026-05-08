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

    preloadCriticalImages();
    optimizeThirdPartyScripts();
  }, []);

  return null;
}
