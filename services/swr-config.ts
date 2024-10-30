
import { SWRConfiguration } from 'swr';

export const swrConfig: SWRConfiguration = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: true,
    dedupingInterval: 24 * 60 * 60 * 1000,
    errorRetryCount: 3,
    shouldRetryOnError: true,
    errorRetryInterval: 1000,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404
        if (error.status === 404) return;
        // Only retry up to 3 times
        if (retryCount >= 3) return;
        // Retry after 1 second
        setTimeout(() => revalidate({ retryCount }), 1000);
    }
};