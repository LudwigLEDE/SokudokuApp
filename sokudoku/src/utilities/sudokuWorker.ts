import { generateSudokuPuzzle } from "./sudokuGenerator";

addEventListener("message", (event) => {
  const { difficulty, action } = event.data;

  if (action === "generate") {
    const puzzle = generateSudokuPuzzle(difficulty);
    postMessage({ puzzle });
  }
});
