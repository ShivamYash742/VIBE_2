
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Award, MessageCircle, BarChart } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="container mx-auto py-5 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-xl">E</span>
        </div>
        <span className="text-xl font-bold">Eduverse</span>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Book size={18} />
          <span>Courses</span>
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Award size={18} />
          <span>Quizzes</span>
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
          <MessageCircle size={18} />
          <span>Chatbot</span>
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Community</span>
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
          <BarChart size={18} />
          <span>Leaderboard</span>
        </a>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:block text-sm font-medium text-foreground hover:text-primary transition-colors">
          Login
        </button>
        <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-full text-white text-sm font-medium transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
