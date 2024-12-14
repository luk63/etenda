import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import TenderList from '../components/TenderList';
import { useContract } from '../hooks/useContract';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  RefreshCw, 
  SlidersHorizontal, 
  Menu,
  X,
  Home,
  FileText,
  PlusCircle,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Tenders() {
  const { contract, isInitialized } = useContract();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      // Trigger refresh in TenderList component
      await contract?.getRecentTenders();
      // You'll need to pass this state to TenderList to trigger a refresh
    } catch (error) {
      console.error('Error refreshing tenders:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [contract]);

  // Handle logout
  const handleLogout = useCallback(() => {
    // Add your logout logic here
    localStorage.removeItem('user_token'); // Or however you store auth
    navigate('/login');
    setIsMenuOpen(false);
  }, [navigate]);

  // Handle post tender
  const handlePostTender = useCallback(() => {
    if (!isInitialized) {
      alert('Please connect your wallet first');
      return;
    }
    navigate('/post-tender');
  }, [isInitialized, navigate]);

  const filters = [
    { id: 'all', label: 'All Tenders' },
    { id: 'open', label: 'Open' },
    { id: 'closed', label: 'Closed' },
    { id: 'awarded', label: 'Awarded' }
  ];

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: FileText, label: 'My Tenders', path: '/my-tenders' },
    { icon: PlusCircle, label: 'Post Tender', path: '/post-tender', onClick: handlePostTender },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 rounded-full filter blur-[80px] md:blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500/10 rounded-full filter blur-[80px] md:blur-[128px] animate-pulse delay-700" />
      </div>

      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-xl bg-slate-800/90 border border-white/10 backdrop-blur-sm
            text-gray-400 hover:text-white transition-colors duration-200"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sliding Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-slate-800/95 backdrop-blur-sm border-l 
                border-white/10 z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* User Section */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    <div>
                      <h3 className="text-white font-medium">John Doe</h3>
                      <p className="text-sm text-gray-400">john@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6">
                  <div className="px-3 space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={(e) => {
                            if (item.onClick) {
                              e.preventDefault();
                              item.onClick();
                            }
                            setIsMenuOpen(false);
                          }}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                            transition-all duration-200 group
                            ${isActive 
                              ? 'bg-purple-500 text-white' 
                              : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'
                            }`}
                        >
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* Bottom Section */}
                <div className="p-6 border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium text-white
                      bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                      transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative min-h-screen pt-20 md:pt-24">
        <Container className="px-4 sm:px-6 lg:px-8 pb-20">
          {/* Mobile Header */}
          <div className="md:hidden mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
            >
              Explore Tenders
            </motion.h1>
            <p className="text-base text-gray-400">
              Browse available opportunities
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Explore Tenders
              </h1>
              <p className="text-lg text-gray-400">
                Browse and bid on available blockchain-based tender opportunities
              </p>
            </motion.div>

            {/* Desktop Header Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={handlePostTender}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white 
                  bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl
                  hover:from-purple-600 hover:to-pink-600 transition-all duration-300
                  shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
              >
                <Plus className="w-4 h-4" />
                Post Tender
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-3 text-gray-400 hover:text-white bg-slate-800/50 rounded-xl border border-white/5
                  hover:border-purple-500/30 transition-all duration-300 ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Mobile Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden space-y-4 mb-6"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tenders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-white/5 rounded-xl
                    text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/30
                    text-sm transition-all duration-300"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2.5 text-gray-400 hover:text-white bg-slate-800/50 rounded-xl border border-white/5
                  hover:border-purple-500/30 transition-all duration-300"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 p-4 bg-slate-800/30 rounded-xl border border-white/5">
                    {filters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                          ${selectedFilter === filter.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-800/50 text-gray-400 hover:text-white'
                          }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:grid gap-6 grid-cols-[1fr,auto] mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tenders by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl
                  text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/30
                  transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="appearance-none w-48 pl-12 pr-10 py-3 bg-slate-800/50 border border-white/5 
                  rounded-xl text-white focus:outline-none focus:border-purple-500/30
                  transition-all duration-300 cursor-pointer"
              >
                {filters.map(filter => (
                  <option key={filter.id} value={filter.id} className="bg-slate-800">
                    {filter.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Mobile Post Tender Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mb-6"
          >
            <Link
              to="/post-tender"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white 
                bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl
                hover:from-purple-600 hover:to-pink-600 transition-all duration-300
                shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-4 h-4" />
              Post New Tender
            </Link>
          </motion.div>

          {/* Updated TenderList */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/30 rounded-2xl md:rounded-3xl border border-white/5 backdrop-blur-sm
              shadow-xl shadow-purple-500/5"
          >
            <TenderList 
              searchQuery={searchQuery}
              statusFilter={selectedFilter}
              isRefreshing={isRefreshing}
            />
          </motion.div>
        </Container>
      </div>
    </main>
  );
} 