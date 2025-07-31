"use client";

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical images when component mounts
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
          script.defer = true;
        });
      };
      deferYouTube();
    };

    // Add passive event listeners optimization
    const addPassiveListeners = () => {
      // Override addEventListener for touch events to be passive by default
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

    // Implement performance optimizations
    preloadCriticalImages();
    optimizeThirdPartyScripts();
    addPassiveListeners();

    // Web Vitals tracking (optional, for debugging)
    if (process.env.NODE_ENV === 'development') {
      const reportWebVitals = (metric) => {
        console.log('[Performance]', metric.name, metric.value);
      };

      // Simplified Web Vitals tracking
      if (typeof window !== 'undefined' && 'performance' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              reportWebVitals({ name: 'LCP', value: entry.startTime });
            }
            if (entry.entryType === 'first-input') {
              reportWebVitals({ name: 'FID', value: entry.processingStart - entry.startTime });
            }
          });
        });

        try {
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        } catch (e) {
          // Fallback for browsers that don't support these metrics
        }
      }
    }

    // Cleanup function
    return () => {
      // Clean up any observers if needed
    };
  }, []);

  return null; // This component doesn't render anything
} 