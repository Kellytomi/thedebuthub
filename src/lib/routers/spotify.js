import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { getMostStreamedNigerianAlbums, getNigerianTracks, getNigerianArtists, getTopChartArtist } from '../api/spotify';

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
        const albums = await getMostStreamedNigerianAlbums(input.limit);
        
        if (albums && albums.length > 0) {
          return {
            success: true,
            albums,
            count: albums.length,
            message: `Top ${albums.length} most streamed Nigerian albums`,
          };
        } else {
          return {
            success: false,
            albums: [],
            count: 0,
            message: 'No albums found from Spotify API',
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
          albums: [],
          count: 0,
          message: 'Error fetching albums from Spotify API',
        };
      }
    }),

  // Get Nigerian tracks
  getTracks: publicProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(50).default(12),
        playlistId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const tracks = await getNigerianTracks(input.limit, input.playlistId);

        return {
          success: true,
          tracks,
          count: tracks.length,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          tracks: [],
          count: 0,
        };
      }
    }),

  // Get top chart artist with profile image
  getTopChartArtist: publicProcedure
    .query(async () => {
      try {
        const artist = await getTopChartArtist();
        return {
          success: true,
          artist,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          artist: null,
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
        const artists = await getNigerianArtists(input.limit);

        if (artists && artists.length > 0) {
          return {
            success: true,
            artists,
            count: artists.length,
            message: `Top ${artists.length} Nigerian artists`,
          };
        } else {
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