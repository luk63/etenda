import React from 'react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/react';

export default function Hero() {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const navigate = useNavigate();

  const handleStartNow = async () => {
    if (isConnected) {
      navigate('/dashboard');
    } else {
      try {
        await open();
      } catch (error) {
        console.error('Connection error:', error);
      }
    }
  };

  return (
    <div id="home" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] bg-pink-500/20 rounded-full blur-3xl" />
      
      <Container className="relative">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl">
                <span className="block mb-2">Simplify Tendering with</span>
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Blockchain Technology
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-300 sm:text-xl md:text-2xl">
                A secure and transparent platform for posting and bidding on tenders. 
                Perfect for businesses and contractors.
              </p>
            </motion.div>

            <motion.div 
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Button 
                variant="primary" 
                onClick={handleStartNow}
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isConnected ? 'Go to Dashboard' : 'Connect Wallet'}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={isConnected 
                      ? "M13 7l5 5m0 0l-5 5m5-5H6" 
                      : "M12 15v2m0 0l3 3m-3-3l-3 3m0-6v2m0 0l3 3m-3-3l-3 3m15-9a9 9 0 11-18 0 9 9 0 0118 0z"
                    }
                  />
                </svg>
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-200 text-white flex items-center justify-center gap-2"
              >
                Learn More
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {[
                {
                  icon: (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ),
                  label: 'Secure'
                },
                {
                  icon: (
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                  ),
                  label: 'Transparent'
                },
                {
                  icon: (
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  ),
                  label: 'Fast'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-center space-x-2 text-gray-300 bg-white/5 backdrop-blur-sm rounded-lg p-4"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    {feature.icon}
                  </svg>
                  <span className="text-lg font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}