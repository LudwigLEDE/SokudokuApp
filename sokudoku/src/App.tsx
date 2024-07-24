import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./views/start";
import NotFound from "./views/notFound";
import Setting from "./views/setting";
import SudokuGame from "./views/game";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/start" element={<Start />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/game/:difficulty" element={<SudokuGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
