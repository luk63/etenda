import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  mainnet,
  sepolia,
  base,
  baseSepolia
} from "wagmi/chains";
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  rainbowWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http } from 'viem';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;

if (!projectId) {
  throw new Error('Missing VITE_WALLETCONNECT_PROJECT_ID');
}

if (!alchemyApiKey) {
  throw new Error('Missing VITE_ALCHEMY_API_KEY');
}

const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet,
      walletConnectWallet,
      coinbaseWallet,
      rainbowWallet,
      trustWallet,
      ledgerWallet,
    ],
  },
];

const connectors = connectorsForWallets(walletGroups, {
  appName: 'Etenda',
  projectId,
});

export const config = getDefaultConfig({
  appName: 'Etenda',
  projectId,
  chains: [mainnet, sepolia, base, baseSepolia],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
    [base.id]: http('https://mainnet.base.org'),
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
  ssr: false,
}); 