"use client";

import { useState } from 'react';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export function QueryProvider({ children }: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(
        () => {
            return new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30 * 1000, // 30 seconds
                    },
                },
            })
        }
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}