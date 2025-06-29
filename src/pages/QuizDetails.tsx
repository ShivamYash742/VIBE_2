import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Target,
  Award,
  Brain,
  Trophy,
  CheckCircle,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useScrollAnimation } from "../lib/animations";

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

// Mock quiz database
const quizDatabase: QuizDetails[] = [
  {
    id: 1,
    title: "Artificial Intelligence Fundamentals",
    description:
      "Test your knowledge of AI concepts, machine learning algorithms, and neural networks in this comprehensive quiz. Perfect for beginners and intermediate learners looking to validate their understanding of artificial intelligence fundamentals.",
    difficulty: "Intermediate",
    category: "Technology",
    questions: 25,
    timeLimit: "20 min",
    participants: 12845,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=2070&auto=format&fit=crop",
    tags: ["AI", "Machine Learning", "Neural Networks", "Technology"],
    xpReward: 250,
    badges: [
      { name: "AI Explorer", icon: "🤖" },
      { name: "Tech Guru", icon: "💻" },
    ],
    leaderboard: [
      {
        rank: 1,
        name: "Alexander",
        score: 98,
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        rank: 2,
        name: "Emma",
        score: 95,
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        rank: 3,
        name: "Michael",
        score: 92,
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        rank: 4,
        name: "Sophia",
        score: 90,
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      {
        rank: 5,
        name: "William",
        score: 89,
        avatar: "https://i.pravatar.cc/150?img=2",
      },
    ],
    questionPreview: [
      {
        question: "What is the primary goal of supervised learning?",
        options: [
          "To cluster data without labels",
          "To predict outcomes based on labeled data",
          "To reduce dimensionality of data",
          "To generate new data samples",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of the following is NOT a type of neural network?",
        options: [
          "Convolutional Neural Network (CNN)",
          "Recurrent Neural Network (RNN)",
          "Quantum Neural Network (QNN)",
          "Algorithmic Neural Network (ANN)",
        ],
        correctAnswer: 3,
      },
      {
        question:
          "What does the 'backpropagation' algorithm do in neural networks?",
        options: [
          "Forwards data through the network",
          "Calculates errors and updates weights",
          "Initializes network parameters",
          "Compresses the neural network",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 5,
    title: "English Grammar Essentials",
    description:
      "Test your knowledge of English grammar rules, punctuation, and sentence structure. This quiz covers everything from basic parts of speech to complex grammatical concepts.",
    difficulty: "Beginner",
    category: "Language",
    questions: 30,
    timeLimit: "25 min",
    participants: 18432,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop",
    tags: ["English", "Grammar", "Language", "Writing"],
    xpReward: 200,
    badges: [
      { name: "Grammar Guru", icon: "📝" },
      { name: "Word Wizard", icon: "📚" },
    ],
    leaderboard: [
      {
        rank: 1,
        name: "Emily",
        score: 99,
        avatar: "https://i.pravatar.cc/150?img=41",
      },
      {
        rank: 2,
        name: "James",
        score: 97,
        avatar: "https://i.pravatar.cc/150?img=42",
      },
      {
        rank: 3,
        name: "Olivia",
        score: 94,
        avatar: "https://i.pravatar.cc/150?img=43",
      },
      {
        rank: 4,
        name: "Daniel",
        score: 92,
        avatar: "https://i.pravatar.cc/150?img=44",
      },
      {
        rank: 5,
        name: "Sophia",
        score: 90,
        avatar: "https://i.pravatar.cc/150?img=45",
      },
    ],
    questionPreview: [
      {
        question: "Which of the following is a proper noun?",
        options: ["happiness", "London", "beautiful", "quickly"],
        correctAnswer: 1,
      },
      {
        question: "Which sentence uses the correct form of the verb?",
        options: [
          "The team are playing well.",
          "The team is playing well.",
          "The team be playing well.",
          "The team were playing well.",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Which punctuation mark is used to indicate a direct quotation?",
        options: ["Comma", "Semicolon", "Quotation marks", "Colon"],
        correctAnswer: 2,
      },
    ],
  },
];

const QuizDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "questions" | "leaderboard"
  >("overview");
  const [showStartModal, setShowStartModal] = useState(false);
  const [quizDetails, setQuizDetails] = useState<QuizDetails | null>(null);

  useScrollAnimation();

  // Fetch quiz details based on ID
  useEffect(() => {
    // In a real app, this would be an API call
    const quizId = parseInt(id || "1");
    const quiz = quizDatabase.find((q) => q.id === quizId);

    if (quiz) {
      setQuizDetails(quiz);
    } else {
      // If quiz not found, redirect to 404 or quizzes page
      navigate("/quizzes");
    }
  }, [id, navigate]);

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

  if (!quizDetails) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-white text-xl">Loading quiz details...</div>
      </div>
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

                <Link
                  to={`/quizzes/${quizDetails.id}/start`}
                  className="block w-full py-3 bg-neon-purple rounded-lg text-white font-medium hover:bg-neon-purple/90 transition-colors mb-4 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowStartModal(true);
                  }}
                >
                  Start Quiz
                </Link>

                <Link
                  to={`/quizzes/${quizDetails.id}/favorite`}
                  className="block w-full py-3 border border-neon-purple text-neon-purple rounded-lg font-medium hover:bg-neon-purple/10 transition-colors text-center"
                >
                  Add to Favorites
                </Link>
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

          {activeTab === "overview" && (
            <div className="glass-panel p-8 rounded-xl mb-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-white mb-4">
                About This Quiz
              </h2>
              <p className="text-muted-foreground mb-8">
                {quizDetails.description}
              </p>

              <h3 className="text-xl font-bold text-white mb-4">
                What You'll Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                    <Brain size={14} className="text-neon-purple" />
                  </div>
                  <p className="text-muted-foreground">
                    Master key concepts in {quizDetails.category}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                    <Brain size={14} className="text-neon-purple" />
                  </div>
                  <p className="text-muted-foreground">
                    Test your knowledge with challenging questions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                    <Brain size={14} className="text-neon-purple" />
                  </div>
                  <p className="text-muted-foreground">
                    Identify areas for improvement
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                    <Brain size={14} className="text-neon-purple" />
                  </div>
                  <p className="text-muted-foreground">
                    Earn badges and climb the leaderboard
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                Badges You Can Earn
              </h3>
              <div className="flex gap-4 mb-8">
                {quizDetails.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="glass-panel p-4 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-white font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                Requirements
              </h3>
              <div className="flex items-start gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                  <CheckCircle size={14} className="text-neon-purple" />
                </div>
                <p className="text-muted-foreground">
                  Basic understanding of {quizDetails.category}
                </p>
              </div>
              <div className="flex items-start gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                  <CheckCircle size={14} className="text-neon-purple" />
                </div>
                <p className="text-muted-foreground">
                  Interest in expanding your knowledge
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                  <CheckCircle size={14} className="text-neon-purple" />
                </div>
                <p className="text-muted-foreground">
                  Willingness to challenge yourself
                </p>
              </div>
            </div>
          )}

          {activeTab === "questions" && (
            <div className="glass-panel p-8 rounded-xl mb-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-white mb-6">
                Sample Questions
              </h2>
              <p className="text-muted-foreground mb-8">
                Here are some sample questions to give you an idea of what to
                expect in this quiz. The actual quiz will contain{" "}
                {quizDetails.questions} questions.
              </p>

              <div className="space-y-8">
                {quizDetails.questionPreview.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="border border-white/10 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-medium text-white mb-4">
                      {qIndex + 1}. {q.question}
                    </h3>
                    <div className="space-y-3">
                      {q.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={`p-3 rounded-lg border ${
                            oIndex === q.correctAnswer
                              ? "border-green-500 bg-green-500/10"
                              : "border-white/10 bg-accent/40"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-6 h-6 rounded-full ${
                                oIndex === q.correctAnswer
                                  ? "bg-green-500 text-white"
                                  : "bg-white/10 text-white"
                              } flex items-center justify-center mr-3`}
                            >
                              {String.fromCharCode(65 + oIndex)}
                            </div>
                            <span
                              className={
                                oIndex === q.correctAnswer
                                  ? "text-green-400"
                                  : "text-muted-foreground"
                              }
                            >
                              {option}
                            </span>
                            {oIndex === q.correctAnswer && (
                              <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="glass-panel p-8 rounded-xl mb-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-white mb-6">
                Leaderboard
              </h2>
              <p className="text-muted-foreground mb-8">
                Top performers on this quiz. Can you make it to the top?
              </p>

              <div className="space-y-4">
                {quizDetails.leaderboard.map((leader) => (
                  <div
                    key={leader.rank}
                    className="flex items-center p-4 bg-accent/40 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium mr-4">
                      {leader.rank}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent mr-4">
                      <img
                        src={leader.avatar}
                        alt={leader.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">
                        {leader.name}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
                      <div className="text-neon-purple font-bold">
                        {leader.score} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Start Quiz Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-xl w-full max-w-lg transform transition-all animate-fade-in">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Start Quiz</h3>
              <button
                className="text-muted-foreground hover:text-white transition-colors"
                onClick={() => setShowStartModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Quiz Details:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title:</span>
                    <span className="text-white">{quizDetails.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span
                      className={getDifficultyColor(quizDetails.difficulty)}
                    >
                      {quizDetails.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions:</span>
                    <span className="text-white">{quizDetails.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Limit:</span>
                    <span className="text-white">{quizDetails.timeLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">XP Reward:</span>
                    <span className="text-neon-purple">
                      {quizDetails.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Rules:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center mt-0.5">
                      <CheckCircle size={12} className="text-neon-purple" />
                    </div>
                    You must complete the quiz within the time limit
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center mt-0.5">
                      <CheckCircle size={12} className="text-neon-purple" />
                    </div>
                    Each question has only one correct answer
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center mt-0.5">
                      <CheckCircle size={12} className="text-neon-purple" />
                    </div>
                    You cannot return to previous questions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center mt-0.5">
                      <CheckCircle size={12} className="text-neon-purple" />
                    </div>
                    Your score will be calculated based on correct answers and
                    time taken
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 py-3 bg-accent/60 rounded-lg text-white hover:bg-accent/80 transition-colors"
                  onClick={() => setShowStartModal(false)}
                >
                  Cancel
                </button>
                <Link
                  to={`/quizzes/${quizDetails.id}/start`}
                  className="flex-1 py-3 bg-neon-purple rounded-lg text-white hover:bg-neon-purple/90 transition-colors text-center"
                >
                  Begin Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDetails;
