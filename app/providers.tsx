'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, bsc, avalanche, base } from 'wagmi/chains';
import { walletConnect, coinbaseWallet, metaMask } from 'wagmi/connectors';
import { ReactNode, useState } from 'react';

// Create query client inside component to avoid SSR issues
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  const [config] = useState(() => createConfig({
    chains: [mainnet, polygon, arbitrum, optimism, bsc, avalanche, base],
    connectors: [
      metaMask({ 
        dappMetadata: {
          name: 'NoLimit Swap',
        },
      }),
      walletConnect({ 
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '0123456789abcdef0123456789abcdef',
        showQrModal: true,
        metadata: {
          name: 'NoLimit Swap',
          description: 'Privacy-focused decentralized exchange',
          url: 'https://nolimit.com',
          icons: ['https://nolimit.com/logo.png'],
        },
      }),
      coinbaseWallet({ 
        appName: 'NoLimit Swap',
        appLogoUrl: 'https://nolimit.com/logo.png',
      }),
    ],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [arbitrum.id]: http(),
      [optimism.id]: http(),
      [bsc.id]: http(),
      [avalanche.id]: http(),
      [base.id]: http(),
    },
  }));

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

