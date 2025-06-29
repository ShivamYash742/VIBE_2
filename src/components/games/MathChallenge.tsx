import { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { Coins, Trophy, Clock, RotateCcw, Check, X } from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";
type Operation = "+" | "-" | "×" | "÷";

interface Question {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  options: number[];
  userAnswer: number | null;
  isCorrect: boolean | null;
}

const MathChallenge = () => {
  const { addCurrency } = useGame();
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const totalQuestions = 10;

  const generateQuestion = (
    index: number,
    difficulty: Difficulty
  ): Question => {
    let num1: number, num2: number, answer: number;
    let operation: Operation;

    // Generate numbers based on difficulty
    if (difficulty === "easy") {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      operation = ["+", "-"][Math.floor(Math.random() * 2)] as Operation;
    } else if (difficulty === "medium") {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      operation = ["+", "-", "×"][Math.floor(Math.random() * 3)] as Operation;
    } else {
      num1 = Math.floor(Math.random() * 30) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      operation = ["+", "-", "×", "÷"][
        Math.floor(Math.random() * 4)
      ] as Operation;

      // Ensure division results in whole numbers
      if (operation === "÷") {
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
      }
    }

    // Calculate answer
    switch (operation) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        // Ensure positive result for easier questions
        if (difficulty === "easy" && num1 < num2) {
          [num1, num2] = [num2, num1];
        }
        answer = num1 - num2;
        break;
      case "×":
        answer = num1 * num2;
        break;
      case "÷":
        answer = num1 / num2;
        break;
      default:
        answer = 0;
    }

    // Generate options (including the correct answer)
    const options = [answer];

    // Add incorrect options
    while (options.length < 4) {
      let incorrectAnswer: number;

      // Generate plausible wrong answers
      if (operation === "+") {
        incorrectAnswer =
          answer +
          (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
      } else if (operation === "-") {
        incorrectAnswer =
          answer +
          (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
      } else if (operation === "×") {
        incorrectAnswer =
          answer +
          (Math.floor(Math.random() * (answer / 2)) + 1) *
            (Math.random() < 0.5 ? 1 : -1);
      } else {
        incorrectAnswer =
          answer +
          (Math.floor(Math.random() * 3) + 1) * (Math.random() < 0.5 ? 1 : -1);
      }

      // Ensure positive numbers and no duplicates
      if (incorrectAnswer > 0 && !options.includes(incorrectAnswer)) {
        options.push(incorrectAnswer);
      }
    }

    // Shuffle options
    const shuffledOptions = options.sort(() => 0.5 - Math.random());

    return {
      id: index,
      num1,
      num2,
      operation,
      answer,
      options: shuffledOptions,
      userAnswer: null,
      isCorrect: null,
    };
  };

  const initializeGame = () => {
    // Reset game state
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameCompleted(false);
    setTimer(0);

    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    // Generate questions
    const newQuestions = Array.from({ length: totalQuestions }, (_, i) =>
      generateQuestion(i, difficulty)
    );

    setQuestions(newQuestions);
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

  const handleAnswer = (answer: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;

    // Update question with user's answer
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === currentQuestion.id
          ? { ...q, userAnswer: answer, isCorrect }
          : q
      )
    );

    // Update score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to next question or end game
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setGameCompleted(true);

        if (timerInterval) {
          clearInterval(timerInterval);
          setTimerInterval(null);
        }

        // Award currency based on performance
        const difficultyMultiplier =
          difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2;

        const timeBonus = Math.max(0, 180 - timer);
        const totalReward = Math.floor(
          (50 + (score / totalQuestions) * 50 + timeBonus * 0.2) *
            difficultyMultiplier
        );

        addCurrency(totalReward);
      }, 1000);
    }
  };

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
        <h2 className="text-2xl font-bold text-white">Math Challenge</h2>

        {gameStarted && !gameCompleted && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <Clock className="h-4 w-4 text-neon-blue" />
              <span>{formatTime(timer)}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <Trophy className="h-4 w-4 text-neon-purple" />
              <span>
                Score: {score}/{totalQuestions}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
              <span className="font-medium">
                {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>
          </div>
        )}
      </div>

      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center py-12 gap-6">
          <div className="text-center max-w-md">
            <h3 className="text-xl font-bold text-white mb-2">How to Play</h3>
            <p className="text-muted-foreground mb-4">
              Solve math problems as quickly as possible. Choose the correct
              answer from the options.
            </p>
            <ul className="text-sm text-muted-foreground mb-6 space-y-2">
              <li>• Answer {totalQuestions} questions</li>
              <li>• Higher difficulty = more coins</li>
              <li>• Faster completion = higher score</li>
              <li>• Earn up to 200 coins for perfect play</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <h4 className="text-center text-white font-medium">
              Select Difficulty
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setDifficulty("easy")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  difficulty === "easy"
                    ? "bg-green-500/30 text-green-400 ring-1 ring-green-500/50"
                    : "bg-accent/40 text-muted-foreground hover:text-white hover:bg-accent/60"
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setDifficulty("medium")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  difficulty === "medium"
                    ? "bg-yellow-500/30 text-yellow-400 ring-1 ring-yellow-500/50"
                    : "bg-accent/40 text-muted-foreground hover:text-white hover:bg-accent/60"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setDifficulty("hard")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  difficulty === "hard"
                    ? "bg-red-500/30 text-red-400 ring-1 ring-red-500/50"
                    : "bg-accent/40 text-muted-foreground hover:text-white hover:bg-accent/60"
                }`}
              >
                Hard
              </button>
            </div>

            <button
              onClick={startGame}
              className="mt-4 px-6 py-3 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>
      ) : gameCompleted ? (
        <div className="glass-panel rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Game Completed!</h3>
          <p className="text-muted-foreground mb-4">
            You scored {score} out of {totalQuestions} in {formatTime(timer)}.
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Coins className="h-5 w-5 text-yellow-400" />
            <span className="text-lg font-bold">
              {Math.floor(
                (50 +
                  (score / totalQuestions) * 50 +
                  Math.max(0, 180 - timer) * 0.2) *
                  (difficulty === "easy"
                    ? 1
                    : difficulty === "medium"
                    ? 1.5
                    : 2)
              )}{" "}
              coins earned!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  q.isCorrect ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/40 flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <span>
                    {q.num1} {q.operation} {q.num2} = {q.answer}
                  </span>
                </div>
                <div>
                  {q.isCorrect ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <X className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </div>
            ))}
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
        <div className="flex flex-col items-center">
          <div className="glass-panel rounded-lg p-6 mb-6 w-full max-w-xl">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold mb-4">
                {questions[currentQuestionIndex]?.num1}{" "}
                <span className="text-neon-purple">
                  {questions[currentQuestionIndex]?.operation}
                </span>{" "}
                {questions[currentQuestionIndex]?.num2} = ?
              </div>

              <div className="h-1.5 w-full bg-accent/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neon-purple rounded-full transition-all"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / totalQuestions) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {questions[currentQuestionIndex]?.options.map((option, index) => {
                const currentQuestion = questions[currentQuestionIndex];
                const hasAnswered = currentQuestion.userAnswer !== null;
                const isSelected = currentQuestion.userAnswer === option;
                const isCorrect = option === currentQuestion.answer;

                return (
                  <button
                    key={index}
                    onClick={() => !hasAnswered && handleAnswer(option)}
                    disabled={hasAnswered}
                    className={`py-4 rounded-lg text-lg font-medium transition-all ${
                      hasAnswered
                        ? isCorrect
                          ? "bg-green-500/30 text-green-400"
                          : isSelected
                          ? "bg-red-500/30 text-red-400"
                          : "bg-accent/40 text-muted-foreground"
                        : "bg-accent/40 hover:bg-accent/60 text-white"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathChallenge;
