import React from 'react';
import { useContract } from '../hooks/useContract';
import TenderList from './TenderList';

export default function UserTenders() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TenderList />
    </div>
  );
} 