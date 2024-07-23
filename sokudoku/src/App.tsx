import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./views/start";
import NotFound from "./views/notFound";
import Setting from "./views/setting";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
