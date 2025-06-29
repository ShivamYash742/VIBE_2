import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Shuffle,
  ArrowLeftRight,
  Trophy,
  CheckCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";

interface Card {
  id: number;
  content: string;
  category: "html" | "css" | "js" | "react";
  matched: boolean;
  flipped: boolean;
}

const codeSnippets = {
  html: [
    '<div class="container">',
    "<h1>Hello World</h1>",
    '<form onsubmit="return false">',
    '<ul class="nav-links">',
  ],
  css: [
    ".container { display: flex; }",
    "@media (max-width: 768px)",
    "transition: all 0.3s ease;",
    "grid-template-columns: repeat(3, 1fr);",
  ],
  js: [
    "function handleClick() {",
    "const data = await fetch(url);",
    'addEventListener("click", callback);',
    'localStorage.setItem("key", value);',
  ],
  react: [
    "const [state, setState] = useState();",
    "useEffect(() => { }, []);",
    "<Component {...props} />",
    "export default App;",
  ],
};

const CardSwap = () => {
  const { addCurrency } = useGame();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [score, setScore] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // Create cards based on difficulty
  const createCards = (difficulty: "easy" | "medium" | "hard") => {
    let cards: Card[] = [];
    let id = 1;

    // Select categories based on difficulty
    let categories: Array<"html" | "css" | "js" | "react"> = [];
    if (difficulty === "easy") {
      categories = ["html", "css"];
    } else if (difficulty === "medium") {
      categories = ["html", "css", "js"];
    } else {
      categories = ["html", "css", "js", "react"];
    }

    // Create pairs of cards
    categories.forEach((category) => {
      const snippets = codeSnippets[category];
      // Use all snippets for hard, fewer for easier levels
      const snippetsToUse =
        difficulty === "easy"
          ? snippets.slice(0, 2)
          : difficulty === "medium"
          ? snippets.slice(0, 3)
          : snippets;

      snippetsToUse.forEach((snippet) => {
        cards.push({
          id: id++,
          content: snippet,
          category,
          matched: false,
          flipped: false,
        });
        cards.push({
          id: id++,
          content: snippet,
          category,
          matched: false,
          flipped: false,
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
        setTimer((prev) => prev + 1);
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
      const difficultyMultiplier =
        difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
      const totalPoints =
        (matches * 100 + timeBonus - movesPenalty) * difficultyMultiplier;

      setScore((prev) => prev + totalPoints);

      // Add currency to the game context
      addCurrency(Math.floor(totalPoints / 10));

      toast.success("Game completed!");
      toast(
        `You earned ${totalPoints} points and ${Math.floor(
          totalPoints / 10
        )} coins!`
      );
    }
  }, [matches, cards.length, moves, timer, difficulty, addCurrency]);

  // Handle card click
  const handleCardClick = (card: Card) => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    // Don't allow clicking if already matched or already selected
    if (
      card.matched ||
      selectedCards.some((c) => c.id === card.id) ||
      selectedCards.length >= 2
    ) {
      return;
    }

    // Flip the card
    setCards(
      cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );

    // Add to selected
    setSelectedCards([...selectedCards, card]);
  };

  // Check selected cards for a match
  useEffect(() => {
    if (selectedCards.length === 2) {
      setMoves((prev) => prev + 1);

      const [first, second] = selectedCards;

      if (first.content === second.content) {
        // Match found
        setCards(
          cards.map((card) =>
            card.id === first.id || card.id === second.id
              ? { ...card, matched: true }
              : card
          )
        );

        setMatches((prev) => prev + 1);
        setSelectedCards([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(
            cards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, flipped: false }
                : card
            )
          );

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
  const changeDifficulty = (newDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(newDifficulty);
    setShowIntro(false);
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "html":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "css":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "js":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "react":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="glass-panel rounded-xl p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <ArrowLeftRight className="h-6 w-6 text-neon-purple" />
            Card Swap
          </h2>
          <p className="text-muted-foreground">
            Match code cards to test your programming knowledge
          </p>
        </div>

        <div className="flex items-center gap-4">
          {!showIntro && (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
                <Clock className="h-4 w-4 text-neon-blue" />
                <span>{formatTime(timer)}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
                <Trophy className="h-4 w-4 text-neon-purple" />
                <span>Moves: {moves}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>
                  Matches: {matches}/{cards.length / 2}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {showIntro ? (
        <div className="glass-panel rounded-xl p-6 mb-6 text-center flex flex-col items-center max-w-xl mx-auto">
          <div className="w-16 h-16 mb-4 rounded-xl bg-accent/40 flex items-center justify-center">
            <ArrowLeftRight className="h-8 w-8 text-neon-purple" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Welcome to Card Swap
          </h3>
          <p className="text-muted-foreground mb-6">
            Test your programming knowledge by matching pairs of code snippets.
            The faster you match with fewer moves, the higher your score!
          </p>

          <div className="w-full max-w-sm">
            <h4 className="font-medium text-white mb-3">Select Difficulty:</h4>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => changeDifficulty("easy")}
                className="p-3 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
              >
                Easy
              </button>
              <button
                onClick={() => changeDifficulty("medium")}
                className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
              >
                Medium
              </button>
              <button
                onClick={() => changeDifficulty("hard")}
                className="p-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {gameOver ? (
            <div className="glass-panel rounded-xl p-6 text-center max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-2">
                Game Completed!
              </h3>
              <p className="text-muted-foreground mb-4">
                You matched all pairs in {formatTime(timer)} with {moves} moves.
              </p>

              <div className="flex items-center justify-center gap-2 mb-6">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <span className="text-lg font-bold text-white">
                  {score} points earned!
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={restartGame}
                  className="px-4 py-2 rounded-lg bg-accent/40 hover:bg-accent/60 text-white transition-colors"
                >
                  Play Again
                </button>
                <button
                  onClick={() => {
                    setDifficulty((prev) =>
                      prev === "easy"
                        ? "medium"
                        : prev === "medium"
                        ? "hard"
                        : "easy"
                    );
                    setShowIntro(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white transition-colors"
                >
                  Change Difficulty
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    className={cn(
                      "aspect-[3/4] rounded-lg cursor-pointer transition-all transform perspective-1000",
                      card.flipped || card.matched
                        ? "rotate-y-0"
                        : "rotate-y-180"
                    )}
                  >
                    <div className="relative w-full h-full transform-style-3d">
                      {/* Card Front */}
                      <div
                        className={cn(
                          "absolute inset-0 backface-hidden rounded-lg p-3 flex flex-col border-2",
                          card.matched
                            ? "border-green-500 bg-green-500/10"
                            : "border-white/10 bg-accent/40",
                          card.flipped || card.matched
                            ? "rotate-y-0"
                            : "rotate-y-180"
                        )}
                      >
                        <div
                          className={cn(
                            "text-xs px-1.5 py-0.5 rounded mb-2 self-start border",
                            getCategoryColor(card.category)
                          )}
                        >
                          {card.category.toUpperCase()}
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <Code className="text-xs sm:text-sm">
                            {card.content}
                          </Code>
                        </div>
                      </div>

                      {/* Card Back */}
                      <div
                        className={cn(
                          "absolute inset-0 backface-hidden rounded-lg bg-neon-purple/20 border-2 border-neon-purple/30 flex items-center justify-center",
                          card.flipped || card.matched
                            ? "rotate-y-180"
                            : "rotate-y-0"
                        )}
                      >
                        <Shuffle className="h-8 w-8 text-neon-purple opacity-50" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={restartGame}
                  className="px-4 py-2 rounded-lg bg-accent/40 hover:bg-accent/60 text-white transition-colors flex items-center gap-2"
                >
                  <Shuffle className="h-4 w-4" />
                  Restart
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

// Code component for syntax highlighting
const Code = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <pre
    className={cn(
      "font-mono text-white whitespace-pre-wrap break-all",
      className
    )}
  >
    {children}
  </pre>
);

export default CardSwap;
