/**
 * Application constants and configuration
 */

// UI Constants
export const CARD_DIMENSIONS = {
  ALBUM: {
    width: 370,
    height: 400,
    aspectRatio: '370/350'
  },
  TRACK: {
    width: 370,
    height: 418,
    aspectRatio: '370/350'
  }
} as const;

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px'
} as const;

// API Constants
export const API_ENDPOINTS = {
  SPOTIFY_ALBUMS: '/api/spotify/albums',
  SPOTIFY_TRACKS: '/api/spotify/tracks',
  SPOTIFY_ARTISTS: '/api/spotify/artists',
  ARTICLES: '/api/articles'
} as const;

export const API_LIMITS = {
  ALBUMS: 3,
  TRACKS: 3,
  ARTISTS: 7,
  ARTICLES: 15,
  MAX_LIMIT: 50
} as const;

// Colors
export const COLORS = {
  PRIMARY: '#006DFF',
  BACKGROUND: '#040507',
  CARD_BORDER: '#FFDDB2',
  TEXT_SECONDARY: '#CCCCCC',
  ERROR: '#ef4444'
} as const;

// Nigerian Artists
export const NIGERIAN_ARTISTS = [
  'Burna Boy', 'Wizkid', 'Davido', 'Tiwa Savage', 'Yemi Alade',
  'Mr Eazi', 'Tekno', 'Ruger', 'Omah Lay', 'Joeboy',
  'Fireboy DML', 'Rema', 'Asake', 'Kizz Daniel', 'Ayra Starr'
] as const;

// Fallback Images
export const FALLBACK_IMAGES = {
  ALBUM_1: '/images/album1.png',
  ALBUM_2: '/images/album2.png',
  ALBUM_3: '/images/album3.png',
  TRACK_1: '/images/album1.png',
  TRACK_2: '/images/album2.png',
  TRACK_3: '/images/album3.png',
  ARTIST_REMA: '/images/rema-image.png',
  ARTIST_WIZKID: '/images/wiz-image.png',
  ARTIST_DAVIDO: '/images/david-image.png',
  PLACEHOLDER: '/images/placeholder.svg'
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  CAROUSEL: 4000
} as const;

// Font Families
export const FONTS = {
  HEADING: "'Montserrat', sans-serif",
  SCRIPT: "'Dancing Script', cursive",
  BODY: "'DM Sans', sans-serif"
} as const;