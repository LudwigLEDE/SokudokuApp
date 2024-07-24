// utilities/sudokuGenerator.ts
type Difficulty = "easy" | "medium" | "hard" | "very-hard";

const generateCompletePuzzle = (): number[][] => {
  // Placeholder for an actual Sudoku generator logic
  // Here we use a predefined valid Sudoku for simplicity
  return [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];
};

const removeCells = (
  puzzle: number[][],
  difficulty: Difficulty
): number[][] => {
  const puzzleCopy = puzzle.map((row) => row.slice());
  let cellsToRemove;
  switch (difficulty) {
    case "easy":
      cellsToRemove = 20;
      break;
    case "medium":
      cellsToRemove = 40;
      break;
    case "hard":
      cellsToRemove = 50;
      break;
    case "very-hard":
      cellsToRemove = 60;
      break;
    default:
      cellsToRemove = 20;
  }

  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzleCopy[row][col] !== 0) {
      puzzleCopy[row][col] = 0;
      cellsToRemove--;
    }
  }
  return puzzleCopy;
};

export const generateSudokuPuzzle = (difficulty: Difficulty): number[][] => {
  const completePuzzle = generateCompletePuzzle();
  return removeCells(completePuzzle, difficulty);
};
