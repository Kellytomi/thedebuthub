import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { getMostStreamedNigerianAlbums, getNigerianTracks, getNigerianArtists } from '../api/spotify';

export const spotifyRouter = createTRPCRouter({
  // Get most streamed Nigerian albums
  getMostStreamedAlbums: publicProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(50).default(3),
      })
    )
    .query(async ({ input }) => {
      try {
        console.log(`🎵 tRPC: Fetching top ${input.limit} most streamed Nigerian albums...`);
        
        const albums = await getMostStreamedNigerianAlbums(input.limit);
        
        if (albums && albums.length > 0) {
          console.log(`✅ tRPC: Successfully fetched ${albums.length} most streamed albums`);
          
          return {
            success: true,
            albums,
            count: albums.length,
            message: `Top ${albums.length} most streamed Nigerian albums`,
          };
        } else {
          console.log('🔄 tRPC: No albums found, returning fallback data');
          
          // Fallback data - most streamed albums
          const fallbackAlbums = [
            {
              id: 'fallback-most-streamed-1',
              name: 'Rave & Roses Ultra',
              artist: 'Rema',
              image: '/images/rema-image.png',
              total_tracks: 15,
              release_date: '2023-04-28',
              popularity: 95,
              album_type: 'album',
              external_urls: { spotify: '#' }
            },
            {
              id: 'fallback-most-streamed-2',
              name: 'Afro Rave',
              artist: 'Shallipopi',
              image: '/images/album2.png',
              total_tracks: 12,
              release_date: '2023-08-11',
              popularity: 92,
              album_type: 'album',
              external_urls: { spotify: '#' }
            },
            {
              id: 'fallback-most-streamed-3',
              name: 'Work of Art',
              artist: 'Asake',
              image: '/images/album1.png',
              total_tracks: 14,
              release_date: '2023-06-16',
              popularity: 90,
              album_type: 'album',
              external_urls: { spotify: '#' }
            },
            {
              id: 'fallback-most-streamed-4',
              name: 'Love, Damini',
              artist: 'Burna Boy',
              image: '/images/album3.png',
              total_tracks: 19,
              release_date: '2022-07-08',
              popularity: 88,
              album_type: 'album',
              external_urls: { spotify: '#' }
            },
            {
              id: 'fallback-most-streamed-5',
              name: 'Made in Lagos',
              artist: 'Wizkid',
              image: '/images/album1.png',
              total_tracks: 14,
              release_date: '2020-10-30',
              popularity: 85,
              album_type: 'album',
              external_urls: { spotify: '#' }
            }
          ];
          
          const limitedFallback = fallbackAlbums.slice(0, input.limit);
          
          return {
            success: false,
            albums: limitedFallback,
            count: limitedFallback.length,
            fallback: true,
            message: `Fallback: Top ${limitedFallback.length} most streamed albums`,
          };
        }
      } catch (error) {
        console.error('🚨 tRPC Error - Most Streamed Albums:', error);
        
        // Return error with fallback data
        const fallbackAlbums = [
          {
            id: 'error-fallback-1',
            name: 'Rave & Roses Ultra',
            artist: 'Rema',
            image: '/images/rema-image.png',
            total_tracks: 15,
            release_date: '2023-04-28',
            popularity: 95,
            album_type: 'album',
            external_urls: { spotify: '#' }
          },
          {
            id: 'error-fallback-2',
            name: 'Afro Rave',
            artist: 'Shallipopi',
            image: '/images/album2.png',
            total_tracks: 12,
            release_date: '2023-08-11',
            popularity: 92,
            album_type: 'album',
            external_urls: { spotify: '#' }
          },
          {
            id: 'error-fallback-3',
            name: 'Work of Art',
            artist: 'Asake',
            image: '/images/album1.png',
            total_tracks: 14,
            release_date: '2023-06-16',
            popularity: 90,
            album_type: 'album',
            external_urls: { spotify: '#' }
          }
        ];
        
        return {
          success: false,
          error: error.message,
          albums: fallbackAlbums.slice(0, input.limit),
          count: Math.min(fallbackAlbums.length, input.limit),
          fallback: true,
          message: 'Error fallback data',
        };
      }
    }),

  // Get Nigerian tracks
  getTracks: publicProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(50).default(12),
      })
    )
    .query(async ({ input }) => {
      try {
        // Log for production debugging
        if (process.env.NODE_ENV === 'production') {
          console.log(`🎵 tRPC: Tracks called from region: ${process.env.VERCEL_REGION || 'unknown'}`);
        }

        const tracks = await getNigerianTracks(input.limit);

        return {
          success: true,
          tracks,
          count: tracks.length,
        };
      } catch (error) {
        console.error('🚨 tRPC Error - Nigerian Tracks:', error);
        
        // Return fallback data if Spotify API fails
        const fallbackTracks = [
          {
            id: 'fallback-1',
            name: 'FUN',
            artist: 'Rema',
            image: '/images/rema-image.png',
            duration: '3:27',
            preview_url: null,
            external_urls: { spotify: '#' },
            album: 'Rave & Roses Ultra'
          },
          {
            id: 'fallback-2',
            name: 'you',
            artist: 'FOLA',
            image: '/images/album2.png',
            duration: '2:48',
            preview_url: null,
            external_urls: { spotify: '#' },
            album: 'Single'
          },
          {
            id: 'fallback-3',
            name: 'Na So',
            artist: 'Shallipopi',
            image: '/images/album1.png',
            duration: '2:15',
            preview_url: null,
            external_urls: { spotify: '#' },
            album: 'Afro Rave'
          }
        ];

        return {
          success: false,
          error: error.message,
          tracks: fallbackTracks.slice(0, input.limit),
          fallback: true,
          count: Math.min(fallbackTracks.length, input.limit),
        };
      }
    }),

  // Get Nigerian artists
  getArtists: publicProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(50).default(7),
      })
    )
    .query(async ({ input }) => {
      try {
        console.log(`🎤 tRPC: Fetching top ${input.limit} Nigerian artists...`);
        
        const artists = await getNigerianArtists(input.limit);

        if (artists && artists.length > 0) {
          console.log(`✅ tRPC: Successfully fetched ${artists.length} artists`);
          
          return {
            success: true,
            artists,
            count: artists.length,
            message: `Top ${artists.length} Nigerian artists`,
          };
        } else {
          console.log('🔄 tRPC: No artists found, returning fallback data');
          
          // Fallback data - popular Nigerian artists
          const fallbackArtists = [
            {
              id: 'fallback-artist-1',
              name: 'Rema',
              image: '/images/rema-image.png',
              followers: 8500000,
              popularity: 95,
              external_urls: { spotify: '#' },
              genres: ['afrobeats', 'trap']
            },
            {
              id: 'fallback-artist-2',
              name: 'Shallipopi',
              image: '/images/album2.png',
              followers: 7200000,
              popularity: 93,
              external_urls: { spotify: '#' },
              genres: ['afrobeats', 'pop']
            },
            {
              id: 'fallback-artist-3',
              name: 'Asake',
              image: '/images/album1.png',
              followers: 6800000,
              popularity: 91,
              external_urls: { spotify: '#' },
              genres: ['afrobeats', 'pop']
            },
            {
              id: 'fallback-artist-4',
              name: 'Burna Boy',
              image: '/images/album3.png',
              followers: 4200000,
              popularity: 88,
              external_urls: { spotify: '#' },
              genres: ['afrobeats', 'pop']
            },
            {
              id: 'fallback-artist-5',
              name: 'Wizkid',
              image: '/images/wiz-image.png',
              followers: 3500000,
              popularity: 85,
              external_urls: { spotify: '#' },
              genres: ['afrobeats', 'pop']
            }
          ];
          
          const limitedFallback = fallbackArtists.slice(0, input.limit);
          
          return {
            success: false,
            artists: limitedFallback,
            count: limitedFallback.length,
            fallback: true,
            message: `Fallback: Top ${limitedFallback.length} Nigerian artists`,
          };
        }
      } catch (error) {
        console.error('🚨 tRPC Error - Nigerian Artists:', error);
        
        // Return error with fallback data
        const fallbackArtists = [
          {
            id: 'error-fallback-1',
            name: 'Rema',
            image: '/images/rema-image.png',
            followers: 8500000,
            popularity: 95,
            external_urls: { spotify: '#' },
            genres: ['afrobeats', 'trap']
          },
          {
            id: 'error-fallback-2',
            name: 'Shallipopi',
            image: '/images/album2.png',
            followers: 7200000,
            popularity: 93,
            external_urls: { spotify: '#' },
            genres: ['afrobeats', 'pop']
          },
          {
            id: 'error-fallback-3',
            name: 'Asake',
            image: '/images/album1.png',
            followers: 6800000,
            popularity: 91,
            external_urls: { spotify: '#' },
            genres: ['afrobeats', 'pop']
          }
        ];
        
        return {
          success: false,
          error: error.message,
          artists: fallbackArtists.slice(0, input.limit),
          count: Math.min(fallbackArtists.length, input.limit),
          fallback: true,
          message: 'Error fallback data',
        };
      }
    }),
});