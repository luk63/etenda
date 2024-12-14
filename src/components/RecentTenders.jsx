import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './ui/Container';
import { useContract } from '../hooks/useContract';
import { formatEther } from 'viem';
import { Link } from 'react-router-dom';
import { CalendarDays, Coins, Users, ArrowRight } from 'lucide-react';

export default function RecentTenders() {
  const { contract } = useContract();
  const [recentTenders, setRecentTenders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchRecentTenders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (!contract) throw new Error("Contract not initialized");
        const tenders = await contract.getRecentTenders(3);
        setRecentTenders(tenders);
      } catch (err) {
        console.error('Error fetching recent tenders:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentTenders();
  }, [contract]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[128px] animate-pulse delay-500" />
      </div>

      <Container className="relative">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 backdrop-blur-sm">
              Blockchain Tenders
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-5xl font-bold tracking-tight text-white md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
          >
            Featured Opportunities
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Discover and bid on the latest blockchain-based tender opportunities
          </motion.p>
        </div>

        {/* Enhanced Content Section */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/20 rounded-full animate-pulse" />
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-purple-500 rounded-full animate-spin" />
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12 px-6 rounded-3xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm"
            >
              <p className="text-red-400 text-lg">{error}</p>
            </motion.div>
          ) : recentTenders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16 px-6 rounded-3xl bg-slate-800/50 border border-white/10 backdrop-blur-sm"
            >
              <p className="text-gray-400 text-lg">No tenders available at the moment</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 lg:grid-cols-3"
            >
              {recentTenders.map((tender, index) => (
                <motion.div
                  key={tender.id.toString()}
                  variants={itemVariants}
                  className="group relative"
                  onHoverStart={() => setActiveIndex(index)}
                  onHoverEnd={() => setActiveIndex(null)}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-sm border border-white/10 transition-all duration-500 
                    hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1">
                    {/* Enhanced Card Header */}
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <span className={`px-4 py-1.5 text-sm font-medium rounded-full 
                          ${Number(tender.status) === 0 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : Number(tender.status) === 1 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}
                        >
                          {Number(tender.status) === 0 ? 'Open' : Number(tender.status) === 1 ? 'Closed' : 'Awarded'}
                        </span>
                        <span className="text-sm text-gray-400 font-mono">
                          #{tender.id.toString().padStart(3, '0')}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 line-clamp-1">
                        {tender.title}
                      </h3>
                      <p className="text-gray-400 line-clamp-2 mb-6 min-h-[48px]">
                        {tender.description}
                      </p>

                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                          <Coins className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-sm text-gray-400">Budget</p>
                            <p className="text-lg font-semibold text-white">
                              {formatEther(tender.budget)} ETH
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CalendarDays className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-sm text-gray-400">Deadline</p>
                            <p className="text-sm font-medium text-white">
                              {new Date(Number(tender.deadline) * 1000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Card Footer */}
                    <div className="p-8 bg-slate-800/80 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-purple-400" />
                          <span className="text-sm text-gray-400">Owner</span>
                        </div>
                        <span className="text-sm font-medium text-white font-mono">
                          {`${tender.owner.slice(0, 6)}...${tender.owner.slice(-4)}`}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 
                      ${activeIndex === index ? 'opacity-100' : ''}`} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            to="/tenders"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white 
              bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl
              hover:from-purple-600 hover:to-pink-600 transition-all duration-300
              shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30
              transform hover:-translate-y-0.5"
          >
            View All Tenders
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
} 