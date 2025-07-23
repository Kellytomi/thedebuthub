/**
 * Spotify Web API Integration
 * Handles authentication and data fetching for Nigerian/Afrobeats music
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Cache for access token
let accessToken = null;
let tokenExpiry = null;

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
 * Make authenticated request to Spotify API
 */
async function spotifyFetch(endpoint, options = {}) {
  const token = await getAccessToken();
  
  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Search for Nigerian artists (prominent ones to find albums from)
 */
const NIGERIAN_ARTISTS = [
  'Burna Boy', 'Wizkid', 'Davido', 'Tiwa Savage', 'Yemi Alade',
  'Mr Eazi', 'Tekno', 'Ruger', 'Omah Lay', 'Joeboy',
  'Fireboy DML', 'Rema', 'Asake', 'Kizz Daniel', 'Ayra Starr'
];

/**
 * Get Nigerian albums by searching for Afrobeats genre and Nigerian artists
 * Ensures diversity by getting one album per artist
 */
export async function getNigerianAlbums(limit = 12) {
  try {
    const albumsByArtist = new Map(); // Track one album per artist
    const seenAlbums = new Set();
    const seenArtists = new Set();

    // Strategy 1: Get one recent album from each major Nigerian artist
    for (const artist of NIGERIAN_ARTISTS) {
      if (albumsByArtist.size >= limit) break;
      
      try {
        const artistSearch = await spotifyFetch(
          `/search?q=artist%3A"${encodeURIComponent(artist)}"&type=album&market=NG&limit=5`
        );
        
        if (artistSearch.albums?.items) {
          // Find the most recent album from this artist
          const artistAlbums = artistSearch.albums.items
            .filter(album => 
              album.images?.length > 0 && 
              !seenAlbums.has(album.id) && 
              album.artists[0]?.name && 
              album.artists[0].name.toLowerCase().includes(artist.toLowerCase())
            )
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

          if (artistAlbums.length > 0) {
            const album = artistAlbums[0];
            const normalizedArtist = album.artists[0].name.toLowerCase();
            
            if (!seenArtists.has(normalizedArtist)) {
              albumsByArtist.set(normalizedArtist, {
                id: album.id,
                name: album.name,
                artist: album.artists[0].name,
                image: album.images[0]?.url,
                total_tracks: album.total_tracks,
                release_date: album.release_date,
                external_urls: album.external_urls
              });
              seenAlbums.add(album.id);
              seenArtists.add(normalizedArtist);
            }
          }
        }
      } catch (error) {
        console.warn(`Search for ${artist} failed:`, error.message);
      }
    }

    // Strategy 2: If we need more albums, search for Afrobeats genre
    if (albumsByArtist.size < limit) {
      try {
        const afrobeatsSearch = await spotifyFetch(
          `/search?q=genre%3Aafrobeat%20OR%20genre%3Aafrobeats&type=album&market=NG&limit=30`
        );
        
        if (afrobeatsSearch.albums?.items) {
          const filteredAlbums = afrobeatsSearch.albums.items
            .filter(album => 
              album.images?.length > 0 && 
              !seenAlbums.has(album.id) &&
              album.artists[0]?.name
            )
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

          for (const album of filteredAlbums) {
            if (albumsByArtist.size >= limit) break;
            
            const normalizedArtist = album.artists[0].name.toLowerCase();
            
            if (!seenArtists.has(normalizedArtist)) {
              albumsByArtist.set(normalizedArtist, {
                id: album.id,
                name: album.name,
                artist: album.artists[0].name,
                image: album.images[0]?.url,
                total_tracks: album.total_tracks,
                release_date: album.release_date,
                external_urls: album.external_urls
              });
              seenAlbums.add(album.id);
              seenArtists.add(normalizedArtist);
            }
          }
        }
      } catch (error) {
        console.warn('Afrobeats genre search failed:', error.message);
      }
    }

    // Strategy 3: If still need more, search Nigerian music broadly
    if (albumsByArtist.size < limit) {
      try {
        const nigerianSearch = await spotifyFetch(
          `/search?q="nigerian music" OR "afrobeats" OR "nigeria"&type=album&market=NG&limit=30`
        );
        
        if (nigerianSearch.albums?.items) {
          const filteredAlbums = nigerianSearch.albums.items
            .filter(album => 
              album.images?.length > 0 && 
              !seenAlbums.has(album.id) &&
              album.artists[0]?.name
            )
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

          for (const album of filteredAlbums) {
            if (albumsByArtist.size >= limit) break;
            
            const normalizedArtist = album.artists[0].name.toLowerCase();
            
            if (!seenArtists.has(normalizedArtist)) {
              albumsByArtist.set(normalizedArtist, {
                id: album.id,
                name: album.name,
                artist: album.artists[0].name,
                image: album.images[0]?.url,
                total_tracks: album.total_tracks,
                release_date: album.release_date,
                external_urls: album.external_urls
              });
              seenAlbums.add(album.id);
              seenArtists.add(normalizedArtist);
            }
          }
        }
      } catch (error) {
        console.warn('Nigerian music search failed:', error.message);
      }
    }

    // Convert to array and sort by release date (newest first)
    const albums = Array.from(albumsByArtist.values())
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      .slice(0, limit);

    console.log(`Found ${albums.length} Nigerian albums from different artists:`, 
      albums.map(a => `${a.name} by ${a.artist}`));
    
    return albums;

  } catch (error) {
    console.error('Error fetching Nigerian albums:', error);
    throw new Error('Failed to fetch Nigerian albums');
  }
}

/**
 * Get new releases from Nigerian market
 */
export async function getNigerianNewReleases(limit = 12) {
  try {
    const data = await spotifyFetch(`/browse/new-releases?country=NG&limit=${limit}`);
    
    if (!data.albums?.items) {
      return [];
    }

    return data.albums.items.map(album => ({
      id: album.id,
      name: album.name,
      artist: album.artists[0]?.name || 'Unknown Artist',
      image: album.images[0]?.url,
      total_tracks: album.total_tracks,
      release_date: album.release_date,
      external_urls: album.external_urls
    }));
  } catch (error) {
    console.error('Error fetching Nigerian new releases:', error);
    throw new Error('Failed to fetch Nigerian new releases');
  }
}

/**
 * Get featured playlists that might contain Nigerian music
 */
export async function getNigerianFeaturedPlaylists(limit = 5) {
  try {
    const data = await spotifyFetch(`/browse/featured-playlists?country=NG&limit=${limit}`);
    
    if (!data.playlists?.items) {
      return [];
    }

    return data.playlists.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      image: playlist.images[0]?.url,
      tracks_total: playlist.tracks?.total || 0,
      external_urls: playlist.external_urls
    }));
  } catch (error) {
    console.error('Error fetching Nigerian featured playlists:', error);
    throw new Error('Failed to fetch Nigerian featured playlists');
  }
}

export default {
  getNigerianAlbums,
  getNigerianNewReleases,
  getNigerianFeaturedPlaylists
}; 