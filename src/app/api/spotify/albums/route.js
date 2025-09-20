import { NextResponse } from 'next/server';
import { getNigerianAlbums } from '@/lib/api/spotify';

/**
 * GET /api/spotify/albums
 * Fetches Nigerian albums with artist diversity
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit')) || 12, 50); // Cap at 50

    console.log(`🎵 Albums API called - fetching ${limit} albums`);
    const albums = await getNigerianAlbums(limit);

    if (!albums || albums.length === 0) {
      throw new Error('No albums returned from Spotify service');
    }

    return NextResponse.json({
      success: true,
      albums,
      count: albums.length,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('API Error - Nigerian Albums:', error.message);
    
    // Return structured error response
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Nigerian albums',
        albums: [],
        count: 0,
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
} 