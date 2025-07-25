import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Environment debugging information
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
        VERCEL_REGION: process.env.VERCEL_REGION,
        VERCEL_URL: process.env.VERCEL_URL,
      },
      spotify: {
        hasClientId: !!process.env.SPOTIFY_CLIENT_ID,
        hasClientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
        clientIdPrefix: process.env.SPOTIFY_CLIENT_ID ? process.env.SPOTIFY_CLIENT_ID.substring(0, 8) + '...' : 'missing',
      },
      headers: {
        userAgent: process.env.NODE_ENV === 'development' ? 'dev-mode' : 'production',
        region: process.env.VERCEL_REGION || 'unknown',
      }
    };

    return NextResponse.json({
      success: true,
      debug: debugInfo,
      message: 'Debug information for production vs development comparison'
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
} 