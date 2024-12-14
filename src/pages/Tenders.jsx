import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import TenderList from '../components/TenderList';
import { Search, Filter, Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Tenders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Tenders' },
    { id: 'open', label: 'Open' },
    { id: 'closed', label: 'Closed' },
    { id: 'awarded', label: 'Awarded' }
  ];

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Fixed position background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full filter blur-[128px] animate-pulse delay-700" />
      </div>

      {/* Main content with proper spacing for navbar */}
      <div className="relative min-h-screen pt-24">
        <Container className="px-4 sm:px-6 lg:px-8 pb-20">
          {/* Header Section */}
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Explore Tenders
              </h1>
              <p className="text-lg text-gray-400">
                Browse and bid on available blockchain-based tender opportunities
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <Link
                to="/post-tender"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white 
                  bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl
                  hover:from-purple-600 hover:to-pink-600 transition-all duration-300
                  shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
              >
                <Plus className="w-4 h-4" />
                Post Tender
              </Link>
              <button
                className="p-3 text-gray-400 hover:text-white bg-slate-800/50 rounded-xl border border-white/5
                  hover:border-purple-500/30 transition-all duration-300
                  shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-6 md:grid-cols-[1fr,auto] mb-8"
          >
            {/* Search Bar */}
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

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="appearance-none w-full md:w-48 pl-12 pr-10 py-3 bg-slate-800/50 border border-white/5 
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

          {/* Tender List with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/30 rounded-3xl border border-white/5 backdrop-blur-sm
              shadow-xl shadow-purple-500/5"
          >
            <TenderList 
              searchQuery={searchQuery}
              statusFilter={selectedFilter}
            />
          </motion.div>
        </Container>
      </div>
    </main>
  );
} 