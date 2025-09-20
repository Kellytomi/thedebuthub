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