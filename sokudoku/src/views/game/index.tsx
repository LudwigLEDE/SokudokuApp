import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import Loader from "../../components/loader";

type Difficulty = "easy" | "medium" | "hard" | "very-hard";

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
};

const gridVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const createWorker = (fn: Function) => {
  const blob = new Blob(["(" + fn.toString() + ")()"], {
    type: "application/javascript",
  });
  return new Worker(URL.createObjectURL(blob));
};

const workerFunction = () => {
  const isValid = (
    board: number[][],
    row: number,
    col: number,
    num: number
  ): boolean => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) {
        return false;
      }
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const generateCompletePuzzle = (): number[][] => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    const fillBoard = (row = 0, col = 0): boolean => {
      if (row === 8 && col === 9) {
        return true;
      }
      if (col === 9) {
        row++;
        col = 0;
      }
      if (board[row][col] !== 0) {
        return fillBoard(row, col + 1);
      }

      const nums = [...Array(9).keys()].map((x) => x + 1);
      for (let num of nums.sort(() => Math.random() - 0.5)) {
        if (isValid(board, row, col, num)) {
          board[row][col] = num;
          if (fillBoard(row, col + 1)) {
            return true;
          }
        }
      }
      board[row][col] = 0;
      return false;
    };

    fillBoard();
    return board;
  };

  const hasUniqueSolution = (
    board: number[][],
    solutionsFound = 0
  ): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9 && solutionsFound < 2; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;

              if (hasUniqueSolution(board, solutionsFound)) {
                solutionsFound++;
              }
            }
          }
          board[row][col] = 0;
          return solutionsFound === 1;
        }
      }
    }
    return true;
  };

  const removeCells = (
    puzzle: number[][],
    difficulty: Difficulty
  ): number[][] => {
    const puzzleCopy = puzzle.map((row) => row.slice());
    const targetEmptyCells = {
      easy: 36,
      medium: 45,
      hard: 54,
      "very-hard": 62,
    }[difficulty];
    let removedCells = 0;
    const cache = new Map<string, boolean>();

    while (removedCells < targetEmptyCells) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (puzzleCopy[row][col] !== 0) {
        const originalValue = puzzleCopy[row][col];
        puzzleCopy[row][col] = 0;

        const boardString = puzzleCopy.flat().join("");
        if (!cache.has(boardString)) {
          cache.set(boardString, hasUniqueSolution(puzzleCopy));
        }

        if (cache.get(boardString)) {
          removedCells++;
        } else {
          puzzleCopy[row][col] = originalValue;
        }
      }
    }

    return puzzleCopy;
  };

  const generateSudokuPuzzle = (difficulty: Difficulty): number[][] => {
    const completePuzzle = generateCompletePuzzle();
    return removeCells(completePuzzle, difficulty);
  };

  self.addEventListener("message", (event) => {
    const { difficulty, action } = event.data;
    if (action === "generate") {
      const puzzle = generateSudokuPuzzle(difficulty);
      postMessage({ puzzle });
    }
  });
};

const SudokuGame: React.FC = () => {
  const { difficulty } = useParams<{ difficulty: Difficulty }>();
  const navigate = useNavigate();
  const [puzzle, setPuzzle] = useState<number[][]>([]);
  const [initialPuzzle, setInitialPuzzle] = useState<number[][]>([]);
  const [solvedPuzzle, setSolvedPuzzle] = useState<number[][] | null>(null);
  const [solved, setSolved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = createWorker(workerFunction);
    workerRef.current.onmessage = (event) => {
      const { puzzle } = event.data;
      setPuzzle(puzzle);
      setInitialPuzzle(puzzle.map((row: number[]) => row.slice())); // Deep copy for resetting later
      setSolved(false);
      setSolvedPuzzle(null);
      setLoading(false);
    };

    setLoading(true);
    if (difficulty) {
      workerRef.current.postMessage({ difficulty, action: "generate" });
    }

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [difficulty]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const newPuzzle = puzzle.map((row) => row.slice());
    newPuzzle[row][col] = parseInt(value) || 0;
    setPuzzle(newPuzzle);
  };

  const resetPuzzle = () => {
    setPuzzle(initialPuzzle.map((row) => row.slice()));
    setSolved(false);
    setSolvedPuzzle(null);
  };

  const solvePuzzle = () => {
    const newPuzzle = initialPuzzle.map((row) => row.slice());
    if (solve(newPuzzle)) {
      setSolvedPuzzle(newPuzzle);
      setSolved(true);
    }
  };

  const solve = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValid = (
    board: number[][],
    row: number,
    col: number,
    num: number
  ): boolean => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) {
        return false;
      }
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const handleBack = () => {
    navigate("/start");
  };

  const generateNewPuzzle = () => {
    setSolved(false);
    setSolvedPuzzle(null);
    setLoading(true);
    if (difficulty) {
      workerRef.current?.postMessage({ difficulty, action: "generate" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Sudoku Game - {difficulty?.toUpperCase()}
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <motion.div
            className="bg-white dark:bg-gray-800 p-4 rounded shadow-md"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <table className="table-fixed border-collapse border border-gray-400">
              <tbody>
                {(solvedPuzzle || puzzle).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`w-12 h-12 border border-gray-400 text-center ${
                          initialPuzzle[rowIndex][cellIndex] !== 0
                            ? "bg-gray-200"
                            : "bg-white"
                        }`}
                      >
                        {initialPuzzle[rowIndex][cellIndex] !== 0 ? (
                          <span className="flex items-center justify-center w-full h-full text-lg text-gray-900 dark:text-gray-100">
                            {cell !== 0 ? cell : ""}
                          </span>
                        ) : (
                          <input
                            type="text"
                            className="w-full h-full text-center text-lg bg-transparent outline-none"
                            value={cell !== 0 ? cell : ""}
                            onChange={(e) =>
                              handleInputChange(
                                rowIndex,
                                cellIndex,
                                e.target.value
                              )
                            }
                            maxLength={1}
                            readOnly={solved}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <div className="flex space-x-4 mt-4">
            <motion.button
              onClick={resetPuzzle}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Reset
            </motion.button>
            <motion.button
              onClick={solvePuzzle}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Solve
            </motion.button>
            <motion.button
              onClick={handleBack}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Back
            </motion.button>
          </div>
          {solved && (
            <motion.button
              onClick={generateNewPuzzle}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors duration-300"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              New Puzzle
            </motion.button>
          )}
        </>
      )}
    </div>
  );
};

export default SudokuGame;
