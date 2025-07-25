import { NextResponse } from 'next/server';
import { getMostStreamedNigerianAlbums } from '@/lib/spotify';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 3;
    
    console.log(`Fetching top ${limit} most streamed Nigerian albums...`);
    
    // Force consistent results by using fallback data in production
    const albums = process.env.NODE_ENV === 'production' 
      ? null // This will trigger fallback
      : await getMostStreamedNigerianAlbums(limit);
    
    console.log(`🔍 API received ${albums?.length || 0} albums from Spotify function`);
    
    if (albums && albums.length > 0) {
      console.log(`Successfully fetched ${albums.length} most streamed albums`);
      
      // Log image URLs to debug
      albums.forEach((album, i) => {
        console.log(`Album ${i + 1}: ${album.artist} - ${album.name}`);
        console.log(`Image URL: ${album.image}`);
      });
      
      return NextResponse.json({
        success: true,
        albums,
        count: albums.length,
        message: `Top ${albums.length} most streamed Nigerian albums`
      });
    } else {
      console.log('🔄 No albums found from Top 50 Nigeria playlist, returning fallback data');
      
      // Fallback data - most streamed albums with correct image mappings
      const fallbackAlbums = [
        {
          id: 'fallback-most-streamed-1',
          name: 'Love, Damini',
          artist: 'Burna Boy',
          image: '/images/album3.png', // Love, Damini uses album3.png
          total_tracks: 19,
          release_date: '2022-07-08',
          popularity: 95,
          album_type: 'album',
          external_urls: { spotify: '#' }
        },
        {
          id: 'fallback-most-streamed-2',
          name: 'Twice As Tall',
          artist: 'Burna Boy',
          image: '/images/album2.png', // Different Burna Boy album uses album2.png
          total_tracks: 15,
          release_date: '2020-08-14',
          popularity: 92,
          album_type: 'album',
          external_urls: { spotify: '#' }
        },
        {
          id: 'fallback-most-streamed-3',
          name: 'Made in Lagos',
          artist: 'Wizkid',
          image: '/images/album1.png', // Made in Lagos uses album1.png (original mapping)
          total_tracks: 14,
          release_date: '2020-10-30',
          popularity: 90,
          album_type: 'album',
          external_urls: { spotify: '#' }
        },
        {
          id: 'fallback-most-streamed-4',
          name: 'A Better Time',
          artist: 'Davido',
          image: '/images/album1.png',
          total_tracks: 17,
          release_date: '2020-11-13',
          popularity: 88,
          album_type: 'album',
          external_urls: { spotify: '#' }
        },
        {
          id: 'fallback-most-streamed-5',
          name: 'More Love, Less Ego',
          artist: 'Wizkid',
          image: '/images/album3.png',
          total_tracks: 13,
          release_date: '2022-11-11',
          popularity: 85,
          album_type: 'album',
          external_urls: { spotify: '#' }
        }
      ];
      
      const limitedFallback = fallbackAlbums.slice(0, limit);
      
      console.log('🖼️  Fallback albums with images:');
      limitedFallback.forEach((album, i) => {
        console.log(`  ${i + 1}. ${album.artist} - ${album.name} → ${album.image}`);
      });
      
      return NextResponse.json({
        success: false,
        albums: limitedFallback,
        count: limitedFallback.length,
        fallback: true,
        message: `Fallback: Top ${limitedFallback.length} most streamed albums`
      });
    }
  } catch (error) {
    console.error('API Error - Most Streamed Albums:', error);
    
    // Return error with fallback - correct image mappings
    const fallbackAlbums = [
      {
        id: 'error-fallback-1',
        name: 'Love, Damini',
        artist: 'Burna Boy',
        image: '/images/album3.png', // Love, Damini = album3.png
        total_tracks: 19,
        release_date: '2022-07-08',
        popularity: 95,
        album_type: 'album',
        external_urls: { spotify: '#' }
      },
      {
        id: 'error-fallback-2',
        name: 'Twice As Tall',
        artist: 'Burna Boy',
        image: '/images/album2.png', // Twice As Tall = album2.png
        total_tracks: 15,
        release_date: '2020-08-14',
        popularity: 92,
        album_type: 'album',
        external_urls: { spotify: '#' }
      },
      {
        id: 'error-fallback-3',
        name: 'Made in Lagos',
        artist: 'Wizkid',
        image: '/images/album1.png', // Made in Lagos = album1.png
        total_tracks: 14,
        release_date: '2020-10-30',
        popularity: 90,
        album_type: 'album',
        external_urls: { spotify: '#' }
      }
    ];
    
    const limit = parseInt(new URL(request.url).searchParams.get('limit')) || 3;
    
    return NextResponse.json({
      success: false,
      error: error.message,
      albums: fallbackAlbums.slice(0, limit),
      count: Math.min(fallbackAlbums.length, limit),
      fallback: true,
      message: 'Error fallback data'
    });
  }
} 