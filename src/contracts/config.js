export const CONTRACT_CONFIG = {
  // Contract deployment settings
  CONFIRMATION_BLOCKS: 2,
  GAS_LIMIT: 500000,
  
  // Contract interaction settings
  DEFAULT_GAS_PRICE: '5000000000', // 5 gwei
  
  // Network settings
  SUPPORTED_NETWORKS: [1, 11155111, 8453, 84532], // Mainnet, Sepolia, Base Mainnet, Base Sepolia
  DEFAULT_NETWORK: 84532, // Default to Base Sepolia
}; 