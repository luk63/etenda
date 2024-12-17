import { useContractRead, useContractWrite } from 'wagmi'
import { tenderABI } from '../constants/abis'

export function useContract() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

  // Read functions
  const { data: contract, error } = useContractRead({
    address: contractAddress,
    abi: tenderABI,
  })

  return {
    contract,
    error: error?.message
  }
} 