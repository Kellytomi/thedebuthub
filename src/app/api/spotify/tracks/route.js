import { NextResponse } from 'next/server';
import { getNigerianTracks } from '@/lib/spotify';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 12;

    // Log for production debugging
    if (process.env.NODE_ENV === 'production') {
      console.log(`🎵 Tracks API called from region: ${process.env.VERCEL_REGION || 'unknown'}`);
    }

    const tracks = await getNigerianTracks(limit);

    return NextResponse.json({
      success: true,
      tracks,
      count: tracks.length
    });

  } catch (error) {
    console.error('API Error - Nigerian Tracks:', error);
    
    // Return fallback data if Spotify API fails
    const fallbackTracks = [
      {
        id: 'fallback-1',
        name: 'Love',
        artist: 'Burna Boy',
        image: '/images/album3.png',
        duration: '3:45',
        preview_url: null,
        external_urls: { spotify: '#' },
        album: 'Love, Damini'
      },
      {
        id: 'fallback-2',
        name: 'Essence',
        artist: 'Wizkid',
        image: '/images/album1.png',
        duration: '3:12',
        preview_url: null,
        external_urls: { spotify: '#' },
        album: 'Made in Lagos'
      },
      {
        id: 'fallback-3',
        name: 'Stand Strong',
        artist: 'Davido',
        image: '/images/album2.png',
        duration: '2:55',
        preview_url: null,
        external_urls: { spotify: '#' },
        album: 'A Better Time'
      }
    ];

    return NextResponse.json({
      success: false,
      error: error.message,
      tracks: fallbackTracks.slice(0, parseInt(searchParams.get('limit')) || 3),
      fallback: true,
      count: Math.min(fallbackTracks.length, parseInt(searchParams.get('limit')) || 3)
    });
  }
} 