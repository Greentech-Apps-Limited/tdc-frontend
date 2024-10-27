'use client';

import { SWRConfig } from 'swr';
import { swrConfig } from '@/services/swr-config';

export function SWRConfigProviders({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
