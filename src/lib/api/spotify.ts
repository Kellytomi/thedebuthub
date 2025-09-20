/**
 * Spotify Web API Integration
 * Handles authentication and data fetching for Nigerian/Afrobeats music
 */

import { validateEnvironment } from '../../lib/utils/env-validation';

// Validate environment and get config
const { config, isValid } = validateEnvironment();
const CLIENT_ID = config.SPOTIFY_CLIENT_ID || '';
const CLIENT_SECRET = config.SPOTIFY_CLIENT_SECRET || '';

// Cache for access token
let accessToken: string | null = null;
let tokenExpiry: number | null = null;

// Constants
const NIGERIAN_ARTISTS = [
  'Burna Boy', 'Wizkid', 'Davido', 'Tiwa Savage', 'Yemi Alade',
  'Mr Eazi', 'Tekno', 'Ruger', 'Omah Lay', 'Joeboy',
  'Fireboy DML', 'Rema', 'Asake', 'Kizz Daniel', 'Ayra Starr'
];

/**
 * Get Spotify access token using Client Credentials flow
 */
async function getAccessToken() {
  // Return cached token if still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Spotify credentials not configured. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.');
  }

  const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    // Set expiry to 5 minutes before actual expiry to be safe
    tokenExpiry = Date.now() + ((data.expires_in - 300) * 1000);
    
    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
}

/**
 * Make authenticated request to Spotify API with forced Nigeria market
 */
async function spotifyFetch(endpoint: string, options: any = {}) {
  const token = await getAccessToken();
  
  // Force Nigeria market for all API calls
  let enhancedEndpoint = endpoint;
  const urlParams = new URLSearchParams();
  
  // Extract existing query parameters
  const [baseEndpoint, existingParams] = endpoint.split('?');
  if (existingParams) {
    const existing = new URLSearchParams(existingParams);
    for (const [key, value] of Array.from(existing.entries())) {
      urlParams.set(key, value);
    }
  }
  
  // Force Nigeria market and Nigerian locale
  urlParams.set('market', 'NG');
  urlParams.set('country', 'NG');
  
  // Rebuild endpoint with forced parameters
  enhancedEndpoint = `${baseEndpoint}?${urlParams.toString()}`;
  
  console.log(`🇳🇬 Spotify API call (Nigeria market): ${enhancedEndpoint}`);
  
  const response = await fetch(`https://api.spotify.com/v1${enhancedEndpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept-Language': 'en-NG,en', // Nigerian English preference
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper function to format duration from milliseconds to MM:SS
 */
function formatDuration(durationMs: number): string {
  if (!durationMs || durationMs <= 0) return '0:00';
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get most streamed Nigerian albums from official charts
 */
export async function getMostStreamedNigerianAlbums(limit = 3) {
  try {
    console.log('🇳🇬 Fetching most streamed albums from Top 50 - Nigeria playlist...');
    
    const playlistId = await findNigerianPlaylist();
    if (!playlistId) {
      throw new Error('Could not find accessible Nigeria playlist');
    }
    
    const playlistResponse = await spotifyFetch(`/playlists/${playlistId}/tracks?market=NG&limit=50`);
    
    if (!playlistResponse.items || playlistResponse.items.length === 0) {
      throw new Error('Playlist has no tracks or is empty');
    }
    
    return processAlbumsFromPlaylist(playlistResponse.items, limit);

  } catch (error) {
    console.error('Error fetching most streamed Nigerian albums from charts:', error);
    return getFallbackAlbums(limit);
  }
}

/**
 * Find Nigerian playlist from various search strategies
 */
async function findNigerianPlaylist() {
  const searchTerms = [
    '"Top 50 - Nigeria"',
    'Nigeria Top 50',
    'Afrobeats Hits',
    'Nigeria Music',
    'Nigerian Charts'
  ];
  
  for (const searchTerm of searchTerms) {
    try {
      const playlistSearch = await spotifyFetch(`/search?q=${encodeURIComponent(searchTerm)}&type=playlist&market=NG&limit=15`);
      
      if (playlistSearch.playlists?.items?.length > 0) {
        const officialPlaylist = playlistSearch.playlists.items.find((playlist: any) => {
          if (!playlist?.name) return false;
          const isSpotifyOwned = playlist.owner?.id === 'spotify';
          const hasRelevantName = playlist.name.includes('Top 50') || 
                               playlist.name.includes('Nigeria') || 
                               playlist.name.includes('Afrobeats');
          return isSpotifyOwned && hasRelevantName;
        });
        
        if (officialPlaylist) {
          console.log(`✅ Found official Nigeria playlist: "${officialPlaylist.name}"`);
          return officialPlaylist.id;
        }
        
        const nigeriaPlaylist = playlistSearch.playlists.items.find((playlist: any) => {
          if (!playlist?.name) return false;
          const name = playlist.name.toLowerCase();
          return name.includes('nigeria') || name.includes('afrobeats') || name.includes('naija');
        });
        
        if (nigeriaPlaylist) {
          console.log(`📋 Using Nigeria playlist: "${nigeriaPlaylist.name}"`);
          return nigeriaPlaylist.id;
        }
      }
    } catch (searchError: any) {
      console.warn(`Playlist search failed for "${searchTerm}":`, searchError.message);
    }
  }
  
  // Try fallback playlist IDs
  const fallbackPlaylistIds = [
    '37i9dQZEVXbKY7jLzlJ11V', // Top 50 - Nigeria
    '37i9dQZEVXbNx2OGnb4lSJ', // Afrobeats Hits
    '37i9dQZEVXbMDoHDwVN2tF', // Global Top 50
    '37i9dQZEVXbJNjKfUHPuo1', // Africa Now
  ];
  
  for (const id of fallbackPlaylistIds) {
    try {
      const testResponse = await spotifyFetch(`/playlists/${id}?market=NG`);
      if (testResponse.id) {
        console.log(`✅ Using fallback playlist: "${testResponse.name}"`);
        return id;
      }
    } catch (error: any) {
      console.warn(`Playlist ${id} not accessible:`, error.message);
    }
  }
  
  return null;
}

/**
 * Process albums from playlist tracks
 */
function processAlbumsFromPlaylist(playlistItems: any[], limit: number) {
  const detailedAlbums: any[] = [];
  const seenAlbums = new Set();
  
  for (let i = 0; i < playlistItems.length && detailedAlbums.length < limit; i++) {
    const item = playlistItems[i];
    if (!item.track?.album) continue;
    
    const album = item.track.album;
    if (seenAlbums.has(album.id)) continue;
    seenAlbums.add(album.id);
    
    // Only include full albums (8+ tracks)
    const isFullAlbum = album.total_tracks >= 8 && 
      (album.album_type === 'album' || album.total_tracks >= 10);
    
    if (isFullAlbum) {
      const albumData: any = {
        id: album.id,
        name: album.name,
        artist: album.artists[0]?.name,
        image: album.images[0]?.url || getFallbackImage(album.artists[0]?.name),
        total_tracks: album.total_tracks,
        release_date: album.release_date,
        popularity: album.popularity || 50,
        album_type: album.album_type || 'album',
        external_urls: album.external_urls,
        chartPosition: detailedAlbums.length + 1
      };
      
      detailedAlbums.push(albumData);
      console.log(`✅ Album #${detailedAlbums.length}: ${albumData.artist} - ${albumData.name}`);
    }
  }
  
  return detailedAlbums.length > 0 ? detailedAlbums : getFallbackAlbums(limit);
}

/**
 * Get fallback image for artist
 */
function getFallbackImage(artistName: string): string {
  if (!artistName) return '/images/album2.png';
  const name = artistName.toLowerCase();
  
  if (name.includes('burna')) return '/images/album3.png';
  if (name.includes('wizkid')) return '/images/album1.png';
  return '/images/album2.png';
}

/**
 * Get fallback albums when API fails
 */
function getFallbackAlbums(limit: number) {
  const fallbackAlbums: any[] = [
    {
      id: 'fallback-1',
      name: 'Love, Damini',
      artist: 'Burna Boy',
      image: '/images/album3.png',
      total_tracks: 19,
      release_date: '2022-07-08',
      popularity: 95,
      album_type: 'album',
      external_urls: { spotify: '#' },
      chartPosition: 1
    },
    {
      id: 'fallback-2',
      name: 'Made in Lagos',
      artist: 'Wizkid',
      image: '/images/album1.png',
      total_tracks: 14,
      release_date: '2020-10-30',
      popularity: 92,
      album_type: 'album',
      external_urls: { spotify: '#' },
      chartPosition: 2
    },
    {
      id: 'fallback-3',
      name: 'A Better Time',
      artist: 'Davido',
      image: '/images/album2.png',
      total_tracks: 17,
      release_date: '2020-11-13',
      popularity: 88,
      album_type: 'album',
      external_urls: { spotify: '#' },
      chartPosition: 3
    }
  ];
  
  return fallbackAlbums.slice(0, limit);
}

/**
 * Get Nigerian albums with artist diversity
 */
export async function getNigerianAlbums(limit = 12) {
  try {
    const albumsByArtist = new Map();
    const seenAlbums = new Set();
    const seenArtists = new Set();

    for (const artist of NIGERIAN_ARTISTS) {
      if (albumsByArtist.size >= limit) break;
      
      try {
        const artistSearch = await spotifyFetch(
          `/search?q=artist%3A"${encodeURIComponent(artist)}"&type=album&market=NG&limit=5`
        );
        
        if (artistSearch.albums?.items) {
          const artistAlbums = artistSearch.albums.items
            .filter((album: any) => 
              album.images?.length > 0 && 
              !seenAlbums.has(album.id) && 
              album.artists[0]?.name?.toLowerCase().includes(artist.toLowerCase())
            )
            .sort((a: any, b: any) => {
              const dateA = new Date(b.release_date).getTime();
              const dateB = new Date(a.release_date).getTime();
              return dateA - dateB;
            });

          if (artistAlbums.length > 0) {
            const album = artistAlbums[0];
            const normalizedArtist = album.artists[0].name.toLowerCase();
            
            const isFullAlbum = album.total_tracks >= 8 && 
              (album.album_type === 'album' || album.total_tracks >= 10);
            
            if (!seenArtists.has(normalizedArtist) && isFullAlbum) {
              albumsByArtist.set(normalizedArtist, {
                id: album.id,
                name: album.name,
                artist: album.artists[0].name,
                image: album.images[0]?.url,
                total_tracks: album.total_tracks,
                release_date: album.release_date,
                popularity: album.popularity || 0,
                album_type: album.album_type || 'album',
                external_urls: album.external_urls
              });
              seenAlbums.add(album.id);
              seenArtists.add(normalizedArtist);
            }
          }
        }
      } catch (error: any) {
        console.warn(`Search for ${artist} failed:`, error.message);
      }
    }

    return Array.from(albumsByArtist.values())
      .sort((a: any, b: any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
      .slice(0, limit);

  } catch (error) {
    console.error('Error fetching Nigerian albums:', error);
    return getFallbackAlbums(limit);
  }
}

/**
 * Get top Nigerian tracks from charts or search
 */
export async function getNigerianTracks(limit = 12) {
  try {
    // Try to get tracks from charts first
    const playlistId = await findNigerianPlaylist();
    if (playlistId) {
      const playlistResponse = await spotifyFetch(`/playlists/${playlistId}/tracks?market=NG&limit=${Math.min(limit * 2, 50)}`);
      
      if (playlistResponse.items?.length > 0) {
        return processTracksFromPlaylist(playlistResponse.items, limit);
      }
    }
    
    // Fallback to artist-based search
    return await getTracksFromArtistSearch(limit);
    
  } catch (error) {
    console.error('Error fetching Nigerian tracks:', error);
    return getFallbackTracks(limit);
  }
}

/**
 * Process tracks from playlist
 */
function processTracksFromPlaylist(playlistItems: any[], limit: number) {
  const tracks: any[] = [];
  const seenTracks = new Set();
  
  for (let i = 0; i < Math.min(playlistItems.length, limit); i++) {
    const item = playlistItems[i];
    if (!item.track?.id || seenTracks.has(item.track.id)) continue;
    
    const track = item.track;
    tracks.push({
      id: track.id,
      name: track.name,
      artist: track.artists[0]?.name || 'Unknown Artist',
      image: track.album.images[0]?.url,
      duration: formatDuration(track.duration_ms),
      preview_url: track.preview_url,
      external_urls: track.external_urls,
      album: track.album.name,
      popularity: track.popularity || 0,
      chartPosition: i + 1
    });
    
    seenTracks.add(track.id);
  }
  
  return tracks;
}

/**
 * Get tracks from artist search (fallback)
 */
async function getTracksFromArtistSearch(limit: number) {
  const tracksByArtist = new Map();
  const seenTracks = new Set();
  const seenArtists = new Set();

  for (const artist of NIGERIAN_ARTISTS.slice(0, limit)) {
    if (tracksByArtist.size >= limit) break;
    
    try {
      const artistSearch = await spotifyFetch(
        `/search?q=artist%3A"${encodeURIComponent(artist)}"&type=track&market=NG&limit=5`
      );
      
      if (artistSearch.tracks?.items) {
        const artistTracks = artistSearch.tracks.items
          .filter((track: any) => 
            !seenTracks.has(track.id) && 
            track.artists[0]?.name?.toLowerCase().includes(artist.toLowerCase())
          )
          .sort((a: any, b: any) => (b.popularity || 0) - (a.popularity || 0));

        if (artistTracks.length > 0) {
          const track = artistTracks[0];
          const normalizedArtist = track.artists[0].name.toLowerCase();
          
          if (!seenArtists.has(normalizedArtist)) {
            tracksByArtist.set(normalizedArtist, {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              image: track.album.images[0]?.url,
              duration: formatDuration(track.duration_ms),
              preview_url: track.preview_url,
              external_urls: track.external_urls,
              album: track.album.name,
              popularity: track.popularity || 0
            });
            seenTracks.add(track.id);
            seenArtists.add(normalizedArtist);
          }
        }
      }
    } catch (error: any) {
      console.warn(`Track search for ${artist} failed:`, error.message);
    }
  }

  return Array.from(tracksByArtist.values())
    .sort((a: any, b: any) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit);
}

/**
 * Get fallback tracks when API fails
 */
function getFallbackTracks(limit: number) {
  const fallbackTracks: any[] = [
    {
      id: 'fallback-track-1',
      name: 'Love',
      artist: 'Burna Boy',
      image: '/images/album3.png',
      duration: '3:45',
      preview_url: null,
      external_urls: { spotify: '#' },
      album: 'Love, Damini',
      popularity: 95
    },
    {
      id: 'fallback-track-2',
      name: 'Essence',
      artist: 'Wizkid',
      image: '/images/album1.png',
      duration: '3:12',
      preview_url: null,
      external_urls: { spotify: '#' },
      album: 'Made in Lagos',
      popularity: 92
    },
    {
      id: 'fallback-track-3',
      name: 'Stand Strong',
      artist: 'Davido',
      image: '/images/album2.png',
      duration: '2:55',
      preview_url: null,
      external_urls: { spotify: '#' },
      album: 'A Better Time',
      popularity: 88
    }
  ];
  
  return fallbackTracks.slice(0, limit);
}

// Export service object for compatibility
const spotifyService = {
  getMostStreamedNigerianAlbums,
  getNigerianAlbums,
  getNigerianTracks
};

export default spotifyService;