import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Target,
  Award,
  Code,
  Trophy,
  CheckCircle,
  X,
  Globe,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { useScrollAnimation } from "../../lib/animations";
import QuizSession from "../../components/QuizSession";
import { webDevelopmentQuizData } from "../../data/quizData";
import { useGame } from "../../contexts/GameContext";

// Interface for quiz details
interface QuizDetails {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  questions: number;
  timeLimit: string;
  participants: number;
  rating: number;
  image: string;
  tags: string[];
  xpReward: number;
  badges: { name: string; icon: string }[];
  leaderboard: { rank: number; name: string; score: number; avatar: string }[];
  questionPreview: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface WebDevelopmentQuizProps {
  startQuiz?: boolean;
}

const WebDevelopmentQuiz: React.FC<WebDevelopmentQuizProps> = ({
  startQuiz = false,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "questions" | "leaderboard"
  >("overview");
  const [showStartModal, setShowStartModal] = useState(false);
  const [quizStarted, setQuizStarted] = useState(startQuiz);
  const { updateMissionProgress } = useGame();

  useScrollAnimation();

  // Mock quiz data - in a real app, this would come from an API call
  const quizDetails: QuizDetails = {
    id: 3,
    title: "Web Development Quiz",
    description:
      "Test your knowledge of HTML, CSS, JavaScript, and modern web development frameworks in this beginner-friendly quiz. Perfect for those starting their journey in web development or looking to refresh their basic skills.",
    difficulty: "Beginner",
    category: "Technology",
    questions: 20,
    timeLimit: "15 min",
    participants: 21568,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript", "Web Development"],
    xpReward: 150,
    badges: [
      { name: "Web Rookie", icon: "🌐" },
      { name: "Code Starter", icon: "💻" },
    ],
    leaderboard: [
      {
        rank: 1,
        name: "Jessica",
        score: 100,
        avatar: "https://i.pravatar.cc/150?img=25",
      },
      {
        rank: 2,
        name: "David",
        score: 98,
        avatar: "https://i.pravatar.cc/150?img=22",
      },
      {
        rank: 3,
        name: "Sarah",
        score: 95,
        avatar: "https://i.pravatar.cc/150?img=23",
      },
      {
        rank: 4,
        name: "James",
        score: 92,
        avatar: "https://i.pravatar.cc/150?img=24",
      },
      {
        rank: 5,
        name: "Emily",
        score: 90,
        avatar: "https://i.pravatar.cc/150?img=21",
      },
    ],
    questionPreview: [
      {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: 1,
      },
      {
        question:
          "Which CSS property is used to change the text color of an element?",
        options: ["text-color", "font-color", "color", "text-style"],
        correctAnswer: 2,
      },
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Object"],
        correctAnswer: 2,
      },
    ],
  };

  // Function to get the appropriate color for difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "Advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number, totalPossible: number) => {
    // Update mission progress
    updateMissionProgress("weekly-1", 1); // Update "Knowledge Explorer" mission

    console.log(`Quiz completed with score: ${score}/${totalPossible}`);
  };

  // If quiz is started, show the quiz session
  if (quizStarted) {
    return (
      <QuizSession
        quizId={webDevelopmentQuizData.id}
        quizTitle={webDevelopmentQuizData.title}
        questions={webDevelopmentQuizData.questions}
        timeLimit={webDevelopmentQuizData.timeLimit}
        onComplete={handleQuizComplete}
        onExit={() => {
          setQuizStarted(false);
          navigate("/quizzes/web-development");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="relative bg-hero-pattern py-16 mb-12">
          <div className="absolute inset-0 bg-glow-purple opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <button
              onClick={() => navigate("/quizzes")}
              className="mb-6 text-white hover:text-neon-purple transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Quizzes
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll">
                  {quizDetails.title}
                </h1>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      quizDetails.difficulty
                    )}`}
                  >
                    {quizDetails.difficulty}
                  </span>
                  {quizDetails.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-accent/60 text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-neon-purple" />
                    {quizDetails.timeLimit}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-neon-purple" />
                    {quizDetails.participants.toLocaleString()} participants
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {quizDetails.rating} rating
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="w-4 h-4 text-neon-purple" />
                    {quizDetails.questions} questions
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <img
                  src={quizDetails.image}
                  alt={quizDetails.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-accent/40 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-neon-purple mb-1">
                      {quizDetails.xpReward}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      XP Reward
                    </div>
                  </div>
                  <div className="bg-accent/40 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">
                      {quizDetails.badges.length}
                    </div>
                    <div className="text-muted-foreground text-sm">Badges</div>
                  </div>
                </div>

                <button
                  className="block w-full py-3 bg-neon-purple rounded-lg text-white font-medium hover:bg-neon-purple/90 transition-colors mb-4 text-center"
                  onClick={() => setQuizStarted(true)}
                >
                  Start Quiz
                </button>

                <button className="block w-full py-3 border border-neon-purple text-neon-purple rounded-lg font-medium hover:bg-neon-purple/10 transition-colors text-center">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="container mx-auto px-4">
          <div className="flex border-b border-white/10 mb-8">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "overview"
                  ? "text-neon-purple border-b-2 border-neon-purple"
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "questions"
                  ? "text-neon-purple border-b-2 border-neon-purple"
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setActiveTab("questions")}
            >
              Sample Questions
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "leaderboard"
                  ? "text-neon-purple border-b-2 border-neon-purple"
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setActiveTab("leaderboard")}
            >
              Leaderboard
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-16">
            {activeTab === "overview" && (
              <div className="animate-on-scroll">
                <div className="glass-panel rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    About This Quiz
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {quizDetails.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        What You'll Learn
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Fundamentals of HTML structure and semantic elements
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            CSS styling techniques and layout principles
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            JavaScript basics and DOM manipulation
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Modern web development best practices
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Badges You Can Earn
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {quizDetails.badges.map((badge, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg"
                          >
                            <div className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center text-2xl">
                              {badge.icon}
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {badge.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Score 80%+
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Prerequisites
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    This quiz is designed for beginners, so no prior knowledge
                    is required. However, having some basic understanding of the
                    following will be helpful:
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-neon-blue mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Basic understanding of how websites work
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Code className="h-5 w-5 text-neon-blue mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Familiarity with text editors or IDEs
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Award className="h-5 w-5 text-neon-blue mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Curiosity about web technologies
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "questions" && (
              <div className="animate-on-scroll">
                <div className="glass-panel rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Sample Questions
                  </h2>

                  <div className="space-y-6">
                    {quizDetails.questionPreview.map((question, index) => (
                      <div
                        key={index}
                        className="p-4 bg-accent/20 rounded-lg border border-white/5"
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">
                          {index + 1}. {question.question}
                        </h3>

                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-lg ${
                                question.correctAnswer === optIndex
                                  ? "bg-green-500/20 border border-green-500/50"
                                  : "bg-accent/30 border border-white/10"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={
                                    question.correctAnswer === optIndex
                                      ? "text-green-400"
                                      : "text-muted-foreground"
                                  }
                                >
                                  {option}
                                </span>
                                {question.correctAnswer === optIndex && (
                                  <CheckCircle className="h-5 w-5 text-green-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          This is just a preview. The actual quiz will have{" "}
                          {quizDetails.questions} questions.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    className="px-6 py-3 bg-neon-purple rounded-lg text-white font-medium hover:bg-neon-purple/90 transition-colors flex items-center gap-2"
                    onClick={() => setQuizStarted(true)}
                  >
                    <Trophy className="h-5 w-5" />
                    Take the Full Quiz
                  </button>
                </div>
              </div>
            )}

            {activeTab === "leaderboard" && (
              <div className="animate-on-scroll">
                <div className="glass-panel rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Leaderboard
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {quizDetails.participants.toLocaleString()} participants
                    </span>
                  </div>

                  <div className="space-y-4">
                    {quizDetails.leaderboard.map((leader) => (
                      <div
                        key={leader.rank}
                        className="flex items-center gap-4 p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                            leader.rank === 1
                              ? "bg-yellow-500"
                              : leader.rank === 2
                              ? "bg-gray-400"
                              : leader.rank === 3
                              ? "bg-amber-700"
                              : "bg-accent"
                          }`}
                        >
                          {leader.rank}
                        </div>
                        <img
                          src={leader.avatar}
                          alt={leader.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            {leader.name}
                          </div>
                        </div>
                        <div className="text-xl font-bold text-neon-purple">
                          {leader.score}%
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-center">
                    <button
                      className="px-6 py-3 bg-neon-purple rounded-lg text-white font-medium hover:bg-neon-purple/90 transition-colors flex items-center gap-2"
                      onClick={() => setQuizStarted(true)}
                    >
                      <Trophy className="h-5 w-5" />
                      Join the Leaderboard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Start Quiz Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-xl overflow-hidden border border-white/10 w-full max-w-md animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Ready to Start?
                </h3>
                <button
                  className="h-8 w-8 rounded-full bg-accent/40 flex items-center justify-center hover:bg-accent/60 transition-colors"
                  onClick={() => setShowStartModal(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-muted-foreground">
                  You're about to start the {quizDetails.title}. You'll have{" "}
                  {quizDetails.timeLimit} to answer {quizDetails.questions}{" "}
                  questions.
                </p>

                <div className="bg-accent/30 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-neon-purple" />
                    Rewards
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-muted-foreground">
                        {quizDetails.xpReward} XP for completion
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-muted-foreground">
                        Badges for 80%+ score
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-muted-foreground">
                        Leaderboard position
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 py-3 bg-accent/60 rounded-lg text-white hover:bg-accent/80 transition-colors"
                  onClick={() => setShowStartModal(false)}
                >
                  Cancel
                </button>
                <Link
                  to="/quizzes/web-development/start"
                  className="flex-1 py-3 bg-neon-purple rounded-lg text-white hover:bg-neon-purple/90 transition-colors text-center"
                >
                  Start Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebDevelopmentQuiz;
