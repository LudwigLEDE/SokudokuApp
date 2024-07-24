type Difficulty = "easy" | "medium" | "hard" | "very-hard";

// Helper function to check Sudoku validity (row, column, and box constraints)
function isValid(
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean {
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
}

// Backtracking algorithm to generate a complete Sudoku
function generateCompletePuzzle(): number[][] {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  function fillBoard(row = 0, col = 0): boolean {
    if (row === 8 && col === 9) {
      return true; // Board is full, Sudoku complete
    }
    if (col === 9) {
      row++;
      col = 0;
    }
    if (board[row][col] !== 0) {
      return fillBoard(row, col + 1); // Skip pre-filled cells
    }

    const nums = [...Array(9).keys()].map((x) => x + 1); // [1, 2, ..., 9]
    for (let num of nums.sort(() => Math.random() - 0.5)) {
      // Shuffle numbers
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        if (fillBoard(row, col + 1)) {
          return true;
        }
      }
    }
    board[row][col] = 0; // Reset and backtrack
    return false;
  }

  fillBoard();
  return board;
}

// Improved cell removal for difficulty control with uniqueness check
function removeCells(puzzle: number[][], difficulty: Difficulty): number[][] {
  const puzzleCopy = puzzle.map((row) => row.slice());
  const targetEmptyCells = { easy: 36, medium: 45, hard: 54, "very-hard": 62 }[
    difficulty
  ];
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

  return puzzleCopy; // Return puzzle after the while loop is complete
}

// Helper function to check if a Sudoku puzzle has a unique solution (with heuristics)
function hasUniqueSolution(board: number[][], solutionsFound = 0): boolean {
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
}

export const generateSudokuPuzzle = (difficulty: Difficulty): number[][] => {
  const completePuzzle = generateCompletePuzzle();
  return removeCells(completePuzzle, difficulty);
};
