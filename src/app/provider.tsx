'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { config } from '@/config/wagmi.config';

const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({
          accentColor: '#A9DDE0',
          accentColorForeground:'white',
          borderRadius: 'large',
          fontStack: 'rounded',
          overlayBlur: 'none'
        })}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
