import React from 'react';
import { Container } from '../components/ui/Container';
import TenderList from '../components/TenderList';

export default function Home() {
  return (
    <main className="flex-1 py-12">
      <Container>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Active Tenders</h1>
            <p className="text-gray-400">Browse and bid on available tenders</p>
          </div>
          
          <TenderList />
        </div>
      </Container>
    </main>
  );
} 