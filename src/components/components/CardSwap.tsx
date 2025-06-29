
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Shuffle, ArrowLeftRight, Trophy, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Card {
  id: number;
  content: string;
  category: 'html' | 'css' | 'js' | 'react';
  matched: boolean;
  flipped: boolean;
}

const codeSnippets = {
  html: [
    '<div class="container">', 
    '<h1>Hello World</h1>', 
    '<form onsubmit="return false">', 
    '<ul class="nav-links">'
  ],
  css: [
    '.container { display: flex; }', 
    '@media (max-width: 768px)', 
    'transition: all 0.3s ease;', 
    'grid-template-columns: repeat(3, 1fr);'
  ],
  js: [
    'function handleClick() {', 
    'const data = await fetch(url);', 
    'addEventListener("click", callback);', 
    'localStorage.setItem("key", value);'
  ],
  react: [
    'const [state, setState] = useState();', 
    'useEffect(() => { }, []);', 
    '<Component {...props} />', 
    'export default App;'
  ]
};

const CardSwap = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [score, setScore] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // Create cards based on difficulty
  const createCards = (difficulty: 'easy' | 'medium' | 'hard') => {
    let cards: Card[] = [];
    let id = 1;
    
    // Select categories based on difficulty
    let categories: Array<'html' | 'css' | 'js' | 'react'> = [];
    if (difficulty === 'easy') {
      categories = ['html', 'css'];
    } else if (difficulty === 'medium') {
      categories = ['html', 'css', 'js'];
    } else {
      categories = ['html', 'css', 'js', 'react'];
    }
    
    // Create pairs of cards
    categories.forEach(category => {
      const snippets = codeSnippets[category];
      // Use all snippets for hard, fewer for easier levels
      const snippetsToUse = difficulty === 'easy' 
        ? snippets.slice(0, 2) 
        : difficulty === 'medium' 
          ? snippets.slice(0, 3) 
          : snippets;
          
      snippetsToUse.forEach(snippet => {
        cards.push({
          id: id++,
          content: snippet,
          category,
          matched: false,
          flipped: false
        });
        cards.push({
          id: id++,
          content: snippet,
          category,
          matched: false,
          flipped: false
        });
      });
    });
    
    // Shuffle cards
    return [...cards].sort(() => Math.random() - 0.5);
  };

  // Initialize game
  useEffect(() => {
    const newCards = createCards(difficulty);
    setCards(newCards);
    setSelectedCards([]);
    setMatches(0);
    setMoves(0);
    setGameOver(false);
    setTimer(0);
    setIsTimerRunning(false);
  }, [difficulty]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Check for game over
  useEffect(() => {
    if (matches > 0 && matches === cards.length / 2) {
      setGameOver(true);
      setIsTimerRunning(false);
      
      // Calculate score
      const timeBonus = Math.max(0, 300 - timer);
      const movesPenalty = moves * 2;
      const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
      const totalPoints = (matches * 100 + timeBonus - movesPenalty) * difficultyMultiplier;
      
      setScore(prev => prev + totalPoints);
      
      toast.success('Game completed!');
      toast(`You earned ${totalPoints} points!`);
    }
  }, [matches, cards.length, moves, timer, difficulty]);

  // Handle card click
  const handleCardClick = (card: Card) => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    
    // Don't allow clicking if already matched or already selected
    if (card.matched || selectedCards.some(c => c.id === card.id) || selectedCards.length >= 2) {
      return;
    }
    
    // Flip the card
    setCards(cards.map(c => 
      c.id === card.id ? { ...c, flipped: true } : c
    ));
    
    // Add to selected
    setSelectedCards([...selectedCards, card]);
  };

  // Check selected cards for a match
  useEffect(() => {
    if (selectedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [first, second] = selectedCards;
      
      if (first.content === second.content) {
        // Match found
        setCards(cards.map(card => 
          card.id === first.id || card.id === second.id
            ? { ...card, matched: true }
            : card
        ));
        
        setMatches(prev => prev + 1);
        setSelectedCards([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === first.id || card.id === second.id
              ? { ...card, flipped: false }
              : card
          ));
          
          setSelectedCards([]);
        }, 1000);
      }
    }
  }, [selectedCards, cards]);

  // Restart game
  const restartGame = () => {
    const newCards = createCards(difficulty);
    setCards(newCards);
    setSelectedCards([]);
    setMatches(0);
    setMoves(0);
    setGameOver(false);
    setTimer(0);
    setIsTimerRunning(false);
  };

  // Change difficulty
  const changeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setShowIntro(false);
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'html':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'css':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'js':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'react':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ArrowLeftRight className="h-6 w-6 text-primary" />
            Card Swap
          </h2>
          <p className="text-muted-foreground">Match code cards to test your programming knowledge</p>
        </div>
        
        <div className="px-4 py-2 bg-primary/10 rounded-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="font-medium">{score} Points</span>
        </div>
      </div>
      
      {showIntro ? (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6 text-center flex flex-col items-center max-w-xl mx-auto animate-scale-in">
          <div className="w-16 h-16 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
            <ArrowLeftRight className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Code Card Matching</h3>
          
          <p className="text-muted-foreground mb-4">
            Test your programming knowledge by matching pairs of code cards.
            Flip cards to reveal code snippets and find their matching pairs.
          </p>
          
          <div className="py-4 px-6 bg-primary/5 rounded-lg mb-6 text-sm">
            <p className="font-medium mb-2">How to play:</p>
            <ul className="text-left text-muted-foreground space-y-1">
              <li>• Click on cards to flip them</li>
              <li>• Find matching code snippet pairs</li>
              <li>• Complete the game with fewer moves for a higher score</li>
              <li>• Faster completion grants time bonus points</li>
            </ul>
          </div>
          
          <div className="w-full space-y-3">
            <h4 className="text-sm font-medium">Select Difficulty:</h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => changeDifficulty('easy')}
                className="px-4 py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 button-hover"
              >
                Easy
              </button>
              
              <button
                onClick={() => changeDifficulty('medium')}
                className="px-4 py-3 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100 button-hover"
              >
                Medium
              </button>
              
              <button
                onClick={() => changeDifficulty('hard')}
                className="px-4 py-3 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 button-hover"
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </div>
              
              <div className="px-3 py-1.5 rounded-lg bg-muted flex items-center gap-1.5 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{matches} / {cards.length / 2}</span>
              </div>
              
              <div className="px-3 py-1.5 rounded-lg bg-muted flex items-center gap-1.5 text-sm">
                <Shuffle className="h-4 w-4" />
                <span>{moves} moves</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-muted flex items-center gap-1.5 text-sm">
                <Clock className="h-4 w-4" />
                <span>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
              </div>
              
              <button
                onClick={restartGame}
                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium button-hover"
              >
                Restart
              </button>
            </div>
          </div>
          
          <div 
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6}, minmax(0, 1fr))`,
            }}
          >
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={cn(
                  "h-24 md:h-28 rounded-lg border transition-all duration-300 transform cursor-pointer perspective-1000",
                  card.flipped ? "rotate-y-180" : "",
                  !card.matched && !card.flipped ? "hover:border-primary hover:shadow-sm" : ""
                )}
              >
                <div className="relative w-full h-full">
                  {/* Card front (hidden when flipped) */}
                  <div 
                    className={cn(
                      "absolute inset-0 backface-hidden transition-all duration-300",
                      "bg-white border border-border rounded-lg flex items-center justify-center",
                      card.flipped ? "opacity-0" : "opacity-100"
                    )}
                  >
                    <Code className="h-8 w-8 text-muted-foreground" />
                  </div>
                  
                  {/* Card back (shown when flipped) */}
                  <div 
                    className={cn(
                      "absolute inset-0 backface-hidden transition-all duration-300 rotate-y-180",
                      getCategoryColor(card.category),
                      "rounded-lg p-2 flex flex-col overflow-hidden",
                      card.flipped ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="text-xs font-mono overflow-hidden flex-1 flex items-center justify-center text-center">
                      {card.content}
                    </div>
                    <div className="text-[10px] uppercase font-semibold mt-1 text-right">
                      {card.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Game over modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-md p-8 max-w-md w-full mx-4 animate-scale-in">
            <div className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
              <p className="text-muted-foreground mb-6">
                You've successfully matched all the code pairs!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="text-lg font-semibold">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Moves</p>
                  <p className="text-lg font-semibold">{moves}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={restartGame}
                  className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-secondary button-hover"
                >
                  Play Again
                </button>
                
                <button
                  onClick={() => setShowIntro(true)}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg shadow-sm button-hover"
                >
                  Change Difficulty
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Code icon component
const Code = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

export default CardSwap;
