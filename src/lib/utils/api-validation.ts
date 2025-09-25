/**
 * API Response Validation Utilities
 * Validates and sanitizes API responses to prevent runtime errors
 */

/**
 * Validates Spotify artist response
 */
export function validateSpotifyArtist(artist: any) {
  if (!artist || typeof artist !== 'object') {
    return null;
  }

  return {
    id: sanitizeString(artist.id) || `unknown-${Date.now()}`,
    name: sanitizeString(artist.name) || 'Unknown Artist',
    image: validateImageUrl(artist.images?.[0]?.url),
    external_urls: artist.external_urls?.spotify ? sanitizeUrl(artist.external_urls.spotify) : null,
    followers: artist.followers?.total || 0,
    genres: Array.isArray(artist.genres) ? artist.genres.slice(0, 5) : [],
    popularity: typeof artist.popularity === 'number' ? Math.max(0, Math.min(100, artist.popularity)) : 0
  };
}

/**
 * Validates Spotify album response
 */
export function validateSpotifyAlbum(album: any) {
  if (!album || typeof album !== 'object') {
    return null;
  }

  return {
    id: sanitizeString(album.id) || `unknown-album-${Date.now()}`,
    name: sanitizeString(album.name) || 'Unknown Album',
    image: validateImageUrl(album.images?.[0]?.url),
    artists: Array.isArray(album.artists) ? album.artists.map((artist: any) => ({
      id: sanitizeString(artist.id),
      name: sanitizeString(artist.name) || 'Unknown Artist'
    })).filter((artist: any) => artist.id) : [],
    release_date: sanitizeString(album.release_date),
    total_tracks: typeof album.total_tracks === 'number' ? Math.max(0, album.total_tracks) : 0,
    external_urls: album.external_urls?.spotify ? sanitizeUrl(album.external_urls.spotify) : null
  };
}

/**
 * Validates Spotify track response
 */
export function validateSpotifyTrack(track: any) {
  if (!track || typeof track !== 'object') {
    return null;
  }

  return {
    id: sanitizeString(track.id) || `unknown-track-${Date.now()}`,
    name: sanitizeString(track.name) || 'Unknown Track',
    artists: Array.isArray(track.artists) ? track.artists.map((artist: any) => ({
      id: sanitizeString(artist.id),
      name: sanitizeString(artist.name) || 'Unknown Artist'
    })).filter((artist: any) => artist.id) : [],
    album: track.album ? {
      id: sanitizeString(track.album.id),
      name: sanitizeString(track.album.name) || 'Unknown Album',
      image: validateImageUrl(track.album.images?.[0]?.url)
    } : null,
    duration_ms: typeof track.duration_ms === 'number' ? Math.max(0, track.duration_ms) : 0,
    preview_url: validateAudioUrl(track.preview_url),
    external_urls: track.external_urls?.spotify ? sanitizeUrl(track.external_urls.spotify) : null,
    popularity: typeof track.popularity === 'number' ? Math.max(0, Math.min(100, track.popularity)) : 0
  };
}

/**
 * Validates and sanitizes string input
 */
function sanitizeString(input: any): string | null {
  if (typeof input !== 'string') {
    return null;
  }
  
  // Remove potentially dangerous characters and limit length
  return input
    .replace(/[<>\"']/g, '') // Remove HTML/script injection characters
    .trim()
    .slice(0, 200); // Limit length to prevent memory issues
}

/**
 * Validates image URL
 */
function validateImageUrl(url: any): string {
  if (!url || typeof url !== 'string') {
    return '/images/placeholder.svg';
  }

  // Check if it's a valid Spotify image URL or local image
  if (url.startsWith('https://i.scdn.co/') || url.startsWith('/images/')) {
    return url;
  }

  // Return fallback for invalid URLs
  return '/images/placeholder.svg';
}

/**
 * Validates audio URL
 */
function validateAudioUrl(url: any): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  // Only allow Spotify preview URLs
  if (url.startsWith('https://p.scdn.co/')) {
    return url;
  }

  return null;
}

/**
 * Validates and sanitizes URL
 */
function sanitizeUrl(url: any): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    
    // Only allow HTTPS Spotify URLs
    if (parsedUrl.protocol === 'https:' && parsedUrl.hostname.includes('spotify.com')) {
      return url;
    }
  } catch (error) {
    console.warn('Invalid URL provided:', url);
  }

  return null;
}

/**
 * Validates entire API response structure
 */
export function validateApiResponse(response: any, expectedType: string) {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid API response: Response is not an object');
  }

  if (!response.success) {
    throw new Error(`API Error: ${response.message || 'Unknown error occurred'}`);
  }

  const validators: any = {
    artists: validateSpotifyArtist,
    albums: validateSpotifyAlbum,
    tracks: validateSpotifyTrack
  };

  const validator = validators[expectedType];
  if (!validator) {
    throw new Error(`Unknown validation type: ${expectedType}`);
  }

  if (!Array.isArray(response[expectedType])) {
    throw new Error(`Invalid API response: ${expectedType} is not an array`);
  }

  // Validate and filter out invalid items
  const validatedItems = response[expectedType]
    .map(validator)
    .filter((item: any) => item !== null);

  return {
    ...response,
    [expectedType]: validatedItems,
    total: validatedItems.length
  };
}