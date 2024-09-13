import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import type { Chain } from 'viem'

const walletConnectProjectId: string = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '953b8aabd42f299570ac0cb2509db530';
const fhenix = {
  id: 8008135,
  name: 'Fhenix',
  nativeCurrency: { name: 'tFHE', symbol: 'FHE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://api.helium.fhenix.zone'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.helium.fhenix.zone' },
  },
  contracts: {
      ensRegistry: {
        address: '0x0',
    },
    ensUniversalResolver: {
      address: '0x0',
      blockCreated: 16773775,
    },
    multicall3: {
      // not supported?
      address: '0x',
      blockCreated: 8123891232939923,
    },
  },
} as const satisfies Chain

export const config = getDefaultConfig({
  transports: {
    [fhenix.id]: http(),
  },
    appName: 'My-first-dapp',
    projectId: walletConnectProjectId,
    chains: [fhenix],
    ssr: true,
  });
