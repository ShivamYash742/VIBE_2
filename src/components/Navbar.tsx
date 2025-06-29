import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Award,
  MessageCircle,
  Users,
  BarChart3,
  Menu,
  X,
  LogIn,
  Gamepad,
  Coins,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useGame } from "@/contexts/GameContext";
import GameHub from "./GameHub";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGameHubOpen, setIsGameHubOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useUser();
  const { currency } = useGame();

  const navItems = [
    {
      name: "Courses",
      icon: <BookOpen className="h-4 w-4" />,
      link: "/courses",
    },
    { name: "Quizzes", icon: <Award className="h-4 w-4" />, link: "/quizzes" },
    {
      name: "Chatbot",
      icon: <MessageCircle className="h-4 w-4" />,
      link: "/chatbot",
    },
    {
      name: "Community",
      icon: <Users className="h-4 w-4" />,
      link: "/community",
    },
    {
      name: "Games",
      icon: <Gamepad className="h-4 w-4" />,
      link: "/games",
    },
    {
      name: "Leaderboard",
      icon: <BarChart3 className="h-4 w-4" />,
      link: "/leaderboard",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 text-white transition-all duration-300 hover:text-neon-purple"
          >
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-neon-purple animate-pulse opacity-60 absolute -inset-0.5 blur-md"></div>
              <div className="h-8 w-8 rounded-full bg-dark flex items-center justify-center relative z-10">
                <span className="text-neon-purple font-bold text-lg">E</span>
              </div>
            </div>
            <span className="hidden sm:inline">Eduverse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 hover:bg-muted ${
                  location.pathname === item.link
                    ? "text-neon-purple bg-muted"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {/* Play Button */}
            {isAuthenticated && (
              <button
                onClick={() => setIsGameHubOpen(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full bg-neon-purple hover:bg-neon-purple/90 transition-all duration-300 text-white neon-glow neon-glow-purple"
                aria-label="Open Game Hub"
              >
                <Gamepad className="h-4 w-4" />
                Play
                <div className="flex items-center gap-1 ml-1 px-2 py-0.5 bg-black/20 rounded-full">
                  <Coins className="h-3 w-3" />
                  <span className="text-xs font-medium">{currency}</span>
                </div>
              </button>
            )}
          </div>

          {/* Login/Signup buttons - only show on home page or when not authenticated */}
          {location.pathname === "/" && !isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 hover:bg-muted text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-neon-purple hover:bg-neon-purple/90 transition-all duration-300 text-white neon-glow neon-glow-purple"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full bg-accent/30 text-white hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="glass-panel md:hidden absolute top-full left-0 right-0 p-4 animate-slide-down">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.link
                      ? "text-neon-purple bg-accent"
                      : "text-muted-foreground hover:text-white hover:bg-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              {/* Play Button for Mobile */}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsGameHubOpen(true);
                  }}
                  className="flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium bg-neon-purple text-white mt-2"
                >
                  <div className="flex items-center gap-2">
                    <Gamepad className="h-4 w-4" />
                    Play Games
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-black/20 rounded-full">
                    <Coins className="h-3 w-3" />
                    <span className="text-xs font-medium">{currency}</span>
                  </div>
                </button>
              )}

              {/* Only show login/signup on home page */}
              {location.pathname === "/" && !isAuthenticated && (
                <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-accent transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 transition-all text-sm font-medium text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Game Hub Modal */}
      <GameHub isOpen={isGameHubOpen} onClose={() => setIsGameHubOpen(false)} />
    </>
  );
};

export default Navbar;
