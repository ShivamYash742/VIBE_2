import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  X,
  Home,
} from "lucide-react";
import QuizQuestion, { QuizQuestionData } from "./QuizQuestion";
import { useGame } from "../contexts/GameContext";

interface QuizSessionProps {
  quizId: string;
  quizTitle: string;
  questions: QuizQuestionData[];
  timeLimit?: number; // in minutes for the whole quiz
  onComplete?: (score: number, totalPossible: number) => void;
  onExit?: () => void;
}

const QuizSession = ({
  quizId,
  quizTitle,
  questions,
  timeLimit,
  onComplete,
  onExit,
}: QuizSessionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { isCorrect: boolean; points: number }[]
  >([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    timeLimit ? timeLimit * 60 : 0
  ); // convert to seconds
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const { addCurrency, updateMissionProgress } = useGame();

  // Calculate score
  const score = answers.reduce((total, answer) => total + answer.points, 0);
  const totalPossible = questions.reduce(
    (total, question) => total + question.points,
    0
  );
  const percentageScore =
    totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;

  // Timer effect
  useEffect(() => {
    if (!timeLimit || quizCompleted || isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit if time runs out
          if (!quizCompleted) {
            setQuizCompleted(true);
            onComplete?.(score, totalPossible);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit, quizCompleted, isPaused, score, totalPossible, onComplete]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle answer submission
  const handleAnswer = (isCorrect: boolean, points: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = { isCorrect, points };
    setAnswers(newAnswers);
  };

  // Move to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };

  // Move to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Complete the quiz
  const completeQuiz = () => {
    setQuizCompleted(true);

    // Update mission progress
    updateMissionProgress("daily-1", 1); // Update "Quiz Master" mission

    // If perfect score, update that mission too
    if (percentageScore === 100) {
      updateMissionProgress("daily-2", 1); // Update "Perfect Score" mission
    }

    // Add bonus currency for completing the quiz
    const completionBonus = 50;
    addCurrency(completionBonus);

    onComplete?.(score, totalPossible);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        {!quizCompleted ? (
          <>
            {/* Quiz header */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-white">{quizTitle}</h1>
                {timeLimit && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/30 text-white">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Current question */}
            <QuizQuestion
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />

            {/* Navigation buttons */}
            <div className="mt-6 flex justify-between">
              <button
                className="px-4 py-2 rounded-lg bg-accent/40 text-white flex items-center gap-2 hover:bg-accent/60 transition-colors"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="h-5 w-5" />
                Previous
              </button>

              <div className="flex gap-4">
                <button
                  className="px-4 py-2 rounded-lg bg-accent/40 text-white hover:bg-accent/60 transition-colors"
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to exit the quiz? Your progress will be lost."
                      )
                    ) {
                      onExit?.();
                    }
                  }}
                >
                  Exit Quiz
                </button>
              </div>

              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  answers[currentQuestionIndex]
                    ? "bg-neon-purple text-white hover:bg-neon-purple/90"
                    : "bg-accent/40 text-muted-foreground cursor-not-allowed"
                }`}
                onClick={goToNextQuestion}
                disabled={!answers[currentQuestionIndex]}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
                {currentQuestionIndex === questions.length - 1 ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </button>
            </div>
          </>
        ) : (
          // Quiz results
          <div className="glass-panel rounded-xl overflow-hidden border border-white/5 max-w-3xl mx-auto">
            <div className="p-8">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full flex items-center justify-center bg-accent/30 border-4 border-neon-purple">
                    <span className="text-4xl font-bold text-white">
                      {percentageScore}%
                    </span>
                  </div>
                  <Trophy
                    className={`h-12 w-12 absolute -top-2 -right-2 ${
                      percentageScore >= 80
                        ? "text-yellow-400"
                        : percentageScore >= 60
                        ? "text-gray-400"
                        : "text-amber-700"
                    }`}
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Quiz Completed!
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                You scored {score} out of {totalPossible} points
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-white">
                  Question Summary
                </h3>
                <div className="space-y-2">
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            answers[index]?.isCorrect
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {answers[index]?.isCorrect ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </div>
                        <span className="text-white">Question {index + 1}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Points: </span>
                        <span className="font-medium text-white">
                          {answers[index]?.points || 0} / {question.points}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-6 py-3 rounded-lg bg-accent/40 text-white flex items-center justify-center gap-2 hover:bg-accent/60 transition-colors"
                  onClick={() => navigate(`/quizzes/${quizId}`)}
                >
                  <Home className="h-5 w-5" />
                  Back to Quiz
                </button>
                <button
                  className="px-6 py-3 rounded-lg bg-neon-purple text-white flex items-center justify-center gap-2 hover:bg-neon-purple/90 transition-colors"
                  onClick={() => {
                    // Reset the quiz
                    setCurrentQuestionIndex(0);
                    setAnswers([]);
                    setQuizCompleted(false);
                    setTimeRemaining(timeLimit ? timeLimit * 60 : 0);
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSession;
