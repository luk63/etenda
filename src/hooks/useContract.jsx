import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { tenderABI } from '../constants/abis';

export function useContract() {
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  useEffect(() => {
    const initContract = async () => {
      try {
        if (!window.ethereum) {
          throw new Error('No Web3 provider found');
        }

        if (!contractAddress) {
          throw new Error('Contract address not configured');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Verify network and account
        await provider.getNetwork();
        await signer.getAddress();
        
        const tenderContract = new ethers.Contract(
          contractAddress,
          tenderABI,
          signer
        );
        
        setContract(tenderContract);
        setError(null);
      } catch (err) {
        console.error('Contract initialization error:', err);
        setError(err.message);
        setContract(null);
      }
    };

    initContract();

    // Re-initialize on account or network change
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', initContract);
      window.ethereum.on('chainChanged', initContract);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', initContract);
        window.ethereum.removeListener('chainChanged', initContract);
      };
    }
  }, [contractAddress]);

  const postTender = async ({ title, description, budget, deadline }) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized. Please check your wallet connection.');
      }

      if (!title || !description || !budget || !deadline) {
        throw new Error('All fields are required');
      }

      // Convert budget from ETH to Wei
      const budgetInWei = ethers.utils.parseEther(budget.toString());
      
      // Convert deadline to Unix timestamp
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
      
      console.log('Submitting tender with params:', {
        title,
        description,
        budgetInWei: budgetInWei.toString(),
        deadlineTimestamp
      });

      const tx = await contract.postTender(
        title,
        description,
        budgetInWei,
        deadlineTimestamp
      );
      
      console.log('Transaction submitted:', tx.hash);
      
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);
      
      return receipt;
    } catch (error) {
      console.error('Error posting tender:', error);
      throw new Error(error.message || 'Failed to post tender');
    }
  };

  return {
    contract,
    error,
    postTender,
    isInitialized: !!contract,
  };
} 