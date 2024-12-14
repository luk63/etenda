import React, { useState, useEffect } from 'react';
import { useContract } from '../hooks/useContract';
import { motion, AnimatePresence } from 'framer-motion';
import { parseEther } from 'viem';
import { useAccount, useChainId, usePublicClient, useConnect } from 'wagmi';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';

export default function PostTender({ onClose }) {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const publicClient = usePublicClient();
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: ''
  });
  
  const { postTender, error: contractError, isInitialized } = useContract();
  
  // Check wallet connection
  const checkAndConnectWallet = async () => {
    if (!isConnected) {
      try {
        const wallet = metaMaskWallet();
        await connect({ connector: wallet });
        return false;
      } catch (error) {
        console.error('Wallet connection error:', error);
        setError('Please connect your wallet to post a tender');
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (!isConnected) {
      onClose();
    }
  }, [isConnected, onClose]);

  // Check for supported network
  useEffect(() => {
    if (chainId && !isInitialized) {
      setError('Please switch to a supported network (Mainnet or Sepolia)');
    } else {
      setError('');
    }
  }, [chainId, isInitialized]);

  if (!isConnected || !isInitialized) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsConfirming(true);
    
    try {
      // Check wallet connection first
      const isWalletConnected = await checkAndConnectWallet();
      if (!isWalletConnected) {
        setIsConfirming(false);
        return;
      }

      // Validate inputs
      if (!formData.title.trim()) throw new Error('Title is required');
      if (!formData.description.trim()) throw new Error('Description is required');
      if (!formData.budget || parseFloat(formData.budget) <= 0) throw new Error('Budget must be greater than 0');
      if (!formData.deadline) throw new Error('Deadline is required');

      // Convert and validate timestamp
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const deadlineDate = new Date(formData.deadline);
      const deadlineTimestamp = Math.floor(deadlineDate.getTime() / 1000);
      
      if (isNaN(deadlineTimestamp)) throw new Error('Please enter a valid deadline');
      if (deadlineTimestamp <= currentTimestamp) throw new Error('Deadline must be in the future');

      console.log('Submitting tender with data:', {
        title: formData.title.trim(),
        description: formData.description.trim(),
        budget: formData.budget,
        deadline: deadlineTimestamp
      });

      // Submit tender
      const receipt = await postTender({
        title: formData.title.trim(),
        description: formData.description.trim(),
        budget: formData.budget,
        deadline: formData.deadline
      });

      console.log('Transaction successful:', receipt);
      alert('Tender created successfully!');
      onClose();
      
    } catch (error) {
      console.error('Error posting tender:', error);
      setError(error.message || 'Failed to post tender');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-slate-800 rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Create New Tender</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-slate-700/50 border border-white/10 rounded-xl 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter tender title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-3 py-2 bg-slate-700/50 border border-white/10 rounded-xl 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter tender description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Budget (ETH)
            </label>
            <input
              type="number"
              step="0.001"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-slate-700/50 border border-white/10 rounded-xl 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter budget in ETH"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Deadline
            </label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-slate-700/50 border border-white/10 rounded-xl 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-300 
                bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isConfirming}
              className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-xl
                ${isConfirming 
                  ? 'bg-purple-500/50 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                } transition-colors`}
            >
              {isConfirming ? 'Posting...' : 'Post Tender'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 