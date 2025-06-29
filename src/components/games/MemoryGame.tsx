import { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { Coins, Trophy, Clock, RotateCcw } from "lucide-react";

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame = () => {
  const { addCurrency } = useGame();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const totalPairs = 8;
  const symbols = [
    "🚀",
    "🌟",
    "🔬",
    "🧠",
    "📚",
    "💻",
    "🔍",
    "🧪",
    "🌍",
    "🧮",
    "⚛️",
    "🔢",
    "📊",
    "🧬",
    "🤖",
    "🔋",
  ];

  const initializeGame = () => {
    // Reset game state
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameCompleted(false);
    setTimer(0);

    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    // Create card pairs
    const selectedSymbols = [...symbols]
      .sort(() => 0.5 - Math.random())
      .slice(0, totalPairs);
    const cardPairs = [...selectedSymbols, ...selectedSymbols].map(
      (value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      })
    );

    // Shuffle cards
    setCards(cardPairs.sort(() => 0.5 - Math.random()));
  };

  const startGame = () => {
    initializeGame();
    setGameStarted(true);

    // Start timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    setTimerInterval(interval);
  };

  const handleCardClick = (id: number) => {
    // Ignore if already flipped or matched
    if (
      flippedCards.length === 2 ||
      cards.find((card) => card.id === id)?.flipped ||
      cards.find((card) => card.id === id)?.matched
    ) {
      return;
    }

    // Flip the card
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );

    // Add to flipped cards
    setFlippedCards((prev) => [...prev, id]);
  };

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, matched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === totalPairs && gameStarted && !gameCompleted) {
      setGameCompleted(true);

      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }

      // Award currency based on performance
      const timeBonus = Math.max(0, 120 - timer);
      const movesBonus = Math.max(0, 30 - (moves - totalPairs));
      const totalReward = 50 + timeBonus + movesBonus;

      addCurrency(totalReward);
    }
  }, [
    matchedPairs,
    totalPairs,
    gameStarted,
    gameCompleted,
    timer,
    moves,
    timerInterval,
    addCurrency,
  ]);

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white">Memory Match</h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
            <Clock className="h-4 w-4 text-neon-blue" />
            <span>{formatTime(timer)}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
            <Trophy className="h-4 w-4 text-neon-purple" />
            <span>Moves: {moves}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span>
              Pairs: {matchedPairs}/{totalPairs}
            </span>
          </div>
        </div>
      </div>

      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center py-12 gap-6">
          <div className="text-center max-w-md">
            <h3 className="text-xl font-bold text-white mb-2">How to Play</h3>
            <p className="text-muted-foreground mb-4">
              Flip cards to find matching pairs. Remember the positions and
              match all pairs to win!
            </p>
            <ul className="text-sm text-muted-foreground mb-6 space-y-2">
              <li>• Find all {totalPairs} matching pairs</li>
              <li>• Fewer moves = higher score</li>
              <li>• Faster completion = higher score</li>
              <li>• Earn up to 150 coins for perfect play</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="px-6 py-3 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg flex items-center justify-center text-3xl cursor-pointer transition-all transform ${
                  card.flipped || card.matched
                    ? "bg-accent/40 rotate-y-0"
                    : "bg-neon-purple/20 hover:bg-neon-purple/30 rotate-y-180"
                } ${card.matched ? "ring-2 ring-neon-green" : ""}`}
              >
                {(card.flipped || card.matched) && card.value}
              </div>
            ))}
          </div>

          {gameCompleted ? (
            <div className="glass-panel rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Congratulations!
              </h3>
              <p className="text-muted-foreground mb-4">
                You completed the game in {formatTime(timer)} with {moves}{" "}
                moves.
              </p>

              <div className="flex items-center justify-center gap-2 mb-6">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="text-lg font-bold">
                  {50 +
                    Math.max(0, 120 - timer) +
                    Math.max(0, 30 - (moves - totalPairs))}{" "}
                  coins earned!
                </span>
              </div>

              <button
                onClick={startGame}
                className="px-6 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="h-4 w-4" />
                Play Again
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={initializeGame}
                className="px-4 py-2 rounded-lg bg-accent/40 hover:bg-accent/60 text-white font-medium transition-colors flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Restart
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
