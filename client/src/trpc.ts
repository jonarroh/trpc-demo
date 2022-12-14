import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../../src/index';

export const trpc = createReactQueryHooks<AppRouter>();
