import { useState, useEffect } from 'react';
import { useContract } from '../hooks/useContract';
import { formatEther } from 'viem';

export default function TenderList() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contract, error: contractError } = useContract();

  useEffect(() => {
    if (contract) {
      fetchTenders();
    } else if (contractError) {
      setError(`Contract Error: ${contractError}`);
      setLoading(false);
    }
  }, [contract, contractError]);

  const fetchTenders = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!contract) throw new Error("Contract not initialized");

      // Get recent tenders directly using the getRecentTenders function
      const tenderList = await contract.getRecentTenders(10);

      const formattedTenders = tenderList.map(tender => ({
        id: tender.id.toString(),
        title: tender.title,
        description: tender.description,
        budget: formatEther(tender.budget),
        deadline: new Date(Number(tender.deadline) * 1000).toLocaleString(),
        status: getStatusText(tender.status),
        owner: tender.owner
      }));

      setTenders(formattedTenders);
    } catch (error) {
      console.error('Error fetching tenders:', error);
      setError(`Failed to load tenders: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    switch (Number(status)) {
      case 0:
        return 'Open';
      case 1:
        return 'Closed';
      case 2:
        return 'Awarded';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchTenders}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="tender-list">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Listed Tenders</h2>
        <button 
          onClick={fetchTenders}
          className="px-4 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Refresh
        </button>
      </div>

      {tenders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No tenders found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tenders.map((tender) => (
            <div key={tender.id} className="bg-slate-800 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">{tender.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-2">{tender.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Budget</span>
                  <span className="text-white font-medium">{tender.budget} ETH</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Deadline</span>
                  <span className="text-white font-medium">{tender.deadline}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tender.status === 'Open' ? 'bg-green-500/10 text-green-400' :
                    tender.status === 'Closed' ? 'bg-red-500/10 text-red-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {tender.status}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-sm text-gray-400 truncate">
                    <span className="font-medium">Owner:</span>
                    <span className="ml-2">{tender.owner}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 