import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const walletConnectProjectId: string = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '953b8aabd42f299570ac0cb2509db530';
const providerKey: string = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}` || 'https://eth-sepolia.g.alchemy.com/v2/wZa6j3JHIYRda8QJfH7wpxO45xcadbRb';

export const config = getDefaultConfig({
  transports: {
    [sepolia.id]: http(providerKey),
  },
    appName: 'My-first-dapp',
    projectId: walletConnectProjectId,
    chains: [sepolia],
    ssr: true,
  });
