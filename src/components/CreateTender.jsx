import { useState } from 'react';
import { useContract } from '../hooks/useContract';

export default function CreateTender({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: ''
  });
  const { postTender } = useContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Form data being submitted:', formData);
      
      if (!window.ethereum) {
        throw new Error('Please install MetaMask or another Web3 wallet');
      }

      if (!postTender) {
        throw new Error('Contract interaction not initialized');
      }

      const tx = await postTender({
        title: formData.title,
        description: formData.description,
        budget: formData.budget,
        deadline: formData.deadline
      });
      
      console.log('Transaction response:', tx);
      
      await tx.wait();
      console.log('Transaction confirmed');
      
      setFormData({
        title: '',
        description: '',
        budget: '',
        deadline: ''
      });
      
      if (onSuccess) onSuccess();
      alert('Tender created successfully!');
    } catch (error) {
      console.error('Detailed error:', error);
      alert(`Failed to create tender: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Create New Tender</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget (ETH)
          </label>
          <input
            type="number"
            step="0.001"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deadline
          </label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${isLoading 
              ? 'bg-purple-300 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700'
            }`}
        >
          {isLoading ? 'Creating...' : 'Create Tender'}
        </button>
      </form>
    </div>
  );
} 