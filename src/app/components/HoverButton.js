'use client';

import { useState } from 'react';

export default function HoverButton({ 
  children, 
  onClick, 
  className = '',
  style = {},
  ariaLabel,
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={style}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Animated border gradient */}
      <div 
        className={`absolute inset-0 rounded-md transition-all duration-500 ${
          isHovered ? 'animate-pulse' : ''
        }`}
        style={{
          background: isHovered 
            ? 'linear-gradient(45deg, #338AFF, #006DFF, #003883, #338AFF)'
            : 'linear-gradient(180deg, #242424 0%, #070707 100%)',
          backgroundSize: isHovered ? '300% 300%' : '100% 100%',
          animation: isHovered ? 'gradient-shift 2s ease infinite' : 'none',
          zIndex: -1
        }}
      />
      
      {/* Content background */}
      <div 
        className="w-full h-full rounded-md relative z-10"
        style={{
          background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
          margin: '1px'
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </button>
  );
} 