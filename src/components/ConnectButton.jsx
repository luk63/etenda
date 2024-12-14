import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';

export function ConnectButton() {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <motion.button
                    onClick={openConnectModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 text-sm font-medium text-white 
                      bg-gradient-to-r from-purple-500 to-pink-500 
                      rounded-xl hover:from-purple-600 hover:to-pink-600 
                      transition-all duration-200"
                  >
                    Connect Wallet
                  </motion.button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={openChainModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-gray-300 
                      bg-white/10 rounded-xl hover:bg-white/20 
                      transition-all duration-200"
                  >
                    {chain.name}
                  </motion.button>

                  <motion.button
                    onClick={openAccountModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-white 
                      bg-gradient-to-r from-purple-500 to-pink-500 
                      rounded-xl hover:from-purple-600 hover:to-pink-600 
                      transition-all duration-200"
                  >
                    {account.displayName}
                  </motion.button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
} 