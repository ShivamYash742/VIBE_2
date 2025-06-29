
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Trophy, Star, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-300/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1.5 border border-primary/20 rounded-full bg-primary/5 text-primary text-sm font-medium animate-fade-in">
            <Star className="h-3.5 w-3.5 mr-2" />
            <span>Challenge yourself with coding games</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Master coding through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              immersive gameplay
            </span>
          </h1>
          
          <p className="text-lg text-foreground/80 max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Enhance your programming skills with interactive AI-powered games. 
            Learn algorithms, web development, security, and more through challenges 
            designed to make learning engaging and effective.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link 
              to="/games" 
              className={cn(
                "flex-1 px-8 py-3 bg-primary text-white rounded-xl font-medium",
                "shadow-lg shadow-primary/20 button-hover",
                "flex items-center justify-center gap-2"
              )}
            >
              Explore Games
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link 
              to="/games/featured" 
              className={cn(
                "flex-1 px-8 py-3 bg-white text-foreground rounded-xl",
                "border border-border shadow-sm button-hover",
                "flex items-center justify-center gap-2"
              )}
            >
              Featured Games
            </Link>
          </div>
          
          <div className="w-full max-w-lg pt-8 grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex flex-col items-center">
              <div className="mb-2 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">AI Games</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-2 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Leaderboards</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-2 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Multiplayer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
