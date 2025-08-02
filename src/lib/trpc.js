import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Initialize tRPC
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/context
   */
  // context: createContext,
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
  /**
   * @see https://trpc.io/docs/server/error-formatting
   */
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof z.ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

// Export reusable router and procedure helpers
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;