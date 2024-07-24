import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateSudokuPuzzle } from "../../utilities/sudokuGenerator";

type Difficulty = "easy" | "medium" | "hard" | "very-hard";

const SudokuGame: React.FC = () => {
  const { difficulty } = useParams<{ difficulty: Difficulty }>();
  const [puzzle, setPuzzle] = useState<number[][]>([]);
  const [initialPuzzle, setInitialPuzzle] = useState<number[][]>([]);

  useEffect(() => {
    console.log("Generating puzzle for difficulty:", difficulty);
    if (difficulty) {
      const generatedPuzzle = generateSudokuPuzzle(difficulty);
      console.log("Generated puzzle:", generatedPuzzle);
      setPuzzle(generatedPuzzle);
      setInitialPuzzle(generatedPuzzle.map((row) => row.slice())); // Deep copy for resetting later
    }
  }, [difficulty]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const newPuzzle = puzzle.map((row) => row.slice());
    newPuzzle[row][col] = parseInt(value) || 0;
    setPuzzle(newPuzzle);
  };

  const resetPuzzle = () => {
    setPuzzle(initialPuzzle.map((row) => row.slice()));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Sudoku Game - {difficulty?.toUpperCase()}
      </h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md">
        <table className="table-fixed border-collapse border border-gray-400">
          <tbody>
            {puzzle.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="w-12 h-12 border border-gray-400 text-center"
                  >
                    {initialPuzzle[rowIndex][cellIndex] !== 0 ? (
                      <span>{cell !== 0 ? cell : ""}</span>
                    ) : (
                      <input
                        type="text"
                        className="w-full h-full text-center"
                        value={cell !== 0 ? cell : ""}
                        onChange={(e) =>
                          handleInputChange(rowIndex, cellIndex, e.target.value)
                        }
                        maxLength={1}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={resetPuzzle}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Reset
      </button>
    </div>
  );
};

export default SudokuGame;
