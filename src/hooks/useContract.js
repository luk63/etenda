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

        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Get the network to verify connection
        const network = await provider.getNetwork();
        console.log('Connected to network:', network);

        const tenderContract = new ethers.Contract(
          contractAddress,
          tenderABI,
          signer
        );

        // Log available functions
        console.log('Available contract functions:', Object.keys(tenderContract.functions));
        
        setContract(tenderContract);
        setError(null);
      } catch (err) {
        console.error('Contract initialization error:', err);
        setError(err.message);
        setContract(null);
      }
    };

    initContract();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', initContract);
      window.ethereum.on('chainChanged', initContract);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', initContract);
        window.ethereum.removeListener('chainChanged', initContract);
      };
    }
  }, [contractAddress]);

  const getRecentTenders = async (limit = 10) => {
    try {
      if (!contract) throw new Error("Contract not initialized");
      const tenders = await contract.getRecentTenders(limit);
      return tenders;
    } catch (error) {
      console.error("Error getting recent tenders:", error);
      throw error;
    }
  };

  const postTender = async ({ title, description, budget, deadline }) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized. Please check your wallet connection.');
      }

      if (!title || !description || !budget || !deadline) {
        throw new Error('All fields are required');
      }

      const budgetInWei = ethers.utils.parseEther(budget.toString());
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

      const tx = await contract.postTender(
        title,
        description,
        budgetInWei,
        deadlineTimestamp,
        { gasLimit: 500000 }
      );
      
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error('Error posting tender:', error);
      throw error;
    }
  };

  return {
    contract,
    error,
    postTender,
    getRecentTenders,
    isInitialized: !!contract,
    contractAddress
  };
} 