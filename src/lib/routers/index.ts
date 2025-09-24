import { createTRPCRouter } from '../trpc';
import { spotifyRouter } from './spotify';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  spotify: spotifyRouter,
});

// Export for inference (if using TypeScript elsewhere)
export type AppRouter = typeof appRouter;