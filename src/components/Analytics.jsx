import React from 'react';
import { motion } from 'framer-motion';
import { useContract } from '../hooks/useContract';

export default function Analytics() {
  const { userTenders, userBids } = useContract();

  const stats = {
    totalTenders: userTenders?.length || 0,
    activeBids: userBids?.filter(bid => !bid.selected).length || 0,
    successRate: calculateSuccessRate(userBids),
    totalValue: calculateTotalValue(userTenders),
  };

  function calculateSuccessRate(bids) {
    if (!bids?.length) return 0;
    const selectedBids = bids.filter(bid => bid.selected).length;
    return Math.round((selectedBids / bids.length) * 100);
  }

  function calculateTotalValue(tenders) {
    if (!tenders?.length) return 0;
    return tenders.reduce((total, tender) => total + Number(tender.budget), 0);
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Tender Activity</h3>
          <div className="h-[250px] flex items-center justify-center">
            <p className="text-gray-400">Activity chart coming soon</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Bid Success Rate</h3>
          <div className="h-[250px] flex items-center justify-center">
            <p className="text-gray-400">Success rate chart coming soon</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {/* Add recent activity items here */}
          <div className="text-gray-400 text-center py-4">
            Recent activity will appear here
          </div>
        </div>
      </motion.div>
    </div>
  );
} 