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
 * Get most streamed Nigerian albums based on Spotify's official "Top 50 - Nigeria" playlist
 * This uses real streaming data instead of search guesswork
 */
export async function getMostStreamedNigerianAlbums(limit = 3) {
  try {
    console.log('🇳🇬 Fetching most streamed albums from Top 50 - Nigeria playlist...');
    
    // Step 1: Search for Nigeria Top 50 playlist dynamically with multiple search terms
    console.log('🔍 Searching for Nigeria/Afrobeats playlists...');
    let playlistId = null;
    
    const searchTerms = [
      '"Top 50 - Nigeria"',
      'Nigeria Top 50',
      'Afrobeats Hits',
      'Nigeria Music',
      'Nigerian Charts'
    ];
    
    for (const searchTerm of searchTerms) {
      if (playlistId) break; // Stop if we found one
      
      try {
        console.log(`🔍 Trying search: ${searchTerm}`);
        const playlistSearch = await spotifyFetch(`/search?q=${encodeURIComponent(searchTerm)}&type=playlist&market=NG&limit=15`);
      
      if (playlistSearch.playlists?.items) {
        // Find the official Spotify playlist with proper null checking
        const officialPlaylist = playlistSearch.playlists.items.find(playlist => {
          if (!playlist || !playlist.name) return false;
          
          // Check owner safely
          const isSpotifyOwned = playlist.owner && playlist.owner.id === 'spotify';
          const hasRelevantName = playlist.name.includes('Top 50') || 
                                 playlist.name.includes('Nigeria') || 
                                 playlist.name.includes('Afrobeats');
          
          return isSpotifyOwned && hasRelevantName;
        });
        
        if (officialPlaylist) {
          playlistId = officialPlaylist.id;
          console.log(`✅ Found official Nigeria playlist: "${officialPlaylist.name}" (ID: ${playlistId})`);
        } else {
          // Fallback: use any Nigeria-related playlist with proper validation
          const nigeriaPlaylist = playlistSearch.playlists.items.find(playlist => {
            if (!playlist || !playlist.name) return false;
            const name = playlist.name.toLowerCase();
            return name.includes('nigeria') || name.includes('afrobeats') || name.includes('naija');
          });
          
          if (nigeriaPlaylist) {
            playlistId = nigeriaPlaylist.id;
                         console.log(`📋 Using Nigeria playlist: "${nigeriaPlaylist.name}" (ID: ${playlistId})`);
           }
         }
       }
       } catch (searchError) {
         console.warn(`Playlist search failed for "${searchTerm}":`, searchError.message);
       }
     }
    
    // Fallback playlist IDs to try - updated with more current options
    const fallbackPlaylistIds = [
      '37i9dQZEVXbKY7jLzlJ11V', // Top 50 - Nigeria (if still exists)
      '37i9dQZEVXbNx2OGnb4lSJ', // Afrobeats Hits
      '37i9dQZEVXbMDoHDwVN2tF', // Global Top 50 (broader fallback)
      '37i9dQZEVXbJNjKfUHPuo1', // Africa Now
      '37i9dQZEVXbLRQDuF5jeBp', // Alternative Nigeria charts
    ];
    
    if (!playlistId) {
      console.log('🔄 Trying fallback playlist IDs...');
      for (const id of fallbackPlaylistIds) {
        try {
          const testResponse = await spotifyFetch(`/playlists/${id}?market=NG`);
          if (testResponse.id) {
            playlistId = id;
            console.log(`✅ Using fallback playlist: "${testResponse.name}" (ID: ${playlistId})`);
            break;
          }
        } catch (error) {
          console.warn(`Playlist ${id} not accessible:`, error.message);
        }
      }
    }
    
    if (!playlistId) {
      throw new Error('Could not find accessible Nigeria playlist');
    }
    
    // Step 2: Fetch the playlist tracks
    console.log('📋 Fetching playlist tracks...');
    const playlistResponse = await spotifyFetch(`/playlists/${playlistId}/tracks?market=NG&limit=50`);
    
    if (!playlistResponse.items || playlistResponse.items.length === 0) {
      throw new Error('Playlist has no tracks or is empty');
    }
    
    console.log(`🎵 Found ${playlistResponse.items.length} tracks in Nigeria playlist`);
    
    // Step 3: Extract album IDs and count frequency
    const albumCounts = new Map(); // albumId -> { count, albumInfo }
    const albumDetails = new Map(); // albumId -> album object
    
    for (const item of playlistResponse.items) {
      if (!item.track || !item.track.album) continue;
      
      const track = item.track;
      const album = track.album;
      const albumId = album.id;
      
      if (albumCounts.has(albumId)) {
        albumCounts.get(albumId).count++;
      } else {
        albumCounts.set(albumId, { 
          count: 1,
          albumInfo: {
            id: album.id,
            name: album.name,
            artist: album.artists[0]?.name,
            image: album.images[0]?.url,
            total_tracks: album.total_tracks,
            release_date: album.release_date,
            album_type: album.album_type || 'album',
            external_urls: album.external_urls
          }
        });
        albumDetails.set(albumId, album);
      }
    }
    
    console.log(`📊 Found ${albumCounts.size} unique albums in Top 50`);
    
    // Step 3: Sort albums by frequency (most tracks in Top 50 = most streamed)
    const sortedAlbums = Array.from(albumCounts.entries())
      .sort((a, b) => b[1].count - a[1].count) // Sort by track count (descending)
      .slice(0, limit * 2); // Get more than needed for additional processing
    
    // Step 4: Fetch full album details for the top albums
    console.log('📀 Fetching detailed album information...');
    const detailedAlbums = [];
    
    for (const [albumId, { count, albumInfo }] of sortedAlbums) {
      if (detailedAlbums.length >= limit) break;
      
      try {
        // Fetch full album details
        const fullAlbum = await spotifyFetch(`/albums/${albumId}?market=NG`);
        
        // Calculate a popularity score based on chart position and frequency
        const chartPosition = sortedAlbums.findIndex(([id]) => id === albumId) + 1;
        const popularityScore = Math.max(95 - (chartPosition * 5), 50) + (count * 2);
        
        let imageUrl = fullAlbum.images[0]?.url;
        
        // Fallback images if Spotify image fails
        if (!imageUrl) {
          const artistName = fullAlbum.artists[0]?.name.toLowerCase() || '';
          if (artistName.includes('burna')) {
            imageUrl = '/images/album3.png';
          } else if (artistName.includes('wizkid')) {
            imageUrl = '/images/album1.png';
          } else {
            imageUrl = '/images/album2.png';
          }
        }
        
        const albumData = {
          id: fullAlbum.id,
          name: fullAlbum.name,
          artist: fullAlbum.artists[0]?.name,
          image: imageUrl,
          total_tracks: fullAlbum.total_tracks,
          release_date: fullAlbum.release_date,
          popularity: popularityScore, // Our calculated popularity based on chart performance
          album_type: fullAlbum.album_type || 'album',
          external_urls: fullAlbum.external_urls,
          tracksInTop50: count // How many tracks from this album are in Top 50
        };
        
        detailedAlbums.push(albumData);
        
        console.log(`🏆 #${chartPosition}: ${albumData.artist} - ${albumData.name} (${count} tracks in Top 50, popularity: ${popularityScore})`);
        
      } catch (error) {
        console.warn(`Failed to fetch details for album ${albumId}:`, error.message);
      }
    }
    
    console.log(`✅ Successfully fetched ${detailedAlbums.length} most streamed albums from Nigeria charts`);
    return detailedAlbums;

  } catch (error) {
    console.error('Error fetching most streamed Nigerian albums from charts:', error);
    console.log('🔄 Falling back to search-based approach...');
    
    // Fallback: Use search-based approach if playlist access fails
    try {
      const fallbackAlbums = [];
      const seenAlbums = new Set();
      
      // Search for popular albums by top Nigerian artists (dynamically updated list)
      const topArtists = [
        'Burna Boy',     // Grammy winner, most popular
        'Wizkid',        // International success
        'Davido',        // Chart topper
        'Asake',         // Rising star  
        'Rema',          // International breakthrough
        'Fireboy DML',   // Consistent hits
        'Omah Lay'       // New generation
      ];
      
      console.log(`🎯 Fallback: Searching albums by ${topArtists.length} top Nigerian artists...`);
      
      for (const artist of topArtists) {
        if (fallbackAlbums.length >= limit * 2) break;
        
        try {
          console.log(`🔍 Searching albums by ${artist}...`);
          const artistSearch = await spotifyFetch(
            `/search?q=artist%3A"${encodeURIComponent(artist)}"&type=album&market=NG&limit=10`
          );
          
          if (artistSearch.albums?.items) {
            // Get the most popular albums from this artist
            const popularAlbums = artistSearch.albums.items
              .filter(album => 
                album.images?.length > 0 && 
                !seenAlbums.has(album.id) &&
                album.artists[0]?.name &&
                album.artists[0].name.toLowerCase().includes(artist.toLowerCase())
              )
              .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
              .slice(0, 2); // Top 2 albums per artist
            
            for (const album of popularAlbums) {
              if (fallbackAlbums.length >= limit) break;
              
              let imageUrl = album.images[0]?.url;
              if (!imageUrl) {
                const artistName = album.artists[0].name.toLowerCase();
                if (artistName.includes('burna')) {
                  imageUrl = '/images/album3.png';
                } else if (artistName.includes('wizkid')) {
                  imageUrl = '/images/album1.png';
                } else {
                  imageUrl = '/images/album2.png';
                }
              }
              
              fallbackAlbums.push({
                id: album.id,
                name: album.name,
                artist: album.artists[0].name,
                image: imageUrl,
                total_tracks: album.total_tracks,
                release_date: album.release_date,
                popularity: album.popularity || 75,
                album_type: album.album_type || 'album',
                external_urls: album.external_urls,
                tracksInTop50: 1 // Estimated
              });
              
              seenAlbums.add(album.id);
              console.log(`📀 Fallback: ${album.artists[0].name} - ${album.name} (popularity: ${album.popularity || 75})`);
            }
          }
        } catch (artistError) {
          console.warn(`Search for ${artist} failed:`, artistError.message);
        }
      }
      
      if (fallbackAlbums.length > 0) {
        console.log(`✅ Fallback search found ${fallbackAlbums.length} albums`);
        return fallbackAlbums.slice(0, limit);
      }
    } catch (fallbackError) {
      console.error('Fallback search also failed:', fallbackError.message);
    }
    
    return [];
  }
}

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
                popularity: album.popularity || 0,
                album_type: album.album_type || 'album',
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
                popularity: album.popularity || 0,
                album_type: album.album_type || 'album',
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
                popularity: album.popularity || 0,
                album_type: album.album_type || 'album',
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

/**
 * Get top Nigerian tracks by searching for popular tracks from Nigerian artists
 * Sorts by popularity score and ensures diversity by getting one track per artist
 */
export async function getNigerianTracks(limit = 12) {
  try {
    const tracksByArtist = new Map(); // Track one track per artist
    const seenTracks = new Set();
    const seenArtists = new Set();

    // Strategy 1: Get recent tracks from each major Nigerian artist
    for (const artist of NIGERIAN_ARTISTS) {
      if (tracksByArtist.size >= limit) break;
      
      try {
        const artistSearch = await spotifyFetch(
          `/search?q=artist%3A"${encodeURIComponent(artist)}"&type=track&market=NG&limit=5`
        );
        
        if (artistSearch.tracks?.items) {
                     // Find the most popular track from this artist
           const artistTracks = artistSearch.tracks.items
             .filter(track => 
               !seenTracks.has(track.id) && 
               track.artists[0]?.name && 
               track.artists[0].name.toLowerCase().includes(artist.toLowerCase())
             )
             .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

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
      } catch (error) {
        console.warn(`Track search for ${artist} failed:`, error.message);
      }
    }

    // Strategy 2: If we need more tracks, search for Afrobeats tracks
    if (tracksByArtist.size < limit) {
      try {
        const afrobeatsSearch = await spotifyFetch(
          `/search?q=genre%3Aafrobeat%20OR%20genre%3Aafrobeats&type=track&market=NG&limit=30`
        );
        
        if (afrobeatsSearch.tracks?.items) {
                     const filteredTracks = afrobeatsSearch.tracks.items
             .filter(track => 
               !seenTracks.has(track.id) &&
               track.artists[0]?.name
             )
             .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

          for (const track of filteredTracks) {
            if (tracksByArtist.size >= limit) break;
            
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
      } catch (error) {
        console.warn('Afrobeats tracks search failed:', error.message);
      }
    }

    // Convert to array and sort by popularity (highest first)
    const tracks = Array.from(tracksByArtist.values())
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, limit);

    console.log(`Found ${tracks.length} Nigerian tracks from different artists:`, 
      tracks.map(t => `${t.name} by ${t.artist}`));
    
    return tracks;

  } catch (error) {
    console.error('Error fetching Nigerian tracks:', error);
    throw new Error('Failed to fetch Nigerian tracks');
  }
}

/**
 * Helper function to format duration from milliseconds to MM:SS
 */
function formatDuration(durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default {
  getNigerianAlbums,
  getNigerianNewReleases,
  getNigerianFeaturedPlaylists,
  getNigerianTracks
}; 