import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import { formatEther } from 'viem';
import { motion } from 'framer-motion';

export default function UserBids() {
  const { userBids, isUserBidsLoading, error } = useContract();

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-red-400">{error}</h3>
      </div>
    );
  }

  if (isUserBidsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!userBids?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-gray-400">You haven't placed any bids yet</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {userBids.map((bid, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{bid.tender.title}</h3>
              <p className="text-gray-400 mt-1">{bid.proposal}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              bid.selected ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
            }`}>
              {bid.selected ? 'Selected' : 'Pending'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <span className="text-gray-400 text-sm">Your Bid</span>
              <p className="text-white font-medium mt-1">
                {formatEther(bid.amount)} ETH
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <span className="text-gray-400 text-sm">Tender Budget</span>
              <p className="text-white font-medium mt-1">
                {formatEther(bid.tender.budget)} ETH
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 