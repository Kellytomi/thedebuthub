/**
 * Type definitions for The Debut Hub application
 */

export interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: SpotifyExternalUrls;
  followers?: {
    total: number;
  };
  genres?: string[];
  images?: SpotifyImage[];
  popularity?: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album_type: 'album' | 'single' | 'compilation';
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  external_urls: SpotifyExternalUrls;
  popularity?: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  preview_url?: string;
  external_urls: SpotifyExternalUrls;
  popularity?: number;
}

// Sanity Article Types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote';
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: 'link';
    _key: string;
    href: string;
  }>;
}

export interface SanityCodeBlock {
  _type: 'code';
  _key: string;
  code: string;
  language: string;
}

export interface SanityImageBlock {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export type SanityBlockContent = SanityBlock | SanityCodeBlock | SanityImageBlock;

export interface SanityArticle {
  _id: string;
  _type: 'article';
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  body: SanityBlockContent[];
  mainImage: SanityImage;
  publishedAt: string;
  category: string;
  author: string;
  featured?: boolean;
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  estimatedReadingTime?: number;
}

// Legacy Article interface for backward compatibility
export interface Article {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  image: string;
  date: string;
  category: string;
  author: string;
  slug: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
  timestamp?: number;
}

export interface AlbumCardData {
  id: string;
  title: string;
  artist: string;
  cover: string;
  tracks: string;
  popularity: number;
  spotifyUrl?: string;
}

export interface TrackCardData {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  spotifyUrl?: string;
  previewUrl?: string;
  popularity?: number;
}

export interface ArtistData {
  id: string;
  name: string;
  image: string;
  fallback: string;
  followers?: number;
  popularity?: number;
  external_urls?: SpotifyExternalUrls;
  genres?: string[];
}