import React, { useEffect, useState } from 'react';
import { Container } from '../components/ui/Container';
import UserTenders from '../components/UserTenders';
import UserBids from '../components/UserBids';
import Analytics from '../components/Analytics';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatEther } from 'viem';
import { useContract } from '../hooks/useContract';
import PostTender from '../components/PostTender';
import KYC from '../components/KYC';

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('myTenders');
  const { userTenders, userBids } = useContract();
  const [showPostTender, setShowPostTender] = useState(false);
  const { disconnect } = useDisconnect();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      navigate('/', { replace: true });
    }
  }, [isConnected, navigate]);

  if (!isConnected) return null;

  const stats = {
    totalTenders: userTenders?.length || 0,
    activeBids: userBids?.filter(bid => !bid.selected)?.length || 0,
    totalValue: userTenders?.reduce((total, tender) => {
      try {
        return total + (Number(tender.budget) || 0);
      } catch (error) {
        console.error('Error calculating total value:', error);
        return total;
      }
    }, 0) || 0,
  };

  const tabs = [
    { 
      id: 'myTenders', 
      label: 'My Tenders',
      count: stats.totalTenders,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'myBids', 
      label: 'My Bids',
      count: stats.activeBids,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      id: 'analytics', 
      label: 'Analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: 'kyc', 
      label: 'KYC',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const handleTenderCreated = () => {
    setShowPostTender(false);
    // Refresh the tenders list
    if (activeTab === 'myTenders') {
      // Force a re-render of UserTenders
      setActiveTab('analytics');
      setTimeout(() => setActiveTab('myTenders'), 0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 lg:bg-transparent">
      {/* Mobile Header - Hidden on Desktop */}
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 lg:hidden">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
              <span className="px-2 py-1 text-xs font-medium text-purple-400 bg-purple-400/10 rounded-full">
                {stats.totalTenders} Tenders
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPostTender(true)}
                className="p-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 text-white bg-white/10 rounded-full relative"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                
                {/* Profile Menu Dropdown */}
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 py-2 bg-slate-800 rounded-xl shadow-xl border border-white/10"
                  >
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-sm text-white font-medium">Connected as</p>
                      <p className="text-xs text-gray-400 truncate">
                        {address}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        disconnect();
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Disconnect
                    </button>
                  </motion.div>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Stats Carousel - Hidden on Desktop */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 py-4">
        <div className="flex gap-3">
          {[
            {
              label: 'Total Tenders',
              value: stats.totalTenders,
              icon: tabs[0].icon,
              color: 'purple'
            },
            {
              label: 'Active Bids',
              value: stats.activeBids,
              icon: tabs[1].icon,
              color: 'pink'
            },
            {
              label: 'Total Value',
              value: `${formatEther(stats.totalValue)} ETH`,
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              color: 'green'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-none w-60 bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs">{stat.label}</h3>
                <span className={`text-${stat.color}-400`}>
                  {stat.icon}
                </span>
              </div>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:pt-24">
        <Container>
          <div className="py-4 lg:py-8">
            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                  <p className="text-gray-400 mt-2">
                    Welcome back, {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPostTender(true)}
                  className="px-6 py-3 text-sm font-medium text-white 
                    bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl
                    hover:from-purple-600 hover:to-pink-600 transition-colors
                    shadow-lg shadow-purple-500/20 flex items-center gap-2"
                >
                  <span>Create New Tender</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.button>
              </div>

              {/* Desktop Tabs */}
              <div className="flex mt-8 border-b border-white/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-6 py-3 text-sm font-medium relative
                      ${activeTab === tab.id 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                      }
                      transition-colors
                    `}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-white/10">
                        {tab.count}
                      </span>
                    )}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-6 mb-6">
              {[
                {
                  label: 'Total Tenders',
                  value: stats.totalTenders,
                  icon: tabs[0].icon,
                  color: 'purple'
                },
                {
                  label: 'Active Bids',
                  value: stats.activeBids,
                  icon: tabs[1].icon,
                  color: 'pink'
                },
                {
                  label: 'Total Value',
                  value: `${formatEther(stats.totalValue)} ETH`,
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  color: 'green'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 lg:p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-400 text-xs lg:text-sm">{stat.label}</h3>
                    <span className={`text-${stat.color}-400`}>
                      {stat.icon}
                    </span>
                  </div>
                  <p className="text-lg lg:text-2xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="relative min-h-[400px] lg:min-h-[600px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'myTenders' && <UserTenders />}
                {activeTab === 'myBids' && <UserBids />}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'kyc' && <KYC />}
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sticky bottom-0 z-20 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 py-2 lg:hidden">
        <Container>
          <div className="flex justify-around">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex flex-col items-center p-2 rounded-lg
                  ${activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-gray-400'
                  }
                `}
              >
                <span className={`
                  p-1.5 rounded-lg transition-colors duration-200
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white' 
                    : 'hover:bg-white/5'
                  }
                `}>
                  {tab.icon}
                </span>
                <span className="text-xs mt-1">{tab.label}</span>
                {tab.count > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-purple-500 text-white">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* PostTender Modal */}
      <AnimatePresence>
        {showPostTender && (
          <PostTender 
            onClose={() => setShowPostTender(false)} 
            onSuccess={handleTenderCreated}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 