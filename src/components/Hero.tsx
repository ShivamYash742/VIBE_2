import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Award, MessageCircle, Sparkles } from "lucide-react";
import { useTilt } from "../lib/animations";

const Hero = () => {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useTilt(card1Ref);
  useTilt(card2Ref);
  useTilt(card3Ref);

  useEffect(() => {
    const animateCards = () => {
      [card1Ref, card2Ref, card3Ref].forEach((ref, index) => {
        if (ref.current) {
          ref.current.classList.add("opacity-100", "translate-y-0");
          ref.current.style.animationDelay = `${index * 0.15}s`;
        }
      });
    };

    setTimeout(animateCards, 300);
  }, []);

  return (
    <div className="relative min-h-screen pt-24 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-glow-purple rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-blue rounded-full blur-[120px] opacity-20 animate-pulse"></div>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/50 text-neon-purple mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-xs font-semibold">
              The Future of Learning is Here
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-white">Unlock Your</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              Full Potential
            </span>
          </h1>

          <p
            className="text-muted-foreground text-lg md:text-xl max-w-3xl mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Experience immersive learning through interactive courses, gamified
            quizzes, and AI-powered personalization.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/courses"
              className="px-6 py-3 rounded-full bg-neon-purple hover:bg-neon-purple/90 transition-all duration-300 text-white font-medium neon-glow neon-glow-purple text-center"
            >
              Explore Courses
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 rounded-full bg-accent hover:bg-accent/70 transition-all duration-300 text-white font-medium text-center"
            >
              Start Free Trial
            </Link>
          </div>

          {/* 3D Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full perspective-container">
            {[
              {
                ref: card1Ref,
                icon: <BookOpen className="w-6 h-6 text-neon-blue" />,
                title: "Interactive Courses",
                description:
                  "Engaging content with 3D models and interactive elements",
                bgColor: "bg-neon-blue/10",
              },
              {
                ref: card2Ref,
                icon: <Award className="w-6 h-6 text-neon-purple" />,
                title: "Gamified Learning",
                description: "Earn points, badges, and climb the leaderboards",
                bgColor: "bg-neon-purple/10",
              },
              {
                ref: card3Ref,
                icon: <MessageCircle className="w-6 h-6 text-neon-pink" />,
                title: "AI Chatbot",
                description: "Get personalized guidance and support 24/7",
                bgColor: "bg-neon-pink/10",
              },
            ].map((card, index) => (
              <div
                key={index}
                ref={card.ref}
                className="floating-card glass-panel rounded-xl p-6 transition-all duration-700 opacity-0 translate-y-6 transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full ${card.bgColor} mb-4`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              { value: "1000+", label: "Courses" },
              { value: "50k+", label: "Students" },
              { value: "200+", label: "Instructors" },
              { value: "25+", label: "Languages" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/5 rounded-full opacity-20 animate-spin-slow"></div>
      <div className="absolute top-32 right-10 w-24 h-24 border border-white/10 rounded-full opacity-20 animate-spin"></div>
    </div>
  );
};

export default Hero;
