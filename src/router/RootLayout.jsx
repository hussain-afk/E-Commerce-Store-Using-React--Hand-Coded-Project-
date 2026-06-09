import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function RootLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    // 1. Lock the outer window frame to exactly 100vh
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* Global Header */}
      <Header onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* 2. Flex wrapper handles the remaining height below the header */}
      <div className="flex flex-1 min-h-0 relative">
        
        {/* Sidebar Container */}
        {/* h-full here makes sure it fills exactly the remaining space underneath the header */}
        <div className="h-full shrink-0">
          <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
        </div>

        {/* 3. Main Content Container */}
        {/* This creates an independent scroll box for your products only */}
        <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
          <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>

    </div>
  );
}