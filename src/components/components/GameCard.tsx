
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Code, Shield } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  link: string;
  icon: 'ai' | 'code' | 'security';
  gradientFrom: string;
  gradientTo: string;
}

const GameCard = ({ title, description, link, icon, gradientFrom, gradientTo }: GameCardProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'ai':
        return <Brain className="text-primary" size={32} />;
      case 'code':
        return <Code className="text-primary" size={32} />;
      case 'security':
        return <Shield className="text-primary" size={32} />;
      default:
        return <Brain className="text-primary" size={32} />;
    }
  };

  return (
    <Link to={link} className="bg-secondary rounded-xl overflow-hidden card-hover">
      <div className={`h-48 bg-gradient-to-br from-${gradientFrom}/20 to-${gradientTo}/20 flex items-center justify-center`}>
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          {renderIcon()}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {description}
        </p>
        <div className="flex items-center text-primary">
          <span className="text-sm font-medium">Try Game</span>
          <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
