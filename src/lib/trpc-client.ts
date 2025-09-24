import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './routers';

// Create the tRPC React hooks with proper typing
export const trpc = createTRPCReact<AppRouter>();