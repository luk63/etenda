import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <div className="hidden lg:block mt-auto">
        <Footer />
      </div>
    </div>
  );
} 