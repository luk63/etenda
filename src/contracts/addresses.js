// Network IDs
export const NETWORK_IDS = {
  MAINNET: 1,
  SEPOLIA: 11155111,
  BASE_MAINNET: 8453,
  BASE_SEPOLIA: 84532,
};

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  [NETWORK_IDS.MAINNET]: '0x7e767A270111a8957FCc69ee3ea95bD0c9F67708',
  [NETWORK_IDS.SEPOLIA]: '0x7e767A270111a8957FCc69ee3ea95bD0c9F67708',
  [NETWORK_IDS.BASE_MAINNET]: '0x7e767A270111a8957FCc69ee3ea95bD0c9F67708',
  [NETWORK_IDS.BASE_SEPOLIA]: '0x7e767A270111a8957FCc69ee3ea95bD0c9F67708',
};

// Get contract address by network ID
export function getContractAddress(networkId) {
  return CONTRACT_ADDRESSES[networkId] || null;
} 