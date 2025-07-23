import { NextResponse } from 'next/server';
import { getNigerianAlbums } from '@/lib/spotify';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 12;

    const albums = await getNigerianAlbums(limit);

    return NextResponse.json({
      success: true,
      albums,
      count: albums.length
    });

  } catch (error) {
    console.error('API Error - Nigerian Albums:', error);
    
    // Return fallback data if Spotify API fails
    const fallbackAlbums = [
      {
        id: 'fallback-1',
        name: 'Love, Damini',
        artist: 'Burna Boy',
        image: '/images/album3.png',
        total_tracks: 19,
        release_date: '2022-07-08',
        external_urls: { spotify: '#' }
      },
      {
        id: 'fallback-2',
        name: 'Made in Lagos',
        artist: 'Wizkid',
        image: '/images/album1.png',
        total_tracks: 14,
        release_date: '2020-10-30',
        external_urls: { spotify: '#' }
      },
      {
        id: 'fallback-3',
        name: 'A Better Time',
        artist: 'Davido',
        image: '/images/album2.png',
        total_tracks: 17,
        release_date: '2020-11-13',
        external_urls: { spotify: '#' }
      }
    ];

    return NextResponse.json({
      success: false,
      error: error.message,
      albums: fallbackAlbums.slice(0, parseInt(searchParams.get('limit')) || 3),
      fallback: true,
      count: Math.min(fallbackAlbums.length, parseInt(searchParams.get('limit')) || 3)
    });
  }
} 