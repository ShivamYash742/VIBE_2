import { useState } from "react";
import { CheckCircle, X, HelpCircle, Clock } from "lucide-react";
import { useGame } from "../contexts/GameContext";

export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "fill-blank"
  | "matching";

export interface QuizQuestionData {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  timeLimit?: number; // in seconds
  image?: string;
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  onAnswer: (isCorrect: boolean, points: number) => void;
  showFeedback?: boolean;
  questionNumber: number;
  totalQuestions: number;
}

const QuizQuestion = ({
  question,
  onAnswer,
  showFeedback = true,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(question.timeLimit || 0);
  const { addCurrency, updateMissionProgress } = useGame();

  // Check if the answer is correct
  const checkAnswer = (answer: string | string[]) => {
    if (hasAnswered) return;

    let correct = false;
    if (Array.isArray(question.correctAnswer)) {
      // For matching questions
      correct =
        JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
    } else {
      // For other question types
      correct = answer === question.correctAnswer;
    }

    setIsCorrect(correct);
    setHasAnswered(true);
    setShowExplanation(true);

    if (correct) {
      // Update mission progress for "Perfect Score" mission
      updateMissionProgress("daily-2", 1);

      // Add currency reward
      addCurrency(question.points);
    }

    onAnswer(correct, correct ? question.points : 0);
  };

  // Render different question types
  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  hasAnswered
                    ? selectedAnswer === option
                      ? isCorrect
                        ? "bg-green-500/20 border border-green-500/50 text-white"
                        : "bg-red-500/20 border border-red-500/50 text-white"
                      : question.correctAnswer === option && showFeedback
                      ? "bg-green-500/20 border border-green-500/50 text-white"
                      : "bg-accent/30 border border-white/10 text-muted-foreground"
                    : selectedAnswer === option
                    ? "bg-accent/50 border border-white/20 text-white"
                    : "bg-accent/30 border border-white/10 text-muted-foreground hover:bg-accent/40 hover:text-white"
                }`}
                onClick={() => {
                  if (!hasAnswered) {
                    setSelectedAnswer(option);
                    checkAnswer(option);
                  }
                }}
                disabled={hasAnswered}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {hasAnswered && selectedAnswer === option && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <X className="h-5 w-5 text-red-400" />
                      )}
                    </span>
                  )}
                  {hasAnswered &&
                    selectedAnswer !== option &&
                    question.correctAnswer === option &&
                    showFeedback && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                </div>
              </button>
            ))}
          </div>
        );

      case "true-false":
        return (
          <div className="flex gap-4">
            {["True", "False"].map((option) => (
              <button
                key={option}
                className={`flex-1 p-4 rounded-lg text-center font-medium transition-all ${
                  hasAnswered
                    ? selectedAnswer === option
                      ? isCorrect
                        ? "bg-green-500/20 border border-green-500/50 text-white"
                        : "bg-red-500/20 border border-red-500/50 text-white"
                      : question.correctAnswer === option && showFeedback
                      ? "bg-green-500/20 border border-green-500/50 text-white"
                      : "bg-accent/30 border border-white/10 text-muted-foreground"
                    : selectedAnswer === option
                    ? "bg-accent/50 border border-white/20 text-white"
                    : "bg-accent/30 border border-white/10 text-muted-foreground hover:bg-accent/40 hover:text-white"
                }`}
                onClick={() => {
                  if (!hasAnswered) {
                    setSelectedAnswer(option);
                    checkAnswer(option);
                  }
                }}
                disabled={hasAnswered}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{option}</span>
                  {hasAnswered && selectedAnswer === option && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <X className="h-5 w-5 text-red-400" />
                      )}
                    </span>
                  )}
                  {hasAnswered &&
                    selectedAnswer !== option &&
                    question.correctAnswer === option &&
                    showFeedback && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                </div>
              </button>
            ))}
          </div>
        );

      case "fill-blank":
        return (
          <div className="space-y-4">
            <input
              type="text"
              className={`w-full p-4 rounded-lg bg-accent/30 border ${
                hasAnswered
                  ? isCorrect
                    ? "border-green-500/50 text-white"
                    : "border-red-500/50 text-white"
                  : "border-white/10 text-white"
              } focus:outline-none focus:ring-2 focus:ring-neon-purple/50`}
              placeholder="Type your answer here..."
              value={selectedAnswer as string}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !hasAnswered) {
                  checkAnswer(selectedAnswer as string);
                }
              }}
              disabled={hasAnswered}
            />
            {hasAnswered && !isCorrect && showFeedback && (
              <div className="text-sm text-muted-foreground">
                Correct answer:{" "}
                <span className="text-green-400">{question.correctAnswer}</span>
              </div>
            )}
            {!hasAnswered && (
              <button
                className="px-4 py-2 bg-neon-purple rounded-lg text-white font-medium hover:bg-neon-purple/90 transition-colors"
                onClick={() => checkAnswer(selectedAnswer as string)}
              >
                Submit Answer
              </button>
            )}
          </div>
        );

      case "matching":
        // This is a simplified version of matching - in a real app, you'd want drag and drop
        return (
          <div className="space-y-4">
            {question.options
              ?.slice(0, question.options.length / 2)
              .map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 p-3 bg-accent/30 border border-white/10 rounded-lg">
                    {item}
                  </div>
                  <select
                    className={`flex-1 p-3 rounded-lg bg-accent/30 border ${
                      hasAnswered
                        ? (selectedAnswer as string[])[index] ===
                          (question.correctAnswer as string[])[index]
                          ? "border-green-500/50 text-white"
                          : "border-red-500/50 text-white"
                        : "border-white/10 text-white"
                    }`}
                    value={(selectedAnswer as string[])[index] || ""}
                    onChange={(e) => {
                      const newAnswers = [...(selectedAnswer as string[])];
                      newAnswers[index] = e.target.value;
                      setSelectedAnswer(newAnswers);
                    }}
                    disabled={hasAnswered}
                  >
                    <option value="">Select a match</option>
                    {question.options
                      ?.slice(question.options.length / 2)
                      .map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
            {!hasAnswered && (
              <button
                className="px-4 py-2 bg-neon-purple rounded-lg text-white font-medium hover:bg-neon-purple/90 transition-colors"
                onClick={() => checkAnswer(selectedAnswer as string[])}
              >
                Submit Matches
              </button>
            )}
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-white/5">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-accent/40 text-white text-sm font-medium">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-sm font-medium">
              {question.points} points
            </span>
          </div>
          {question.timeLimit && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>

        {question.image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={question.image}
              alt="Question illustration"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}

        <h3 className="text-xl font-semibold text-white mb-6">
          {question.question}
        </h3>

        {renderQuestionContent()}

        {hasAnswered && (
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-medium">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 text-red-400" />
                    <span className="text-red-400 font-medium">Incorrect</span>
                  </>
                )}
              </div>
              {question.explanation && (
                <button
                  className="flex items-center gap-1 text-sm text-neon-purple hover:underline"
                  onClick={() => setShowExplanation(!showExplanation)}
                >
                  <HelpCircle className="h-4 w-4" />
                  {showExplanation ? "Hide" : "Show"} Explanation
                </button>
              )}
            </div>
            {showExplanation && question.explanation && (
              <div className="mt-4 p-4 bg-accent/30 rounded-lg text-sm text-muted-foreground">
                {question.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
