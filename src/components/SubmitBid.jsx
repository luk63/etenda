import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { parseEther } from 'viem';
import { useContract } from '../hooks/useContract';

export default function SubmitBid({ tender, onClose }) {
  const [formData, setFormData] = useState({
    amount: '',
    proposal: ''
  });
  const [error, setError] = useState('');
  
  const { submitBid, isSubmitting } = useContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const amountInWei = parseEther(formData.amount);

      await submitBid({
        args: [
          tender.id,
          amountInWei,
          formData.proposal
        ]
      });

      onClose();
    } catch (error) {
      console.error('Error submitting bid:', error);
      setError(error.message || 'Failed to submit bid');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-800 rounded-2xl p-6 w-full max-w-lg border border-white/10"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Submit Bid
          <span className="text-sm font-normal text-gray-400 block mt-1">
            For: {tender.title}
          </span>
        </h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Bid Amount (ETH)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              max={formatEther(tender.budget)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl 
                text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Proposal
            </label>
            <textarea
              name="proposal"
              value={formData.proposal}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl 
                text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                focus:ring-purple-500/50"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 
                bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-sm font-medium text-white 
                bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl
                hover:from-purple-600 hover:to-pink-600 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Bid'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 