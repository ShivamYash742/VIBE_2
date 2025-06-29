
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Code, Trophy, Clock, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

type CellType = 'wall' | 'path' | 'start' | 'end' | 'player' | 'solution';

interface Position {
  row: number;
  col: number;
}

const CodeMaze = () => {
  const [maze, setMaze] = useState<CellType[][]>([]);
  const [playerPosition, setPlayerPosition] = useState<Position>({ row: 0, col: 0 });
  const [startPosition, setStartPosition] = useState<Position>({ row: 0, col: 0 });
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
    const newMaze: CellType[][] = Array(size).fill(null).map(() => 
      Array(size).fill('path')
    );
    
    // Add walls (more walls for higher levels)
    const wallPercentage = 0.2 + (level * 0.02);
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (Math.random() < wallPercentage) {
          newMaze[row][col] = 'wall';
        }
      }
    }
    
    // Find a valid start position (top rows)
    let startRow, startCol;
    do {
      startRow = Math.floor(Math.random() * 2);
      startCol = Math.floor(Math.random() * size);
    } while (newMaze[startRow][startCol] === 'wall');
    
    // Find a valid end position (bottom rows)
    let endRow, endCol;
    do {
      endRow = size - 1 - Math.floor(Math.random() * 2);
      endCol = Math.floor(Math.random() * size);
    } while (newMaze[endRow][endCol] === 'wall');
    
    // Set start and end
    newMaze[startRow][startCol] = 'start';
    newMaze[endRow][endCol] = 'end';
    
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
          currentPos.row += (currentPos.row < end.row) ? 1 : -1;
        } else if (currentPos.col !== end.col) {
          // Move right or left
          currentPos.col += (currentPos.col < end.col) ? 1 : -1;
        }
        
        // Ensure we're in bounds
        currentPos.row = Math.max(0, Math.min(currentPos.row, maze.length - 1));
        currentPos.col = Math.max(0, Math.min(currentPos.col, maze[0].length - 1));
        
        // Clear this cell if it's a wall
        if (maze[currentPos.row][currentPos.col] === 'wall') {
          maze[currentPos.row][currentPos.col] = 'path';
        }
      }
    };
    
    ensurePath(newMaze, { row: startRow, col: startCol }, { row: endRow, col: endCol });
    
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
    const queue: { pos: Position; path: Position[] }[] = [{ pos: start, path: [start] }];
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
        { row: 1, col: 0 },  // down
        { row: 0, col: -1 }, // left
        { row: 0, col: 1 }   // right
      ];
      
      for (const dir of directions) {
        const newRow = pos.row + dir.row;
        const newCol = pos.col + dir.col;
        
        // Check if valid move
        if (
          newRow >= 0 && newRow < maze.length &&
          newCol >= 0 && newCol < maze[0].length &&
          maze[newRow][newCol] !== 'wall'
        ) {
          queue.push({
            pos: { row: newRow, col: newCol },
            path: [...path, { row: newRow, col: newCol }]
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
        setTimer(prev => prev + 1);
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
        case 'ArrowUp':
          newRow--;
          break;
        case 'ArrowDown':
          newRow++;
          break;
        case 'ArrowLeft':
          newCol--;
          break;
        case 'ArrowRight':
          newCol++;
          break;
        default:
          return;
      }
      
      // Check if valid move
      if (
        newRow >= 0 && newRow < maze.length &&
        newCol >= 0 && newCol < maze[0].length &&
        maze[newRow][newCol] !== 'wall'
      ) {
        setPlayerPosition({ row: newRow, col: newCol });
        setMoves(prev => prev + 1);
        
        // Check if reached the end
        if (maze[newRow][newCol] === 'end') {
          const timeBonus = Math.max(0, 300 - timer);
          const movesPenalty = moves * 5;
          const levelBonus = currentLevel * 100;
          const totalPoints = levelBonus + timeBonus - movesPenalty;
          
          setScore(prev => prev + totalPoints);
          setIsTimerRunning(false);
          setGameOver(true);
          
          toast.success(`Level ${currentLevel} completed!`);
          toast(`You earned ${totalPoints} points!`);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, maze, gameOver, isTimerRunning, moves, currentLevel, showMission]);
  
  const restartLevel = () => {
    generateMaze(currentLevel);
    setShowMission(true);
  };
  
  const nextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    setShowMission(true);
  };
  
  const toggleSolution = () => {
    if (!showSolution) {
      const solution = findSolution(maze, startPosition, endPosition);
      
      if (solution) {
        const newMaze = maze.map(row => [...row]);
        
        // Mark solution path
        for (let i = 1; i < solution.length - 1; i++) {
          const { row, col } = solution[i];
          if (newMaze[row][col] === 'path') {
            newMaze[row][col] = 'solution';
          }
        }
        
        setMaze(newMaze);
        setShowSolution(true);
      }
    } else {
      // Reset solution display
      const newMaze = maze.map(row => row.map(cell => 
        cell === 'solution' ? 'path' : cell
      ));
      setMaze(newMaze);
      setShowSolution(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            Code Maze
          </h2>
          <p className="text-muted-foreground">Navigate through the maze to solve coding puzzles</p>
        </div>
        
        <div className="px-4 py-2 bg-primary/10 rounded-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="font-medium">{score} Points</span>
        </div>
      </div>
      
      {showMission ? (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6 text-center flex flex-col items-center max-w-xl mx-auto animate-scale-in">
          <div className="w-16 h-16 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
            <Code className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Level {currentLevel} Mission</h3>
          
          <p className="text-muted-foreground mb-4">
            Navigate through the maze from start to finish using the arrow keys.
            The code maze represents a programming challenge - finding the optimal path!
          </p>
          
          <div className="py-4 px-6 bg-primary/5 rounded-lg mb-6 text-sm">
            <p className="font-medium mb-1">Level {currentLevel} Rules:</p>
            <ul className="text-left text-muted-foreground space-y-1">
              <li>• Use arrow keys to navigate</li>
              <li>• Find the path from start to end</li>
              <li>• Avoid walls - they represent syntax errors</li>
              <li>• Complete the maze in fewer moves for higher score</li>
              <li>• Faster completion grants time bonus points</li>
            </ul>
          </div>
          
          <button
            onClick={() => setShowMission(false)}
            className="px-8 py-3 bg-primary text-white rounded-lg shadow-sm font-medium button-hover"
          >
            Start Challenge
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Game information */}
          <div className="md:col-span-2 bg-card rounded-xl border border-border shadow-sm p-4">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Level {currentLevel} Stats</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Time</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Moves</span>
                    </div>
                    <p className="text-lg font-semibold">{moves}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="px-4 py-5 rounded-lg bg-gradient-to-r from-primary/10 to-blue-400/10 border border-primary/20">
                  <h4 className="font-medium mb-2">Coding Tips</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    The maze represents a search algorithm problem. Finding the shortest path 
                    is similar to breadth-first search in graph traversal.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Efficiency matters: less moves = cleaner code!
                  </p>
                </div>
                
                <div className="space-y-2 mt-4">
                  <button
                    onClick={toggleSolution}
                    className="w-full px-4 py-2 rounded-lg border border-border hover:bg-secondary button-hover"
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </button>
                  
                  <button
                    onClick={restartLevel}
                    className="w-full px-4 py-2 rounded-lg border border-border hover:bg-secondary button-hover flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Restart Level
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Maze display */}
          <div className="md:col-span-3 bg-card rounded-xl border border-border shadow-sm p-4 flex flex-col">
            <div className="p-2 mb-4 rounded-lg bg-muted flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                  <Code className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm font-medium">Code Maze Level {currentLevel}</span>
              </div>
              
              {isTimerRunning && (
                <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs animate-pulse">
                  Running...
                </div>
              )}
            </div>
            
            <div className="flex-1 grid place-items-center">
              <div 
                className="grid gap-1 p-1 bg-muted rounded-lg" 
                style={{ 
                  gridTemplateColumns: `repeat(${maze.length}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${maze.length}, minmax(0, 1fr))`,
                  aspectRatio: '1/1',
                  maxWidth: '100%',
                  maxHeight: '70vh'
                }}
              >
                {maze.map((row, rowIndex) => 
                  row.map((cell, colIndex) => {
                    const isPlayer = rowIndex === playerPosition.row && colIndex === playerPosition.col;
                    let cellClass = "aspect-square rounded-sm flex items-center justify-center";
                    
                    if (isPlayer) {
                      cellClass += " bg-primary text-white shadow-sm";
                    } else {
                      switch (cell) {
                        case 'wall':
                          cellClass += " bg-gray-800";
                          break;
                        case 'path':
                          cellClass += " bg-white border border-muted";
                          break;
                        case 'start':
                          cellClass += " bg-green-500 text-white";
                          break;
                        case 'end':
                          cellClass += " bg-blue-500 text-white";
                          break;
                        case 'solution':
                          cellClass += " bg-blue-100 border border-blue-300";
                          break;
                      }
                    }
                    
                    return (
                      <div key={`${rowIndex}-${colIndex}`} className={cellClass}>
                        {isPlayer && <div className="h-2.5 w-2.5 rounded-full bg-white"></div>}
                        {cell === 'start' && <ArrowRight className="h-3 w-3" />}
                        {cell === 'end' && <Code className="h-3 w-3" />}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
            {/* Controls */}
            <div className="mt-4 grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
              <div className="col-start-2">
                <button 
                  className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center button-hover"
                  onClick={() => {
                    if (!isTimerRunning) setIsTimerRunning(true);
                    const newRow = playerPosition.row - 1;
                    const newCol = playerPosition.col;
                    if (
                      newRow >= 0 && 
                      maze[newRow][newCol] !== 'wall'
                    ) {
                      setPlayerPosition({ row: newRow, col: newCol });
                      setMoves(prev => prev + 1);
                    }
                  }}
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
              <div>
                <button 
                  className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center button-hover"
                  onClick={() => {
                    if (!isTimerRunning) setIsTimerRunning(true);
                    const newRow = playerPosition.row;
                    const newCol = playerPosition.col - 1;
                    if (
                      newCol >= 0 && 
                      maze[newRow][newCol] !== 'wall'
                    ) {
                      setPlayerPosition({ row: newRow, col: newCol });
                      setMoves(prev => prev + 1);
                    }
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
              <div>
                <button 
                  className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center button-hover"
                  onClick={() => {
                    if (!isTimerRunning) setIsTimerRunning(true);
                    const newRow = playerPosition.row;
                    const newCol = playerPosition.col + 1;
                    if (
                      newCol < maze[0].length && 
                      maze[newRow][newCol] !== 'wall'
                    ) {
                      setPlayerPosition({ row: newRow, col: newCol });
                      setMoves(prev => prev + 1);
                    }
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="col-start-2">
                <button 
                  className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center button-hover"
                  onClick={() => {
                    if (!isTimerRunning) setIsTimerRunning(true);
                    const newRow = playerPosition.row + 1;
                    const newCol = playerPosition.col;
                    if (
                      newRow < maze.length && 
                      maze[newRow][newCol] !== 'wall'
                    ) {
                      setPlayerPosition({ row: newRow, col: newCol });
                      setMoves(prev => prev + 1);
                    }
                  }}
                >
                  <ArrowDown className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Game over screen */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-md p-8 max-w-md w-full mx-4 animate-scale-in">
            <div className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Level {currentLevel} Complete!</h3>
              <p className="text-muted-foreground mb-6">
                You've successfully navigated the code maze.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="text-lg font-semibold">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Moves</p>
                  <p className="text-lg font-semibold">{moves}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={restartLevel}
                  className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-secondary button-hover"
                >
                  Retry Level
                </button>
                
                <button
                  onClick={nextLevel}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg shadow-sm button-hover"
                >
                  Next Level
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeMaze;
