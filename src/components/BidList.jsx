import React from 'react';
import { motion } from 'framer-motion';
import { formatEther } from 'viem';
import { useContract } from '../hooks/useContract';

export default function BidList({ tender, onClose, onAward }) {
  const { getTenderBids } = useContract();
  const bids = getTenderBids(tender.id);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl border border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Bids for {tender.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {bids.map((bid, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-sm text-gray-400">Bidder</span>
                  <p className="text-white font-medium">{bid.bidder}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400">Amount</span>
                  <p className="text-white font-medium">{formatEther(bid.amount)} ETH</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-400">Proposal</span>
                <p className="text-white mt-1">{bid.proposal}</p>
              </div>

              {tender.status === 0 && (
                <button
                  onClick={() => onAward(tender.id, index)}
                  className="w-full px-4 py-2 text-sm font-medium text-white 
                    bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl
                    hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  Award Tender
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 