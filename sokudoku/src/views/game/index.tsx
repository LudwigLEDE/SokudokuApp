import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateSudokuPuzzle } from "../../utilities/sudokuGenerator";

type Difficulty = "easy" | "medium" | "hard" | "very-hard";

const SudokuGame: React.FC = () => {
  const { difficulty } = useParams<{ difficulty: Difficulty }>();
  const [puzzle, setPuzzle] = useState<number[][]>([]);

  useEffect(() => {
    if (difficulty) {
      const generatedPuzzle = generateSudokuPuzzle(difficulty);
      setPuzzle(generatedPuzzle);
    }
  }, [difficulty]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Sudoku Game - {difficulty?.toUpperCase()}
      </h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md">
        {puzzle.length > 0 && (
          <table className="table-fixed border-collapse border border-gray-400">
            <tbody>
              {puzzle.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="w-12 h-12 border border-gray-400 text-center"
                    >
                      {cell !== 0 ? cell : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SudokuGame;
