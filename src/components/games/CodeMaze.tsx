import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Code,
  Trophy,
  Clock,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";

type CellType = "wall" | "path" | "start" | "end" | "player" | "solution";

interface Position {
  row: number;
  col: number;
}

const CodeMaze = () => {
  const { addCurrency } = useGame();
  const [maze, setMaze] = useState<CellType[][]>([]);
  const [playerPosition, setPlayerPosition] = useState<Position>({
    row: 0,
    col: 0,
  });
  const [startPosition, setStartPosition] = useState<Position>({
    row: 0,
    col: 0,
  });
  const [endPosition, setEndPosition] = useState<Position>({ row: 0, col: 0 });
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [showMission, setShowMission] = useState(true);
  const [showSolution, setShowSolution] = useState(false);

  // Generate a maze
  const generateMaze = useCallback((level: number) => {
    const size = 7 + Math.min(10, level);
    const newMaze: CellType[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill("path"));

    // Add walls (more walls for higher levels)
    const wallPercentage = 0.2 + level * 0.02;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (Math.random() < wallPercentage) {
          newMaze[row][col] = "wall";
        }
      }
    }

    // Find a valid start position (top rows)
    let startRow, startCol;
    do {
      startRow = Math.floor(Math.random() * 2);
      startCol = Math.floor(Math.random() * size);
    } while (newMaze[startRow][startCol] === "wall");

    // Find a valid end position (bottom rows)
    let endRow, endCol;
    do {
      endRow = size - 1 - Math.floor(Math.random() * 2);
      endCol = Math.floor(Math.random() * size);
    } while (newMaze[endRow][endCol] === "wall");

    // Set start and end
    newMaze[startRow][startCol] = "start";
    newMaze[endRow][endCol] = "end";

    // Make sure there's a possible path (simple version)
    // In a real game, you'd want a more sophisticated path-finding algorithm
    const ensurePath = (maze: CellType[][], start: Position, end: Position) => {
      let currentPos = { ...start };

      // Create a path roughly toward the end
      while (currentPos.row !== end.row || currentPos.col !== end.col) {
        // Decide whether to move horizontally or vertically
        const moveVertical = Math.random() < 0.5 || currentPos.col === end.col;

        if (moveVertical && currentPos.row !== end.row) {
          // Move down or up
          currentPos.row += currentPos.row < end.row ? 1 : -1;
        } else if (currentPos.col !== end.col) {
          // Move right or left
          currentPos.col += currentPos.col < end.col ? 1 : -1;
        }

        // Ensure we're in bounds
        currentPos.row = Math.max(0, Math.min(currentPos.row, maze.length - 1));
        currentPos.col = Math.max(
          0,
          Math.min(currentPos.col, maze[0].length - 1)
        );

        // Clear this cell if it's a wall
        if (maze[currentPos.row][currentPos.col] === "wall") {
          maze[currentPos.row][currentPos.col] = "path";
        }
      }
    };

    ensurePath(
      newMaze,
      { row: startRow, col: startCol },
      { row: endRow, col: endCol }
    );

    setMaze(newMaze);
    setStartPosition({ row: startRow, col: startCol });
    setEndPosition({ row: endRow, col: endCol });
    setPlayerPosition({ row: startRow, col: startCol });
    setMoves(0);
    setGameOver(false);
    setTimer(0);
    setIsTimerRunning(false);
    setShowSolution(false);

    return newMaze;
  }, []);

  // Find a solution path (simple implementation)
  const findSolution = (maze: CellType[][], start: Position, end: Position) => {
    // Simple breadth-first search
    const queue: { pos: Position; path: Position[] }[] = [
      { pos: start, path: [start] },
    ];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const { pos, path } = queue.shift()!;
      const key = `${pos.row},${pos.col}`;

      if (pos.row === end.row && pos.col === end.col) {
        return path;
      }

      if (visited.has(key)) continue;
      visited.add(key);

      // Check all four directions
      const directions = [
        { row: -1, col: 0 }, // up
        { row: 1, col: 0 }, // down
        { row: 0, col: -1 }, // left
        { row: 0, col: 1 }, // right
      ];

      for (const dir of directions) {
        const newRow = pos.row + dir.row;
        const newCol = pos.col + dir.col;

        // Check if valid move
        if (
          newRow >= 0 &&
          newRow < maze.length &&
          newCol >= 0 &&
          newCol < maze[0].length &&
          maze[newRow][newCol] !== "wall"
        ) {
          queue.push({
            pos: { row: newRow, col: newCol },
            path: [...path, { row: newRow, col: newCol }],
          });
        }
      }
    }

    return null; // No solution found
  };

  // Initialize maze
  useEffect(() => {
    generateMaze(currentLevel);
  }, [currentLevel, generateMaze]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && !gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, gameOver]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || showMission) return;

      if (!isTimerRunning) {
        setIsTimerRunning(true);
      }

      let newRow = playerPosition.row;
      let newCol = playerPosition.col;

      switch (e.key) {
        case "ArrowUp":
          newRow--;
          break;
        case "ArrowDown":
          newRow++;
          break;
        case "ArrowLeft":
          newCol--;
          break;
        case "ArrowRight":
          newCol++;
          break;
        default:
          return;
      }

      // Check if valid move
      if (
        newRow >= 0 &&
        newRow < maze.length &&
        newCol >= 0 &&
        newCol < maze[0].length &&
        maze[newRow][newCol] !== "wall"
      ) {
        setPlayerPosition({ row: newRow, col: newCol });
        setMoves((prev) => prev + 1);

        // Check if reached the end
        if (maze[newRow][newCol] === "end") {
          const timeBonus = Math.max(0, 300 - timer);
          const movesPenalty = moves * 5;
          const levelBonus = currentLevel * 100;
          const totalPoints = levelBonus + timeBonus - movesPenalty;

          setScore((prev) => prev + totalPoints);
          setIsTimerRunning(false);
          setGameOver(true);

          // Add currency to the game context
          addCurrency(Math.floor(totalPoints / 10));

          toast.success(`Level ${currentLevel} completed!`);
          toast(
            `You earned ${totalPoints} points and ${Math.floor(
              totalPoints / 10
            )} coins!`
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    playerPosition,
    maze,
    gameOver,
    isTimerRunning,
    moves,
    currentLevel,
    showMission,
    addCurrency,
  ]);

  const restartLevel = () => {
    generateMaze(currentLevel);
    setShowMission(true);
  };

  const nextLevel = () => {
    setCurrentLevel((prev) => prev + 1);
    setShowMission(true);
  };

  const toggleSolution = () => {
    if (!showSolution) {
      const solution = findSolution(maze, startPosition, endPosition);

      if (solution) {
        const newMaze = maze.map((row) => [...row]);

        // Mark solution path
        for (let i = 1; i < solution.length - 1; i++) {
          const { row, col } = solution[i];
          if (newMaze[row][col] === "path") {
            newMaze[row][col] = "solution";
          }
        }

        setMaze(newMaze);
        setShowSolution(true);
      }
    } else {
      // Hide solution
      const newMaze = maze.map((row) =>
        row.map((cell) => (cell === "solution" ? "path" : cell))
      );

      setMaze(newMaze);
      setShowSolution(false);
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

  // Handle direction button clicks (for mobile)
  const handleDirectionClick = (
    direction: "up" | "down" | "left" | "right"
  ) => {
    if (gameOver || showMission) return;

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    let newRow = playerPosition.row;
    let newCol = playerPosition.col;

    switch (direction) {
      case "up":
        newRow--;
        break;
      case "down":
        newRow++;
        break;
      case "left":
        newCol--;
        break;
      case "right":
        newCol++;
        break;
    }

    // Check if valid move
    if (
      newRow >= 0 &&
      newRow < maze.length &&
      newCol >= 0 &&
      newCol < maze[0].length &&
      maze[newRow][newCol] !== "wall"
    ) {
      setPlayerPosition({ row: newRow, col: newCol });
      setMoves((prev) => prev + 1);

      // Check if reached the end
      if (maze[newRow][newCol] === "end") {
        const timeBonus = Math.max(0, 300 - timer);
        const movesPenalty = moves * 5;
        const levelBonus = currentLevel * 100;
        const totalPoints = levelBonus + timeBonus - movesPenalty;

        setScore((prev) => prev + totalPoints);
        setIsTimerRunning(false);
        setGameOver(true);

        // Add currency to the game context
        addCurrency(Math.floor(totalPoints / 10));

        toast.success(`Level ${currentLevel} completed!`);
        toast(
          `You earned ${totalPoints} points and ${Math.floor(
            totalPoints / 10
          )} coins!`
        );
      }
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Code className="h-6 w-6 text-neon-purple" />
            Code Maze
          </h2>
          <p className="text-muted-foreground">
            Navigate through the maze to find the exit
          </p>
        </div>

        <div className="flex items-center gap-4">
          {!showMission && !gameOver && (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
                <Clock className="h-4 w-4 text-neon-blue" />
                <span>{formatTime(timer)}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
                <Trophy className="h-4 w-4 text-neon-purple" />
                <span>Level: {currentLevel}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/40">
                <span>Moves: {moves}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {showMission ? (
        <div className="glass-panel rounded-xl p-6 mb-6 text-center flex flex-col items-center max-w-xl mx-auto">
          <div className="w-16 h-16 mb-4 rounded-xl bg-accent/40 flex items-center justify-center">
            <Code className="h-8 w-8 text-neon-purple" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Level {currentLevel} Mission
          </h3>
          <p className="text-muted-foreground mb-6">
            Navigate through the maze to find the exit. Use arrow keys or the
            direction buttons to move. Avoid walls and find the most efficient
            path!
          </p>

          <div className="w-full max-w-sm mb-6">
            <h4 className="font-medium text-white mb-3">Level Details:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-accent/40">
                <div className="text-muted-foreground mb-1">Maze Size</div>
                <div className="font-medium text-white">
                  {maze.length}x{maze[0]?.length || 0}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-accent/40">
                <div className="text-muted-foreground mb-1">Difficulty</div>
                <div className="font-medium text-white">
                  {currentLevel <= 3
                    ? "Easy"
                    : currentLevel <= 6
                    ? "Medium"
                    : "Hard"}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-accent/40">
                <div className="text-muted-foreground mb-1">Base Points</div>
                <div className="font-medium text-white">
                  {currentLevel * 100}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-accent/40">
                <div className="text-muted-foreground mb-1">Time Bonus</div>
                <div className="font-medium text-white">Up to 300</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowMission(false)}
            className="px-6 py-3 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white font-medium transition-colors"
          >
            Start Level
          </button>
        </div>
      ) : gameOver ? (
        <div className="glass-panel rounded-xl p-6 text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">
            Level {currentLevel} Completed!
          </h3>
          <p className="text-muted-foreground mb-4">
            You reached the exit in {formatTime(timer)} with {moves} moves.
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-bold text-white">
              {score} points earned!
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={restartLevel}
              className="px-4 py-2 rounded-lg bg-accent/40 hover:bg-accent/60 text-white transition-colors"
            >
              Replay Level
            </button>
            <button
              onClick={nextLevel}
              className="px-4 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white transition-colors"
            >
              Next Level
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid place-items-center mb-6">
            <div
              className="grid gap-px bg-accent/20 rounded-lg overflow-hidden border border-accent/30"
              style={{
                gridTemplateRows: `repeat(${maze.length}, minmax(0, 1fr))`,
                gridTemplateColumns: `repeat(${
                  maze[0]?.length || 0
                }, minmax(0, 1fr))`,
              }}
            >
              {maze.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isPlayer =
                    rowIndex === playerPosition.row &&
                    colIndex === playerPosition.col;
                  const isStart = cell === "start";
                  const isEnd = cell === "end";

                  let cellClass =
                    "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center";

                  if (cell === "wall") {
                    cellClass += " bg-accent/80";
                  } else if (isPlayer) {
                    cellClass += " bg-neon-purple/30";
                  } else if (isStart) {
                    cellClass += " bg-green-500/20";
                  } else if (isEnd) {
                    cellClass += " bg-blue-500/20";
                  } else if (cell === "solution") {
                    cellClass += " bg-yellow-500/20";
                  } else {
                    cellClass += " bg-accent/10";
                  }

                  return (
                    <div key={`${rowIndex}-${colIndex}`} className={cellClass}>
                      {isPlayer && (
                        <div className="w-4 h-4 rounded-full bg-neon-purple animate-pulse" />
                      )}
                      {isStart && !isPlayer && (
                        <div className="text-xs text-green-400">S</div>
                      )}
                      {isEnd && <div className="text-xs text-blue-400">E</div>}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Direction controls for mobile */}
            <div className="grid grid-cols-3 gap-2 w-40 mb-4">
              <div className="col-start-2">
                <button
                  onClick={() => handleDirectionClick("up")}
                  className="w-12 h-12 rounded-lg bg-accent/40 hover:bg-accent/60 flex items-center justify-center"
                >
                  <ArrowUp className="h-6 w-6" />
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDirectionClick("left")}
                  className="w-12 h-12 rounded-lg bg-accent/40 hover:bg-accent/60 flex items-center justify-center"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDirectionClick("down")}
                  className="w-12 h-12 rounded-lg bg-accent/40 hover:bg-accent/60 flex items-center justify-center"
                >
                  <ArrowDown className="h-6 w-6" />
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDirectionClick("right")}
                  className="w-12 h-12 rounded-lg bg-accent/40 hover:bg-accent/60 flex items-center justify-center"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={restartLevel}
                className="px-4 py-2 rounded-lg bg-accent/40 hover:bg-accent/60 text-white transition-colors flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Restart
              </button>
              <button
                onClick={toggleSolution}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  showSolution
                    ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                    : "bg-accent/40 text-white hover:bg-accent/60"
                }`}
              >
                {showSolution ? "Hide Solution" : "Show Solution"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CodeMaze;
