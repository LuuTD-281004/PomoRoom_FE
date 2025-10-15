import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from '../Navbar';
import { ChatBot } from '@/Components/ChatBot';

const LayoutWithChatBot: React.FC = () => {
  return (
    <div className="min-h-screen flex w-screen flex-col">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <Navbar />
      </div>
      <main className="flex-1 pt-[136px]">
        <Outlet />
      </main>
      
      <ChatBot />
    </div>
  );
};

export default LayoutWithChatBot;