import { NextResponse } from 'next/server';
import { getNigerianTracks } from '@/lib/api/spotify';

/**
 * GET /api/spotify/tracks
 * Fetches top Nigerian tracks from charts and artist searches
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit')) || 12, 50); // Cap at 50

    console.log(`🎵 Tracks API called - fetching ${limit} tracks`);
    const tracks = await getNigerianTracks(limit);

    if (!tracks || tracks.length === 0) {
      throw new Error('No tracks returned from Spotify service');
    }

    return NextResponse.json({
      success: true,
      tracks,
      count: tracks.length,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('API Error - Nigerian Tracks:', error.message);
    
    // Return structured error response
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Nigerian tracks',
        tracks: [],
        count: 0,
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
} 