import SudokuWorker from "../../utilities/sudokuWorker.worker.ts";

const workerRef = useRef<Worker | null>(null);

useEffect(() => {
  workerRef.current = new SudokuWorker();
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
