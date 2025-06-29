import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Gamepad,
  Star,
  Clock,
  Users,
  Trophy,
  BookOpen,
  Atom,
  Globe,
  Calculator,
  Cpu,
  ArrowLeft,
} from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import PhysicsQuiz from "@/components/games/PhysicsQuiz";
import WebDevQuiz from "@/components/games/WebDevQuiz";
import MathQuiz from "@/components/games/MathQuiz";
import CSQuiz from "@/components/games/CSQuiz";
import MultiplayerQuiz from "@/components/games/MultiplayerQuiz";
import Navbar from "@/components/Navbar";

// Game interfaces
interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  players: number;
  timeToPlay: string;
  rating: number;
  component?: React.ReactNode;
}

const Games = () => {
  const { currency } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Games data
  const games: Game[] = [
    {
      id: "1",
      title: "Physics Quiz",
      description:
        "Test your knowledge of physics concepts, from Newton's laws to quantum mechanics.",
      image: "/images/games/physics-quiz.jpg",
      category: "quiz",
      difficulty: "medium",
      players: 1,
      timeToPlay: "8 min",
      rating: 4.7,
      component: <PhysicsQuiz />,
    },
    {
      id: "2",
      title: "Web Development Quiz",
      description:
        "Challenge yourself with questions about HTML, CSS, JavaScript, and web technologies.",
      image: "/images/games/webdev-quiz.jpg",
      category: "quiz",
      difficulty: "medium",
      players: 1,
      timeToPlay: "10 min",
      rating: 4.8,
      component: <WebDevQuiz />,
    },
    {
      id: "3",
      title: "Mathematics Quiz",
      description:
        "Solve math problems ranging from algebra to calculus and test your mathematical skills.",
      image: "/images/games/math-quiz.jpg",
      category: "quiz",
      difficulty: "hard",
      players: 1,
      timeToPlay: "9 min",
      rating: 4.6,
      component: <MathQuiz />,
    },
    {
      id: "4",
      title: "Computer Science Quiz",
      description:
        "Test your knowledge of algorithms, data structures, and computer science concepts.",
      image: "/images/games/cs-quiz.jpg",
      category: "quiz",
      difficulty: "hard",
      players: 1,
      timeToPlay: "10 min",
      rating: 4.9,
      component: <CSQuiz />,
    },
    {
      id: "5",
      title: "Multiplayer Quiz",
      description:
        "Compete with other students in real-time quiz battles across various subjects.",
      image: "/images/games/multiplayer-quiz.jpg",
      category: "multiplayer",
      difficulty: "medium",
      players: 4,
      timeToPlay: "15-20 min",
      rating: 4.9,
      component: <MultiplayerQuiz />,
    },
  ];

  // Get unique categories
  const categories = ["all", ...new Set(games.map((game) => game.category))];

  // Filter games by category
  const filteredGames =
    selectedCategory === "all"
      ? games
      : games.filter((game) => game.category === selectedCategory);

  // Handle game selection
  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle back button
  const handleBack = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        {selectedGame ? (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-full bg-accent/40 text-white hover:bg-accent/60 transition-colors"
              >
                ← Back to Games
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {selectedGame.title}
              </h1>
            </div>

            {selectedGame.component ? (
              selectedGame.component
            ) : (
              <div className="glass-panel rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Coming Soon!
                </h2>
                <p className="text-muted-foreground mb-6">
                  This game is currently under development. Check back soon!
                </p>
                <button
                  onClick={handleBack}
                  className="px-6 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
                >
                  Explore Other Games
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Back to Home button */}
            <div className="mb-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Educational Games
                </h1>
                <p className="text-muted-foreground">
                  Play games to learn and earn rewards while having fun
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/40">
                <Gamepad className="h-5 w-5 text-neon-purple" />
                <span className="font-medium text-white">
                  {currency} coins available
                </span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-neon-purple text-white"
                      : "bg-accent/40 text-muted-foreground hover:text-white"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="glass-panel rounded-xl overflow-hidden border border-white/10 hover:border-neon-purple/50 transition-all group"
                >
                  <div className="aspect-video w-full bg-accent/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          game.difficulty === "easy"
                            ? "bg-green-500/20 text-green-400"
                            : game.difficulty === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {game.difficulty.charAt(0).toUpperCase() +
                          game.difficulty.slice(1)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 text-xs">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span>{game.rating}</span>
                    </div>

                    {/* Game icon based on category */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {game.title === "Physics Quiz" && (
                        <Atom className="h-16 w-16 text-white/20" />
                      )}
                      {game.title === "Web Development Quiz" && (
                        <Globe className="h-16 w-16 text-white/20" />
                      )}
                      {game.title === "Mathematics Quiz" && (
                        <Calculator className="h-16 w-16 text-white/20" />
                      )}
                      {game.title === "Computer Science Quiz" && (
                        <Cpu className="h-16 w-16 text-white/20" />
                      )}
                      {game.category === "multiplayer" && (
                        <Users className="h-16 w-16 text-white/20" />
                      )}
                    </div>

                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/600x400/3a3a3c/FFFFFF?text=Game+Image";
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {game.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{game.timeToPlay}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>
                          {game.players}{" "}
                          {game.players === 1 ? "player" : "players"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        <span>+50 coins</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleGameSelect(game)}
                      className="w-full py-2.5 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
                    >
                      Play Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Games;
