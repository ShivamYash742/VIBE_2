import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Users,
  Trophy,
  Clock,
  ChevronRight,
  Check,
  X,
  User,
  Crown,
  MessageSquare,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  currentAnswer: number | null;
  isReady: boolean;
  isOnline: boolean;
}

const MultiplayerQuiz = () => {
  const { addCurrency } = useGame();
  const [gameState, setGameState] = useState<
    "lobby" | "countdown" | "question" | "results" | "final"
  >("lobby");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [players, setPlayers] = useState<Player[]>([
    {
      id: "you",
      name: "You",
      avatar: "/images/avatars/avatar-1.png",
      score: 0,
      currentAnswer: null,
      isReady: false,
      isOnline: true,
    },
    {
      id: "bot1",
      name: "Alex",
      avatar: "/images/avatars/avatar-2.png",
      score: 0,
      currentAnswer: null,
      isReady: true,
      isOnline: true,
    },
    {
      id: "bot2",
      name: "Taylor",
      avatar: "/images/avatars/avatar-3.png",
      score: 0,
      currentAnswer: null,
      isReady: true,
      isOnline: true,
    },
    {
      id: "bot3",
      name: "Jordan",
      avatar: "/images/avatars/avatar-4.png",
      score: 0,
      currentAnswer: null,
      isReady: true,
      isOnline: true,
    },
  ]);
  const [chatMessages, setChatMessages] = useState<
    { player: string; message: string; timestamp: Date }[]
  >([
    {
      player: "Alex",
      message: "Hey everyone! Ready for the quiz?",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      player: "Taylor",
      message: "Yes! Let's do this!",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      player: "Jordan",
      message: "Good luck to all!",
      timestamp: new Date(Date.now() - 30000),
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [countdownValue, setCountdownValue] = useState(3);

  // Sample questions
  const questions: Question[] = [
    {
      id: 1,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Jane Austen",
        "Mark Twain",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      correctAnswer: 3,
    },
    {
      id: 5,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
      correctAnswer: 1,
    },
  ];

  // Handle ready state
  const toggleReady = () => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === "you" ? { ...player, isReady: !player.isReady } : player
      )
    );
  };

  // Start game when all players are ready
  useEffect(() => {
    if (
      gameState === "lobby" &&
      players.every((player) => player.isReady) &&
      players.length >= 2
    ) {
      setGameState("countdown");
    }
  }, [players, gameState]);

  // Countdown timer
  useEffect(() => {
    if (gameState !== "countdown") return;

    const timer = setInterval(() => {
      setCountdownValue((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("question");
          return 3;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Question timer
  useEffect(() => {
    if (gameState !== "question") return;

    setTimeRemaining(15);
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuestionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentQuestionIndex]);

  // Simulate bot answers
  useEffect(() => {
    if (gameState !== "question") return;

    // Bots answer after random delay
    const botTimers = players
      .filter((player) => player.id !== "you")
      .map((bot) => {
        const delay = Math.random() * 10000 + 2000; // 2-12 seconds
        return setTimeout(() => {
          // 70% chance to get correct answer
          const isCorrect = Math.random() < 0.7;
          const answer = isCorrect
            ? questions[currentQuestionIndex].correctAnswer
            : Math.floor(Math.random() * 4);

          setPlayers((prev) =>
            prev.map((player) =>
              player.id === bot.id
                ? { ...player, currentAnswer: answer }
                : player
            )
          );
        }, delay);
      });

    return () => {
      botTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [gameState, currentQuestionIndex, questions]);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === "you" ? { ...player, currentAnswer: optionIndex } : player
      )
    );
  };

  const handleQuestionEnd = () => {
    // Calculate scores
    setPlayers((prev) =>
      prev.map((player) => {
        if (
          player.currentAnswer === questions[currentQuestionIndex].correctAnswer
        ) {
          // Award points based on speed (if player answered)
          const speedBonus =
            player.currentAnswer !== null ? Math.min(5, timeRemaining) : 0;
          return {
            ...player,
            score: player.score + 10 + speedBonus,
            currentAnswer: null,
          };
        }
        return { ...player, currentAnswer: null };
      })
    );

    setSelectedOption(null);
    setGameState("results");

    // Move to next question or end game after 5 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setGameState("question");
      } else {
        setGameState("final");

        // Award currency based on player's position
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        const playerRank = sortedPlayers.findIndex((p) => p.id === "you") + 1;

        const rewards = {
          1: 100, // 1st place
          2: 50, // 2nd place
          3: 30, // 3rd place
          4: 20, // 4th place
        };

        const reward = rewards[playerRank as keyof typeof rewards] || 10;
        addCurrency(reward);

        toast.success(`You earned ${reward} coins!`);
      }
    }, 5000);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        player: "You",
        message: messageInput,
        timestamp: new Date(),
      },
    ]);
    setMessageInput("");

    // Simulate bot response after a delay
    if (Math.random() < 0.3) {
      const botResponses = [
        "Good point!",
        "I agree with that.",
        "Interesting...",
        "Not sure about that one.",
        "Let's focus on the quiz!",
        "Good luck everyone!",
      ];

      const randomBot = players.filter((p) => p.id !== "you")[
        Math.floor(Math.random() * (players.length - 1))
      ];

      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            player: randomBot.name,
            message:
              botResponses[Math.floor(Math.random() * botResponses.length)],
            timestamp: new Date(),
          },
        ]);
      }, Math.random() * 3000 + 1000);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setPlayers((prev) =>
      prev.map((player) => ({ ...player, score: 0, currentAnswer: null }))
    );
    setGameState("lobby");
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  return (
    <div className="glass-panel rounded-xl p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Users className="h-6 w-6 text-neon-purple" />
            Multiplayer Quiz
          </h2>
          <p className="text-muted-foreground">
            Compete with other players in real-time
          </p>
        </div>

        {gameState === "question" && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <Clock className="h-4 w-4 text-neon-blue" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <Trophy className="h-4 w-4 text-neon-purple" />
              <span>
                Question {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main game area */}
        <div className="lg:col-span-2">
          {gameState === "lobby" && (
            <div className="glass-panel rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Game Lobby</h3>
              <p className="text-muted-foreground mb-6">
                Waiting for all players to be ready. The game will start
                automatically when everyone is ready.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className={cn(
                      "p-4 rounded-lg border flex items-center gap-3",
                      player.isReady
                        ? "border-green-500/30 bg-green-500/10"
                        : "border-white/10 bg-accent/20"
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/40 overflow-hidden">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/100/3a3a3c/FFFFFF?text=User";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">
                        {player.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {player.isReady ? "Ready" : "Not Ready"}
                      </div>
                    </div>
                    {player.isReady && (
                      <Check className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={toggleReady}
                  className={cn(
                    "px-6 py-2 rounded-lg transition-colors",
                    players.find((p) => p.id === "you")?.isReady
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  )}
                >
                  {players.find((p) => p.id === "you")?.isReady
                    ? "Cancel Ready"
                    : "Ready Up"}
                </button>
              </div>
            </div>
          )}

          {gameState === "countdown" && (
            <div className="glass-panel rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[300px]">
              <h3 className="text-xl font-bold text-white mb-4">
                Game Starting...
              </h3>
              <div className="text-6xl font-bold text-neon-purple mb-4">
                {countdownValue}
              </div>
              <p className="text-muted-foreground">Get ready!</p>
            </div>
          )}

          {gameState === "question" && (
            <div className="glass-panel rounded-xl p-6 mb-6">
              <div className="mb-6">
                <div className="w-full h-2 bg-accent/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon-purple rounded-full transition-all"
                    style={{
                      width: `${(timeRemaining / 15) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-6">
                {questions[currentQuestionIndex].question}
              </h3>

              <div className="space-y-3 mb-6">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={cn(
                        "w-full p-4 rounded-lg border text-left transition-all",
                        selectedOption === index
                          ? "border-neon-purple bg-neon-purple/10"
                          : "border-white/10 hover:border-neon-purple/30 hover:bg-neon-purple/5"
                      )}
                      disabled={selectedOption !== null}
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center mr-3 border",
                            selectedOption === index
                              ? "border-neon-purple bg-neon-purple text-white"
                              : "border-white/30"
                          )}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-white">{option}</span>
                      </div>
                    </button>
                  )
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className={cn(
                      "px-3 py-1.5 rounded-full flex items-center gap-2",
                      player.currentAnswer !== null
                        ? "bg-green-500/20 text-green-400"
                        : "bg-accent/40 text-muted-foreground"
                    )}
                  >
                    <div className="w-5 h-5 rounded-full bg-accent/40 overflow-hidden">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs">
                      {player.currentAnswer !== null
                        ? "Answered"
                        : "Thinking..."}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {gameState === "results" && (
            <div className="glass-panel rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Question Results
              </h3>

              <div className="mb-6">
                <p className="text-white mb-2">
                  {questions[currentQuestionIndex].question}
                </p>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-green-400 font-medium">
                    Correct Answer:{" "}
                    {
                      questions[currentQuestionIndex].options[
                        questions[currentQuestionIndex].correctAnswer
                      ]
                    }
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {players
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <div
                      key={player.id}
                      className="p-3 rounded-lg bg-accent/20 border border-white/10 flex items-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/40 overflow-hidden mr-3">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">
                          {player.name}
                          {player.id === "you" && (
                            <span className="text-neon-purple ml-2">(You)</span>
                          )}
                        </div>
                      </div>
                      <div className="text-neon-purple font-bold">
                        {player.score} pts
                      </div>
                    </div>
                  ))}
              </div>

              <p className="text-center text-muted-foreground">
                Next question in a few seconds...
              </p>
            </div>
          )}

          {gameState === "final" && (
            <div className="glass-panel rounded-xl p-6 mb-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                Game Completed!
              </h3>

              <div className="mb-8">
                {players
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <div
                      key={player.id}
                      className={cn(
                        "p-4 rounded-lg border flex items-center mb-3",
                        index === 0
                          ? "border-yellow-500/30 bg-yellow-500/10"
                          : "border-white/10 bg-accent/20"
                      )}
                    >
                      <div className="w-10 h-10 flex items-center justify-center mr-3">
                        {index === 0 ? (
                          <Crown className="h-8 w-8 text-yellow-400" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-accent/40 flex items-center justify-center font-bold text-white">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-accent/40 overflow-hidden mr-3">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-white">
                          {player.name}
                          {player.id === "you" && (
                            <span className="text-neon-purple ml-2">(You)</span>
                          )}
                        </div>
                      </div>
                      <div className="text-neon-purple font-bold">
                        {player.score} pts
                      </div>
                    </div>
                  ))}
              </div>

              <button
                onClick={handlePlayAgain}
                className="px-6 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Player list and chat */}
        <div className="glass-panel rounded-xl p-4 flex flex-col h-[600px]">
          <div className="mb-4">
            <h3 className="font-medium text-white mb-2">Players</h3>
            <div className="space-y-2">
              {players
                .sort((a, b) => b.score - a.score)
                .map((player) => (
                  <div
                    key={player.id}
                    className="p-2 rounded-lg bg-accent/20 flex items-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/40 overflow-hidden mr-2">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">
                        {player.name}
                        {player.id === "you" && (
                          <span className="text-neon-purple ml-1">(You)</span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-neon-purple">
                      {player.score}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-neon-purple" />
            <h3 className="font-medium text-white">Chat</h3>
          </div>

          <div className="flex-1 overflow-y-auto mb-3 space-y-2 p-2">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "p-2 rounded-lg max-w-[85%]",
                  msg.player === "You"
                    ? "bg-neon-purple/20 ml-auto"
                    : "bg-accent/30"
                )}
              >
                <div className="text-xs font-medium mb-1">
                  {msg.player === "You" ? (
                    <span className="text-neon-purple">You</span>
                  ) : (
                    <span className="text-white">{msg.player}</span>
                  )}
                </div>
                <p className="text-sm text-white">{msg.message}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-accent/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-purple/50"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerQuiz;
