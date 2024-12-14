import React, { useEffect, useState } from 'react';
import { Container } from './ui/Container';
import { Logo } from './ui/Logo';
import { DesktopMenu } from './navigation/DesktopMenu';
import { MobileMenu } from './navigation/MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';
import PostTender from './PostTender';
import { useAccount } from 'wagmi';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPostTender, setShowPostTender] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      navigate('/', { replace: true });
    }
  }, [isConnected, navigate]);

  const ActionButtons = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'mt-4 pt-4 border-t border-white/[0.05] space-y-3' : 'flex items-center gap-4'}`}>
      {isConnected && (
        <Link
          to="/dashboard"
          className="text-sm font-medium text-white 
            bg-white/10 rounded-xl hover:bg-white/20 
            transition-all duration-200 px-4 py-2"
        >
          Dashboard
        </Link>
      )}
      <motion.button 
        whileHover={!isMobile ? { scale: 1.05 } : {}}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!isConnected) {
            alert('Please connect your wallet first');
            return;
          }
          setShowPostTender(true);
        }}
        className={`
          text-sm font-medium text-white 
          bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 
          rounded-xl transition-all duration-200
          shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30
          bg-300% animate-gradient flex items-center gap-2
          ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}
          ${isMobile ? 'w-full px-4 py-3 justify-center' : 'px-5 py-2.5'}
        `}
      >
        <span>{isConnected ? 'Post Tender' : 'Connect Wallet to Post'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    </div>
  );

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20">
      <div className={`w-full h-full transition-all duration-300 
        ${scrolled 
          ? 'bg-slate-900/70 backdrop-blur-xl border-b border-white/[0.05] shadow-lg shadow-purple-500/5' 
          : 'bg-transparent'
        }
      `}>
        <Container className="h-full">
          <div className="relative flex items-center justify-between h-full">
            <div className="flex-1 flex items-center justify-between">
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/">
                  <Logo scrolled={scrolled} />
                </Link>
              </motion.div>
              
              {/* Desktop Menu - centered */}
              <div className="hidden lg:flex items-center justify-center flex-1 px-8">
                <DesktopMenu />
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:block">
                <ActionButtons />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl
                  text-gray-300 hover:text-white 
                  bg-white/[0.05] hover:bg-white/[0.1]
                  backdrop-blur-sm transition-all duration-200
                  focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile menu panel with enhanced animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute w-full"
            >
              <div className="px-4 pt-2 pb-3 space-y-1 
                bg-slate-900/95 backdrop-blur-xl border-t border-white/[0.05]
                shadow-lg shadow-purple-500/5"
              >
                <MobileMenu />
                <ActionButtons isMobile />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showPostTender && <PostTender onClose={() => setShowPostTender(false)} />}
    </nav>
  );
}