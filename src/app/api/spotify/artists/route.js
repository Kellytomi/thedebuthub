import { NextResponse } from 'next/server';

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
    throw new Error('Spotify credentials not configured.');
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
 * Top Nigerian artists to search for
 */
const TOP_NIGERIAN_ARTISTS = [
  'Burna Boy', 'Wizkid', '"Davido"', 'Rema', 'Asake', 
  'Fireboy DML', 'Omah Lay', 'Joeboy', 'Kizz Daniel', 
  'Ayra Starr', 'Tiwa Savage', 'Mr Eazi', 'Ruger'
];

/**
 * Get top Nigerian artists with their images
 */
async function getTopNigerianArtists(limit = 3) {
  try {
    const artists = [];
    const seenArtists = new Set();

    for (const artistName of TOP_NIGERIAN_ARTISTS) {
      if (artists.length >= limit) break;
      
      try {
        const searchResult = await spotifyFetch(
          `/search?q="${encodeURIComponent(artistName)}"&type=artist&market=NG&limit=1`
        );
        
        if (searchResult.artists?.items?.length > 0) {
          const artist = searchResult.artists.items[0];
          const normalizedName = artist.name.toLowerCase();
          
          // Ensure we don't add duplicate artists and that they have an image
          // Also verify the image is actually an artist image (not album cover)
          if (!seenArtists.has(normalizedName) && artist.images?.length > 0) {
            // Get the highest resolution artist image
            const artistImage = artist.images[0]?.url;
            
            // Verify this is actually the artist we're looking for (not a similar name)
            const searchName = artistName.replace(/['"]/g, '').toLowerCase();
            if (normalizedName.includes(searchName) || searchName.includes(normalizedName)) {
              console.log(`✅ Found ${artist.name} via Spotify API with artist image`);
              artists.push({
                id: artist.id,
                name: artist.name,
                image: artistImage,
                followers: artist.followers?.total || 0,
                popularity: artist.popularity || 0,
                external_urls: artist.external_urls,
                genres: artist.genres || []
              });
              seenArtists.add(normalizedName);
            }
          }
        }
      } catch (error) {
        console.warn(`❌ Search for ${artistName} failed:`, error.message);
      }
    }

    // Sort by popularity and return top artists
    return artists
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, limit);

  } catch (error) {
    console.error('Error fetching top Nigerian artists:', error);
    throw new Error('Failed to fetch top Nigerian artists');
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 7;

    const artists = await getTopNigerianArtists(limit);

    return NextResponse.json({
      success: true,
      artists,
      count: artists.length
    });

  } catch (error) {
    console.error('API Error - Nigerian Artists:', error);
    console.log('🔄 Using fallback artist images...');
    
    // Return fallback data if Spotify API fails
    const fallbackArtists = [
      {
        id: 'fallback-1',
        name: 'Rema',
        image: '/images/rema-image.png',
        followers: 5000000,
        popularity: 85,
        external_urls: { spotify: '#' },
        genres: ['afrobeats']
      },
      {
        id: 'fallback-2',
        name: 'Wizkid',
        image: '/images/wiz-image.png',
        followers: 8000000,
        popularity: 90,
        external_urls: { spotify: '#' },
        genres: ['afrobeats']
      },
      {
        id: 'fallback-3',
        name: 'Davido',
        image: '/images/david-image.png', // Note: This may be an album cover - should be replaced with artist photo
        followers: 6000000,
        popularity: 88,
        external_urls: { spotify: '#' },
        genres: ['afrobeats']
      },
      {
        id: 'fallback-4',
        name: 'Burna Boy',
        image: '/images/rema-image.png',
        followers: 7000000,
        popularity: 89,
        external_urls: { spotify: '#' },
        genres: ['afrobeats']
      },
      {
        id: 'fallback-5',
        name: 'Asake',
        image: '/images/wiz-image.png',
        followers: 4000000,
        popularity: 82,
        external_urls: { spotify: '#' },
        genres: ['afrobeats']
      },
      {
        id: 'fallback-6',
        name: 'Fireboy DML',
        image: '/images/david-image.png',
        followers: 3500000,
        popularity: 80,
        external_urls: { spotify: '#' },
        genres: ['afrobeats']
      },
      {
        id: 'fallback-7',
        name: 'Omah Lay',
        image: '/images/rema-image.png',
        followers: 3000000,
        popularity: 78,
        external_urls: { spotify: '#' },
        genres: ['afrobeats']
      }
    ];

    return NextResponse.json({
      success: false,
      error: error.message,
      artists: fallbackArtists.slice(0, parseInt(searchParams.get('limit')) || 7),
      fallback: true,
      count: Math.min(fallbackArtists.length, parseInt(searchParams.get('limit')) || 7)
    });
  }
} 