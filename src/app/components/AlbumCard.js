'use client';

import Image from 'next/image';

export default function AlbumCard({ album }) {
  // Different background gradients for each album to simulate real album covers
  const getAlbumBackground = (albumId) => {
    switch(albumId) {
      case 1:
        return 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'; // Space/night theme
      case 2:
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)'; // Colorful/pop theme
      case 3:
        return 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'; // Warm/celebration theme
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <div 
      className="group cursor-pointer transition-transform hover:scale-105"
      style={{
        width: '370px',
        height: '350px'
      }}
    >
      {/* Album Cover */}
      <div 
        className="relative overflow-hidden mb-4"
        style={{
          width: '370px',
          height: '280px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: getAlbumBackground(album.id)
        }}
      >
        {/* Album Art Placeholder/Mock */}
        <div className="absolute inset-0 flex items-center justify-center">
          {album.id === 1 && (
            // Moon/Space theme for "You'll be alright, kid"
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
              <div className="relative z-10 text-center">
                <div className="w-32 h-32 bg-yellow-100 rounded-full mx-auto mb-4 shadow-2xl"></div>
                <div className="text-white/80 text-sm">✨ Space Theme ✨</div>
              </div>
            </div>
          )}
          
          {album.id === 2 && (
            // Performance theme for "Manchild"
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
              <div className="relative z-10 text-center text-white/80">
                <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <div className="text-sm">🎤 Performance</div>
              </div>
            </div>
          )}
          
          {album.id === 3 && (
            // Celebration theme for "Love, Damini"
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
              <div className="relative z-10 text-center text-white/80">
                <div className="text-4xl mb-2">🎂</div>
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-sm">Celebration</div>
              </div>
            </div>
          )}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <button 
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
            aria-label={`Play ${album.title} by ${album.artist}`}
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Album Info */}
      <div className="text-left">
        <h4 
          className="font-medium text-white text-lg mb-1 truncate"
          style={{ 
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '18px',
            lineHeight: '1.2'
          }}
        >
          {album.title}
        </h4>
        <p 
          className="text-white/60 text-sm"
          style={{ 
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px'
          }}
        >
          {album.tracks} • {album.artist}
        </p>
      </div>
    </div>
  );
} 