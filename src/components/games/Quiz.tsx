import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Check, X, Trophy, Clock, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  subject: string;
  icon: React.ReactNode;
  questions: Question[];
  timeLimit?: number; // in seconds
}

const Quiz: React.FC<QuizProps> = ({
  subject,
  icon,
  questions,
  timeLimit = 300, // 5 minutes default
}) => {
  const { addCurrency } = useGame();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || showResult) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showResult]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    // Update score if correct
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    // Reset selected option
    setSelectedOption(null);
    setShowExplanation(false);

    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setShowResult(true);

    // Calculate points based on score and time
    const timeBonus = Math.max(0, Math.floor(timeRemaining / 10));
    const totalPoints = score * 100 + timeBonus;

    // Add currency
    addCurrency(Math.floor(totalPoints / 10));

    toast.success("Quiz completed!");
    toast(
      `You earned ${totalPoints} points and ${Math.floor(
        totalPoints / 10
      )} coins!`
    );
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswers(Array(questions.length).fill(null));
    setTimeRemaining(timeLimit);
    setQuizStarted(true);
    setShowExplanation(false);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="glass-panel rounded-xl p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            {icon}
            {subject} Quiz
          </h2>
          <p className="text-muted-foreground">
            Test your knowledge of {subject.toLowerCase()}
          </p>
        </div>

        {quizStarted && !showResult && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <Clock className="h-4 w-4 text-neon-blue" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <Trophy className="h-4 w-4 text-neon-purple" />
              <span>
                Score: {score}/{questions.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {!quizStarted ? (
        <div className="glass-panel rounded-xl p-6 mb-6 text-center flex flex-col items-center max-w-xl mx-auto">
          <div className="w-16 h-16 mb-4 rounded-xl bg-accent/40 flex items-center justify-center">
            {icon}
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Welcome to the {subject} Quiz
          </h3>
          <p className="text-muted-foreground mb-6">
            Test your knowledge with {questions.length} questions. You have{" "}
            {formatTime(timeLimit)} to complete the quiz.
          </p>

          <div className="w-full max-w-sm mb-6">
            <h4 className="font-medium text-white mb-3">Quiz Details:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-accent/40">
                <div className="text-muted-foreground mb-1">Questions</div>
                <div className="font-medium text-white">{questions.length}</div>
              </div>
              <div className="p-3 rounded-lg bg-accent/40">
                <div className="text-muted-foreground mb-1">Time Limit</div>
                <div className="font-medium text-white">
                  {formatTime(timeLimit)}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-accent/40">
                <div className="text-muted-foreground mb-1">Difficulty</div>
                <div className="font-medium text-white">
                  {questions.length <= 5
                    ? "Easy"
                    : questions.length <= 10
                    ? "Medium"
                    : "Hard"}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-accent/40">
                <div className="text-muted-foreground mb-1">Points</div>
                <div className="font-medium text-white">
                  100 per correct answer
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
          >
            Start Quiz
          </button>
        </div>
      ) : showResult ? (
        <div className="glass-panel rounded-xl p-6 text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">Quiz Completed!</h3>
          <p className="text-muted-foreground mb-4">
            You scored {score} out of {questions.length} with{" "}
            {formatTime(timeRemaining)} remaining.
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-bold text-white">
              {score * 100 + Math.max(0, Math.floor(timeRemaining / 10))} points
              earned!
            </span>
          </div>

          {/* Results breakdown */}
          <div className="mb-6">
            <h4 className="font-medium text-white mb-3 text-left">
              Question Summary:
            </h4>
            <div className="space-y-2 text-left">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className={cn(
                    "p-3 rounded-lg border",
                    answers[index] === q.correctAnswer
                      ? "border-green-500/30 bg-green-500/10"
                      : "border-red-500/30 bg-red-500/10"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium mb-1">
                        {index + 1}. {q.question}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Your answer:{" "}
                        {answers[index] !== null
                          ? q.options[answers[index]]
                          : "Not answered"}
                      </p>
                      <p className="text-xs text-green-400">
                        Correct answer: {q.options[q.correctAnswer]}
                      </p>
                    </div>
                    <div className="ml-3">
                      {answers[index] === q.correctAnswer ? (
                        <Check className="h-5 w-5 text-green-400" />
                      ) : (
                        <X className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="px-6 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="glass-panel rounded-xl p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-white">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
              <span className="text-sm text-muted-foreground">
                {Math.floor((currentQuestionIndex / questions.length) * 100)}%
                Complete
              </span>
            </div>
            <div className="w-full h-2 bg-accent/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-neon-purple rounded-full transition-all"
                style={{
                  width: `${(currentQuestionIndex / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={cn(
                    "w-full p-4 rounded-lg border text-left transition-all",
                    selectedOption === index
                      ? "border-neon-purple bg-neon-purple/10"
                      : "border-white/10 hover:border-neon-purple/30 hover:bg-neon-purple/5"
                  )}
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
              ))}
            </div>
          </div>

          {showExplanation && currentQuestion.explanation && (
            <div className="mb-6 p-4 rounded-lg bg-accent/20 border border-white/10">
              <h4 className="font-medium text-white mb-2">Explanation:</h4>
              <p className="text-muted-foreground text-sm">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between">
            {currentQuestion.explanation && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-4 py-2 rounded-lg bg-accent/40 hover:bg-accent/60 text-white transition-colors"
              >
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </button>
            )}
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className={cn(
                "px-6 py-2 rounded-lg flex items-center gap-2 transition-colors",
                selectedOption !== null
                  ? "bg-neon-purple hover:bg-neon-purple/90 text-white"
                  : "bg-accent/40 text-muted-foreground cursor-not-allowed"
              )}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
